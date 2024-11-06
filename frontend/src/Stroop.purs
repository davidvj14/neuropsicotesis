module Stroop where

import Prelude

import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web as AX
import Data.Argonaut (encodeJson)
import Data.Array ((!!))
import Data.DateTime.Instant (Instant, unInstant)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..), fromMaybe)
import Data.String (Pattern(..), contains, toLower)
import Data.String.CodeUnits (charAt, singleton)
import Data.Time.Duration (Milliseconds(..))
import Effect (Effect)
import Effect.Aff (delay)
import Effect.Aff.Class (class MonadAff)
import Effect.Now (now)
import Effect.Random (randomInt)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.NonElementParentNode (getElementById)
import Web.Event.Event (preventDefault)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.HTMLElement (focus, fromElement)
import Web.HTML.Window (document)
import Web.UIEvent.KeyboardEvent (KeyboardEvent, key)
import Web.UIEvent.KeyboardEvent as KE

type State =
  { currentWord :: String
  , currentColor :: String
  , score :: Int
  , totalTrials :: Int
  , responded :: Boolean
  , showFeedback :: Boolean
  , feedbackMessage :: String
  , stage :: StroopStage
  , startTime :: Maybe Number
  , stroopTime :: Number
  , stroopStimuli :: Int
  , nonStroopTime :: Number
  , nonStroopStimuli :: Int
  , stroopErrors :: Int
  , nonStroopErrors :: Int
  }

type Results =
  { stroopTime :: Number
  , stroopStimuli :: Int
  , nonStroopTime :: Number
  , nonStroopStimuli :: Int
  , stroopErrors :: Int
  , nonStroopErrors :: Int
  }

data StroopStage
  = StroopInstructions
  | StroopTest
  | StroopDone

data Action
  = StartTest
  | HandleKeyPress KeyboardEvent
  | NextTrial
  | SubmitResults

data Output = StroopDoneOut

type StroopSlot = forall query. H.Slot query Output Int

stroopComponent :: forall query input m. MonadAff m => H.Component query input Output m
stroopComponent =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
    }

initialState :: forall i. i -> State
initialState _ =
  { currentWord: ""
  , currentColor: ""
  , score: 0
  , totalTrials: 0
  , responded: false
  , showFeedback: false
  , feedbackMessage: ""
  , stage: StroopInstructions
  , startTime: Nothing
  , stroopTime: 0.0
  , stroopStimuli: 0
  , nonStroopTime: 0.0
  , nonStroopStimuli: 0
  , stroopErrors: 0
  , nonStroopErrors: 0
  }

render :: forall m. State -> H.ComponentHTML Action () m
render state = case state.stage of
  StroopInstructions ->
    HH.div
      [ HP.class_ $ H.ClassName "instructions-container" ]
      [ HH.p_ [ HH.text "En esta prueba verás una serie de palabras de un color determinado." ]
      , HH.p_ [ HH.text "Deberás presionar en el teclado la letra inicial del color que tenga la palabra." ]
      , HH.p_ [ HH.text "R para Rojo, A para Azul, V para Verde y M para morado." ]
      , HH.button
          [ HE.onClick \_ -> StartTest ]
          [ HH.text "Comenzar prueba" ]
      ]
  StroopTest ->
    HH.div
      [ HP.class_ $ H.ClassName "stroop-container" 
      , HP.id "stroop-test"
      , HE.onKeyDown HandleKeyPress
      , HP.tabIndex 0
      ]
      [ HH.div
          [ HP.class_ $ H.ClassName "stroop-word" 
          , HP.style $ "color: " <> colorFromName state.currentColor
          ]
          [ HH.text state.currentWord ]
      , if state.showFeedback
          then HH.div
                 [ HP.class_ $ H.ClassName "feedback" ]
                 [ HH.text state.feedbackMessage ]
          else HH.text ""
      ]
  StroopDone ->
    HH.div
      [ HP.class_ $ H.ClassName "instructions-container" ]
      [ HH.p_ [ HH.text "Has concluido esta prueba" ]
      , HH.button
          [ HE.onClick \_ -> SubmitResults ]
          [ HH.text "Siguiente" ]
      ]

