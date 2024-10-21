module Stroop where

import Prelude

import Affjax.Web as AX
import Affjax.RequestBody as RequestBody
import Affjax.RequestHeader as RequestHeader
import Affjax.ResponseFormat as ResponseFormat
import Data.Argonaut (encodeJson)
import Data.Array ((!!))
import Data.DateTime.Instant (Instant, unInstant)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..), fromMaybe)
import Data.String (toLower)
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
import Web.Event.Event (preventDefault)
import Web.UIEvent.KeyboardEvent (KeyboardEvent, key)
import Web.UIEvent.KeyboardEvent as KE

type State =
  { currentWord :: String
  , currentColor :: String
  , score :: Int
  , totalTrials :: Int
  , showFeedback :: Boolean
  , feedbackMessage :: String
  , stage :: StroopStage
  , startTime :: Maybe Number
  , stroopTime :: Number
  , nonStroopTime :: Number
  , stroopErrors :: Int
  , nonStroopErrors :: Int
  }

type Results =
  { stroopTime :: Number
  , nonStroopTime :: Number
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

stroopComponent :: forall query input m. MonadAff m => H.Component query input Unit m
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
  , showFeedback: false
  , feedbackMessage: ""
  , stage: StroopInstructions
  , startTime: Nothing
  , stroopTime: 0.0
  , nonStroopTime: 0.0
  , stroopErrors: 0
  , nonStroopErrors: 0
  }

render :: forall m. State -> H.ComponentHTML Action () m
render state = case state.stage of
  StroopInstructions ->
    HH.div
      [ HP.class_ $ H.ClassName "stroop-container" ]
      [ HH.h1_ [ HH.text "Stroop Task" ]
      , HH.p_ [ HH.text "Placeholder instructions" ]
      , HH.button
          [ HE.onClick \_ -> StartTest ]
          [ HH.text "Start Test" ]
      ]
  StroopTest ->
    HH.div
      [ HP.class_ $ H.ClassName "stroop-container" 
      , HE.onKeyDown HandleKeyPress
      , HP.tabIndex 0
      ]
      [ HH.h1_ [ HH.text "Stroop Task" ]
      , HH.div
          [ HP.class_ $ H.ClassName "stroop-word" 
          , HP.style $ "color: " <> state.currentColor
          ]
          [ HH.text state.currentWord ]
      , if state.showFeedback
          then HH.div
                 [ HP.class_ $ H.ClassName "feedback" ]
                 [ HH.text state.feedbackMessage ]
          else HH.text ""
      , HH.div
          [ HP.class_ $ H.ClassName "score" ]
          [ HH.text $ "Score: " <> show state.score <> " / " <> show state.totalTrials ]
      ]
  StroopDone ->
    HH.div
      [ HP.class_ $ H.ClassName "stroop-container" ]
      [ HH.h1_ [ HH.text "Stroop Task Complete" ]
      , HH.p_
          [ HH.text $ "Your final score: " <> show state.score 
                   <> " out of " <> show state.totalTrials
          ]
      , HH.button
          [ HE.onClick \_ -> SubmitResults ]
          [ HH.text "Submit Results" ]
      ]

handleAction :: forall m. MonadAff m => Action -> H.HalogenM State Action () Unit m Unit
handleAction = case _ of
  StartTest -> do
    H.modify_ _ { stage = StroopTest }
    handleAction NextTrial

  HandleKeyPress event -> do
    H.liftEffect $ preventDefault $ KE.toEvent event
    state <- H.get
    currentTime <- H.liftEffect now
    let cTime = unInst currentTime
    let userInput = key event
    let isStroop = state.currentWord /= state.currentColor
    let timeTaken = case state.startTime of
                      Just startTime -> cTime - startTime
                      Nothing -> 0.0

    if userInput == firstLetter state.currentColor
      then do
        H.modify_ _ { score = state.score + 1
                    , totalTrials = state.totalTrials + 1
                    , showFeedback = true
                    , feedbackMessage = "Correct!"
                    , stroopTime = if isStroop then state.stroopTime + timeTaken else state.stroopTime
                    , nonStroopTime = if isStroop then state.nonStroopTime else state.nonStroopTime + timeTaken
                    }
      else do
        H.modify_ _ { totalTrials = state.totalTrials + 1
                    , showFeedback = true
                    , feedbackMessage = "Incorrect!"
                    , stroopTime = if isStroop then state.stroopTime + timeTaken else state.stroopTime
                    , nonStroopTime = if isStroop then state.nonStroopTime else state.nonStroopTime + timeTaken
                    , stroopErrors = if isStroop then state.stroopErrors + 1 else state.stroopErrors
                    , nonStroopErrors = if isStroop then state.nonStroopErrors else state.nonStroopErrors + 1
                    }
    H.liftAff $ H.liftAff $ delay $ Milliseconds 1000.0
    handleAction NextTrial

  NextTrial -> do
    state <- H.get
    if state.totalTrials >= 10
      then H.modify_ _ { stage = StroopDone }
      else do
        wordIndex <- H.liftEffect randomIndex
        colorIndex <- H.liftEffect randomIndex
        startTime <- H.liftEffect now
        let newWord = fromMaybe "Red" $ words !! wordIndex
        let newColor = fromMaybe "red" $ colors !! colorIndex
        H.modify_ _ { currentWord = newWord
                    , currentColor = newColor
                    , showFeedback = false
                    , startTime = Just $ unInst startTime
                    }

  SubmitResults -> do
    state <- H.get
    let results = 
          { stroopTime: state.stroopTime
          , nonStroopTime: state.nonStroopTime
          , stroopErrors: state.stroopErrors
          , nonStroopErrors: state.nonStroopErrors
          }
    response <- H.liftAff $ AX.post ResponseFormat.ignore "/stroop"
      (Just $ RequestBody.Json $ encodeJson results)
    case response of
      Left err -> pure unit
      Right _ -> pure unit

words :: Array String
words = ["Red", "Blue", "Green", "Yellow"]

colors :: Array String
colors = ["red", "blue", "green", "yellow"]

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
