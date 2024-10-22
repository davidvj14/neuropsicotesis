module GoNoGo where

import Prelude

import Data.Array (length, snoc, take, drop, head, last)
import Data.Array as Array
import Data.DateTime.Instant (unInstant)
import Data.Int (toNumber)
import Data.Maybe (Maybe(..), fromMaybe)
import Effect (Effect)
import Effect.Aff (Milliseconds(..), delay)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (liftEffect)
import Effect.Now (now)
import Effect.Random (randomInt)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Web.Event.Event (Event, preventDefault)
import Web.UIEvent.MouseEvent as ME

type State =
  { stage :: GoNoGoStage
  , currentStimulus :: Maybe Stimulus
  , responses :: Array Response
  , practiceResponses :: Array Response
  , showStimulus :: Boolean
  , lastTimer :: Number
  , showIncorrect :: Boolean
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
  | SetShowStimulus Boolean
  | SetShowIncorrect Boolean
  | PreventDefault Event

type GoNoGoSlot = H.Slot Query Output Int

data Query a = GetResults (Results -> a)

data Output = TestComplete Results

type Results =
  { correctGo :: Int
  , incorrectGo :: Int
  , correctNoGo :: Int
  , incorrectNoGo :: Int
  , averageResponseTime :: Number
  }

component :: forall input m. MonadAff m => H.Component Query input Output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = goNoGoHandler
        , handleQuery = handleQuery
        }
    }