handleAction :: forall m. MonadAff m => Action -> H.HalogenM State Action () Output m Unit
handleAction = case _ of
  StartTest -> do
    H.modify_ _ { stage = StroopTest }
    handleAction NextTrial
    w <- H.liftEffect window
    d <- H.liftEffect $ document w
    mbElem <- H.liftEffect $ getElementById "stroop-test" $ toNonElementParentNode $ toDocument d
    case mbElem of
         Just elem -> do
            case fromElement elem of
                 Just e -> H.liftEffect $ focus e
                 _ -> pure unit
         _ -> pure unit

  HandleKeyPress event -> do
    responded <- H.gets _.responded
    if responded
      then pure unit
      else do
        H.liftEffect $ preventDefault $ KE.toEvent event
        let userInput = key event
        if contains (Pattern userInput) "RAVMravm"
          then do
            H.modify_ _ { responded = true }
            state <- H.get
            currentTime <- H.liftEffect now
            let cTime = unInst currentTime
            let isStroop = state.currentWord /= state.currentColor
            let timeTaken = case state.startTime of
                              Just startTime -> cTime - startTime
                              Nothing -> 0.0

            if userInput == firstLetter state.currentColor
              then do
                H.modify_ _ { score = state.score + 1
                            , totalTrials = state.totalTrials + 1
                            , showFeedback = true
                            , feedbackMessage = "Correcto"
                            , stroopTime = if isStroop then state.stroopTime + timeTaken else state.stroopTime
                            , stroopStimuli = if isStroop then state.stroopStimuli + 1 else state.stroopStimuli
                            , nonStroopTime = if isStroop then state.nonStroopTime else state.nonStroopTime + timeTaken
                            , nonStroopStimuli = if isStroop then state.nonStroopStimuli else state.nonStroopStimuli + 1
                            }
              else do
                H.modify_ _ { totalTrials = state.totalTrials + 1
                            , showFeedback = true
                            , feedbackMessage = "Incorrecto"
                            , stroopTime = if isStroop then state.stroopTime + timeTaken else state.stroopTime
                            , nonStroopTime = if isStroop then state.nonStroopTime else state.nonStroopTime + timeTaken
                            , stroopErrors = if isStroop then state.stroopErrors + 1 else state.stroopErrors
                            , nonStroopErrors = if isStroop then state.nonStroopErrors else state.nonStroopErrors + 1
                            }
            H.liftAff $ H.liftAff $ delay $ Milliseconds 400.0
            handleAction NextTrial
          else pure unit

  NextTrial -> do
    state <- H.get
    if state.totalTrials >= 20
      then H.modify_ _ { stage = StroopDone }
      else do
        wordIndex <- H.liftEffect randomIndex
        colorIndex <- H.liftEffect randomIndex
        let newWord = fromMaybe "Rojo" $ words !! wordIndex
        let newColor = fromMaybe "Rojo" $ words !! colorIndex
        if newWord == state.currentWord && newColor == state.currentColor
          then handleAction NextTrial
          else do
            startTime <- H.liftEffect now
            H.modify_ _ { currentWord = newWord
                        , currentColor = newColor
                        , showFeedback = false
                        , startTime = Just $ unInst startTime
                        , responded = false
                        }

  SubmitResults -> do
    state <- H.get
    let results = 
          { stroopTime: state.stroopTime
          , stroopStimuli: state.stroopStimuli
          , nonStroopTime: state.nonStroopTime
          , nonStroopStimuli: state.nonStroopStimuli
          , stroopErrors: state.stroopErrors
          , nonStroopErrors: state.nonStroopErrors
          }
    response <- H.liftAff $ AX.post ResponseFormat.ignore "/stroop"
      (Just $ RequestBody.Json $ encodeJson results)
    case response of
      Left _ -> H.raise StroopDoneOut
      Right _ -> H.raise StroopDoneOut

words :: Array String
words = ["Rojo", "Azul", "Verde", "Morado"]

colorFromName :: String -> String
colorFromName = case _ of
  "Rojo" -> "#FF0000"
  "Verde" -> "#00FF00"
  "Azul" -> "#0000FF"
  "Morado" -> "#8a2be2"
  _ -> ""

randomIndex :: Effect Int
randomIndex = randomInt 0 3

firstLetter :: String -> String
firstLetter str = case charAt 0 str of
  Just c -> toLower $ singleton c
  Nothing -> ""

unInst :: Instant -> Number
unInst instant = ms
  where
        (Milliseconds ms) = unInstant instant
