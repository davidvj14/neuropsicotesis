module Stroop where

import Prelude

import Data.Array (length, (!!))
import Data.Int (toNumber)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Number (floor)
import Data.String (toLower)
import Data.String.CodeUnits (charAt, singleton)
import Data.Time.Duration (Milliseconds(..))
import Effect (Effect)
import Effect.Aff (delay)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Random (random, randomInt)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Web.Event.Event (preventDefault)
import Web.HTML (window)
import Web.HTML.Window (alert)
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
  }

data StroopStage
  = StroopInstructions
  | StroopTest
  | StroopDone

data Action
  = StartTest
  | HandleKeyPress KeyboardEvent
  | NextTrial

type Output = Int

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
  , showFeedback: false
  , feedbackMessage: ""
  , stage: StroopInstructions
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
      ]

handleAction :: forall m. MonadAff m => Action -> H.HalogenM State Action () Output m Unit
handleAction = case _ of
  StartTest -> do
    H.modify_ _ { stage = StroopTest }
    handleAction NextTrial

  HandleKeyPress event -> do
    H.liftEffect $ preventDefault $ KE.toEvent event
    state <- H.get
    let userInput = key event
    if userInput == firstLetter state.currentColor
      then do
        H.modify_ _ { score = state.score + 1
                    , totalTrials = state.totalTrials + 1
                    , showFeedback = true
                    , feedbackMessage = "Correct!"
                    }
      else
        H.modify_ _ { totalTrials = state.totalTrials + 1
                    , showFeedback = true
                    , feedbackMessage = "Incorrect!"
                    }
    H.liftAff $ H.liftAff $ delay $ Milliseconds 1000.0
    handleAction NextTrial

  NextTrial -> do
    state <- H.get
    if state.totalTrials >= 20
      then do
        H.modify_ _ { stage = StroopDone }
        H.raise state.score
      else do
        wordIndex <- H.liftEffect randomIndex
        colorIndex <- H.liftEffect randomIndex
        let newWord = fromMaybe "Red" $ words !! wordIndex
        let newColor = fromMaybe "red" $ colors !! colorIndex
        H.modify_ _ { currentWord = newWord
                    , currentColor = newColor
                    , showFeedback = false
                    }

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
