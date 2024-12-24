module GoNoGo where

import Prelude

import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web as AX
import Data.Argonaut (encodeJson)
import Data.Array (length, snoc)
import Data.Array as Array
import Data.DateTime.Instant (unInstant)
import Data.Int (toNumber)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff (Milliseconds(..), delay)
import Effect.Aff.Class (class MonadAff)
import Effect.Class.Console (log)
import Effect.Now (now)
import Effect.Random (randomInt)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Web.Event.Event (Event, preventDefault)
import Web.HTML (window)
import Web.HTML.Window (alert)
import Web.UIEvent.MouseEvent as ME
import Wisconsin (unsafeIndex)

type State =
  { stage :: GoNoGoStage
  , currentStimulus :: Maybe Stimulus
  , currentIndex :: Int
  , responded :: Boolean
  , responses :: Array Response
  , practiceResponses :: Array Response
  , showStimulus :: Boolean
  , lastTimer :: Number
  , showResult :: Boolean
  , message :: String
  }

data GoNoGoStage
  = GoNoGoInstructions
  | PrepareMessage
  | PracticeSession
  | TestMessage
  | GoNoGoTest
  | Complete
derive instance eqGoNoGoStage :: Eq GoNoGoStage

data Stimulus = Go | NoGo
derive instance eqStimulus :: Eq Stimulus

type Response = 
  { stimulus :: Stimulus
  , responded :: Boolean
  , responseTime :: Number
  }

data Action
  = GoNoGoInstructionsDone
  | StartPractice
  | StartTest
  | HandleResponse ME.MouseEvent
  | PreventDefault Event
  | GoNoGoCompleteRaiser

type GoNoGoSlot = forall query. H.Slot query Output Int

data Output = GoNoGoComplete

type Result =
  { comissionErrors :: Int
  , omissionErrors :: Int
  , responseTime :: Number
  }

type Results =
  { correctGo :: Int
  , incorrectGo :: Int
  , correctNoGo :: Int
  , incorrectNoGo :: Int
  , averageResponseTime :: Number
  }

component :: forall input query m. MonadAff m => H.Component query input Output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = goNoGoHandler }
    }

initialState :: forall i. i -> State
initialState _ = 
  { stage: GoNoGoInstructions
  , currentStimulus: Nothing
  , currentIndex: 0
  , responded: false
  , responses: []
  , practiceResponses: []
  , showStimulus: false
  , lastTimer: 0.0
  , showResult: false
  , message: ""
  }

render :: forall m. State -> H.ComponentHTML Action () m
render state =
  HH.div
    [ HP.class_ $ H.ClassName "go-no-go-container" ]
    [ case state.stage of
        GoNoGoInstructions -> renderInstructions
        PrepareMessage -> renderPrepareMessage
        PracticeSession -> renderGoNoGo state true
        TestMessage -> renderTestMessage
        GoNoGoTest -> renderGoNoGo state false
        Complete -> renderComplete
    ]

renderInstructions :: forall m. H.ComponentHTML Action () m
renderInstructions =
  HH.div
  [ HP.class_ $ H.ClassName "instructions-container" ]
    [ HH.p_ [ HH.text "En esta prueba verás una serie de estímulos, uno a la vez." ]
    , HH.p_ [ HH.text $ "Haz click a la pantalla cuando veas un CÍRCULO VERDE."
            <>  " No des click a otro color, únicamente cuando veas el CÍRCULO VERDE."]
    , HH.p_ [ HH.text "Procura dar click lo más rápido posible sin cometer ningún error." ]
    , HH.p_ [ HH.text "Comenzaremos con una versión de práctica." ]
    , HH.button
        [ HE.onClick \_ -> GoNoGoInstructionsDone ]
        [ HH.text "Comenzar" ]
    ]

renderPrepareMessage :: forall m. H.ComponentHTML Action () m
renderPrepareMessage =
  HH.div
    [ HP.class_ $ H.ClassName "instructions-container"]
    [ HH.h2_ [ HH.text "Prepárate" ]
    , HH.p_ [ HH.text "Coloca tu mano en el click izquierdo del mouse." ]
    ]

renderTestMessage :: forall m. H.ComponentHTML Action () m
renderTestMessage =
  HH.div
    [ HP.class_ $ H.ClassName "instructions-container"]
    [ HH.h2_ [ HH.text "Ahora vamos con la prueba" ]
    ]

renderGoNoGo :: forall m. State -> Boolean -> H.ComponentHTML Action () m
renderGoNoGo state isPractice =
  HH.div
    [ HP.class_ $ H.ClassName "go-no-go-area"
    , HE.onMouseDown \ev -> HandleResponse ev
    ]
    [ if state.showStimulus
      then case state.currentStimulus of
           Just Go -> HH.div 
             [ HP.class_ $ H.ClassName "stimulus go" ] 
             [ HH.div [ HP.class_ $ H.ClassName "circle green" ] [] ]
           Just NoGo -> HH.div 
             [ HP.class_ $ H.ClassName "stimulus no-go" ] 
             [ HH.div [ HP.class_ $ H.ClassName "circle red" ] [] ]
           Nothing -> HH.div_ []
      else HH.div 
        [ HP.class_ $ H.ClassName "fixation-cross" ] 
        [ HH.text "+" ]
    , if isPractice && state.showResult
        then renderResult state.message
        else HH.div_ []
    ]