initialState :: forall i. i -> State
initialState _ = 
  { stage: GoNoGoInstructions
  , currentStimulus: Nothing
  , responses: []
  , practiceResponses: []
  , showStimulus: false
  , lastTimer: 0.0
  , showIncorrect: false
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
  HH.div_
    [ HH.h2_ [ HH.text "Go/No-Go Test Instructions" ]
    , HH.p_ [ HH.text "En esta prueba verás una serie de estímulos, uno a la vez." ]
    , HH.p_ [ HH.text $ "Haz click a la pantalla cuando veas un CÍRCULO VERDE."
            <>  " No des click a otro color, únicamente cuando veas el CÍRCULO VERDE"]
    , HH.p_ [ HH.text "Procura dar click lo más rápido posible sin cometer ningún error." ]
    , HH.p_ [ HH.text "Comenzaremos con una versión de práctica." ]
    , HH.button
        [ HE.onClick \_ -> GoNoGoInstructionsDone ]
        [ HH.text "Comenzar" ]
    ]

renderPrepareMessage :: forall m. H.ComponentHTML Action () m
renderPrepareMessage =
  HH.div_
    [ HH.h2_ [ HH.text "Prepare" ]
    , HH.p_ [ HH.text "Place your hand on the mouse." ]
    , HH.p_ [ HH.text "The practice session will begin shortly." ]
    ]

renderTestMessage :: forall m. H.ComponentHTML Action () m
renderTestMessage =
  HH.div_
    [ HH.h2_ [ HH.text "Practice Complete" ]
    , HH.p_ [ HH.text "The real test will begin shortly." ]
    ]

renderGoNoGo :: forall m. State -> Boolean -> H.ComponentHTML Action () m
renderGoNoGo state isPractice =
  HH.div
    [ HP.class_ $ H.ClassName "go-no-go-area"
    , HE.onMouseDown \ev -> HandleResponse ev
    ]
    [ if state.showIncorrect 
      then renderIncorrect 
      else HH.div_ []
    , if state.showStimulus
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
    ]

renderIncorrect :: forall m. H.ComponentHTML Action () m
renderIncorrect = 
  HH.div
    [ HP.id "message"
    , HP.class_ $ H.ClassName "message-container"
    ]
    [ HH.text "Incorrect" ]

renderComplete :: forall m. H.ComponentHTML Action () m
renderComplete =
  HH.div_
    [ HH.h2_ [ HH.text "Test Complete" ]
    , HH.p_ [ HH.text "Thank you for participating." ]
    ]

goNoGoHandler :: forall m. MonadAff m => Action -> H.HalogenM State Action () Output m Unit
goNoGoHandler = case _ of
  GoNoGoInstructionsDone -> do
    H.modify_ _ { stage = PrepareMessage }
    H.liftAff $ delay $ Milliseconds 8000.0
    goNoGoHandler StartPractice
  StartPractice -> do
    H.modify_ _ { stage = PracticeSession }
    runPracticeSession
  StartTest -> do
    H.modify_ _ { stage = GoNoGoTest }
    runTestSession
  HandleResponse ev -> do
    H.liftEffect $ preventDefault $ ME.toEvent ev
    now <- H.liftEffect nowToNumber
    state <- H.get
    case state.currentStimulus of
      Just stim ->
        let response = { stimulus: stim, responded: true, responseTime: now - state.lastTimer }
        in if state.stage == PracticeSession
           then H.modify_ \s -> s { practiceResponses = snoc s.practiceResponses response }
           else H.modify_ \s -> s { responses = snoc s.responses response }
      Nothing -> pure unit
  SetShowStimulus show -> H.modify_ _ { showStimulus = show }
  SetShowIncorrect show -> H.modify_ _ { showIncorrect = show }
  PreventDefault ev -> H.liftEffect $ preventDefault ev

runPracticeSession :: forall m. MonadAff m => H.HalogenM State Action () Output m Unit
runPracticeSession = do
  replicateM_ 5 $ do
    showStimulus
    H.liftAff $ delay $ Milliseconds 500.0
    hideStimulus
    H.liftAff $ delay $ Milliseconds 1500.0
  H.modify_ _ { stage = TestMessage }
  H.liftAff $ delay $ Milliseconds 8000.0
  goNoGoHandler StartTest

runTestSession :: forall m. MonadAff m => H.HalogenM State Action () Output m Unit
runTestSession = do
  replicateM_ 100 $ do
    showStimulus
    H.liftAff $ delay $ Milliseconds 500.0
    hideStimulus
    H.liftAff $ delay $ Milliseconds 1500.0
  H.modify_ _ { stage = Complete }

showStimulus :: forall m. MonadAff m => H.HalogenM State Action () Output m Unit
showStimulus = do
  stim <- H.liftEffect randomStimulus
  now <- H.liftEffect nowToNumber
  H.modify_ _ { currentStimulus = Just stim, showStimulus = true, lastTimer = now }

hideStimulus :: forall m. MonadAff m => H.HalogenM State Action () Output m Unit
hideStimulus = H.modify_ _ { currentStimulus = Nothing, showStimulus = false }

randomStimulus :: Effect Stimulus
randomStimulus = do
  n <- randomInt 0 1
  pure if n == 0 then Go else NoGo

replicateM_ :: forall m a. Monad m => Int -> m a -> m Unit
replicateM_ n ma | n <= 0 = pure unit
replicateM_ n ma = ma *> replicateM_ (n - 1) ma

handleQuery :: forall a m. Query a -> H.HalogenM State Action () Output m (Maybe a)
handleQuery = case _ of
  GetResults reply -> do
    state <- H.get
    let results = calculateResults state.responses
    pure $ Just $ reply results

calculateResults :: Array Response -> Results
calculateResults responses =
  { correctGo: countCorrect Go
  , incorrectGo: countIncorrect Go
  , correctNoGo: countCorrect NoGo
  , incorrectNoGo: countIncorrect NoGo
  , averageResponseTime: averageResponseTime
  }
  where
    countCorrect stim = length $ filter (\r -> r.stimulus == stim && r.responded == (stim == Go)) responses
    countIncorrect stim = length $ filter (\r -> r.stimulus == stim && r.responded /= (stim == Go)) responses
    averageResponseTime = sum (map _.responseTime responses) / toNumber (length responses)

filter :: forall a. (a -> Boolean) -> Array a -> Array a
filter pred arr = arr # Array.filter pred

sum :: Array Number -> Number
sum = Array.foldl (+) 0.0

nowToNumber :: Effect Number
nowToNumber = map (\(Milliseconds ms) -> ms) $ map unInstant now