renderResult :: forall m. String -> H.ComponentHTML Action () m
renderResult message = 
  HH.div
    [ HP.id "gonogo-message"
    , HP.class_ $ H.ClassName "gonogo-message"
    ]
    [ HH.text message ]

renderComplete :: forall m. H.ComponentHTML Action () m
renderComplete =
  HH.div
    [ HP.class_ $ H.ClassName "instructions-container"]
    [ HH.h2_ [ HH.text "Has terminado esta prueba" ]
    , HH.button
        [ HE.onClick \_ -> GoNoGoCompleteRaiser ]
        [ HH.text "Siguiente" ]
    ]

goNoGoHandler :: forall m. MonadAff m => Action -> H.HalogenM State Action () Output m Unit
goNoGoHandler = case _ of
  GoNoGoInstructionsDone -> do
    H.modify_ _ { stage = PrepareMessage }
    H.liftAff $ delay $ Milliseconds 4000.0
    goNoGoHandler StartPractice
  StartPractice -> do
    H.modify_ _ { stage = PracticeSession }
    runPracticeSession
  StartTest -> do
    H.modify_ _ { stage = GoNoGoTest, showResult = false }
    runTestSession
  HandleResponse ev -> do
    H.liftEffect $ preventDefault $ ME.toEvent ev
    responded <- H.gets _.responded
    if responded 
      then pure unit
      else do
        now <- H.liftEffect nowToNumber
        state <- H.get
        H.modify_ _ { responded = true }
        case state.currentStimulus of
          Just stim ->
            let response = { stimulus: stim, responded: true, responseTime: now - state.lastTimer }
            in if state.stage == PracticeSession
               then H.modify_ \s -> s { practiceResponses = snoc s.practiceResponses response
                                      , showResult = true
                                      , message = if stim == Go then "Correcto" else "Incorrecto"
                                      }
               else H.modify_ \s -> s { responses = snoc s.responses response }
          Nothing -> pure unit
  PreventDefault ev -> H.liftEffect $ preventDefault ev
  GoNoGoCompleteRaiser -> do
     responses <- H.gets _.responses
     let results = computeResult responses
     serverResponse <- H.liftAff $ AX.post ResponseFormat.ignore "/gonogo"
      (Just $ RequestBody.Json $ encodeJson results)
     H.raise GoNoGoComplete

runPracticeSession :: forall m. MonadAff m => H.HalogenM State Action () Output m Unit
runPracticeSession = do
  replicateM_ 3 $ do
    showStimulusRandom
    H.liftAff $ delay $ Milliseconds 500.0
    hideStimulus
    H.liftAff $ delay $ Milliseconds 1500.0
  H.modify_ _ { stage = TestMessage, currentIndex = 0 }
  H.liftAff $ delay $ Milliseconds 4000.0
  goNoGoHandler StartTest

runTestSession :: forall m. MonadAff m => H.HalogenM State Action () Output m Unit
runTestSession = do
  replicateM_ 10 $ do
    showStimulus
    H.liftAff $ delay $ Milliseconds 500.0
    hideStimulus
    H.liftAff $ delay $ Milliseconds 1500.0
  H.modify_ _ { stage = Complete }

showStimulusRandom :: forall m. MonadAff m => H.HalogenM State Action () Output m Unit
showStimulusRandom = do
  stim <- H.liftEffect randomStimulus
  H.modify_ _ { currentStimulus = Just stim, showStimulus = true, responded = false, showResult = false }

showStimulus :: forall m. MonadAff m => H.HalogenM State Action () Output m Unit
showStimulus = do
  currentIndex <- H.gets _.currentIndex
  let stim =  unsafeIndex stimuli currentIndex
  now <- H.liftEffect nowToNumber
  H.modify_ _ { currentStimulus = Just stim, showStimulus = true, lastTimer = now, showResult = false, responded = false }

hideStimulus :: forall m. MonadAff m => H.HalogenM State Action () Output m Unit
hideStimulus = H.modify_ \state -> state { showStimulus = false, currentIndex = state.currentIndex + 1 }

randomStimulus :: Effect Stimulus
randomStimulus = do
  n <- randomInt 0 1
  pure if n == 0 then Go else NoGo

replicateM_ :: forall m a. Monad m => Int -> m a -> m Unit
replicateM_ n _ | n <= 0 = pure unit
replicateM_ n ma = ma *> replicateM_ (n - 1) ma

computeResult :: Array Response -> Result
computeResult responses =
  { comissionErrors: countComission
  , omissionErrors: countOmission
  , responseTime: totalResponseTime
  }
  where
    countComission = length $ filter (\response -> response.stimulus == NoGo && response.responded) responses
    countOmission = length $ filter (\response -> response.stimulus == Go && (not response.responded)) responses
    totalResponseTime = sum (map _.responseTime responses)

filter :: forall a. (a -> Boolean) -> Array a -> Array a
filter pred arr = arr # Array.filter pred

sum :: Array Number -> Number
sum = Array.foldl (+) 0.0

nowToNumber :: Effect Number
nowToNumber = map (\(Milliseconds ms) -> ms) $ map unInstant now

stimuli :: Array Stimulus
stimuli = [Go,Go,NoGo,NoGo,Go,Go,Go,NoGo,Go,NoGo]
