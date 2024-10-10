module Coordinator where

import Prelude

import Beck as Beck
import Barrat as Barrat
import Data.Maybe (Maybe(..))
import Effect.Aff (Milliseconds(..), delay)
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Questions as Q
import Type.Proxy (Proxy(..))

type State = 
  { currentStage :: Stage
  , fadingOutStage :: Maybe Stage
  }

data Stage 
  = Questions
  | Barrat
  | Beck
  | Wisconsin
  | GoNoGo
  | Stroop
  | Ending
  | Void

data Action 
  = HandleQuestions Q.Output
  | HandleBarrat Barrat.Output
  | HandleBeck Beck.Output
  | HandleCardSorting
  | HandleCardGame
  | HandleEnding
  | FadeOutComplete

type ChildSlots = 
  ( questions :: Q.Slot
  , barrat :: Barrat.Slot
  , beck :: Beck.BeckSlot
  )

_questions = Proxy :: Proxy "questions"
_barrat = Proxy :: Proxy "barrat"
_beck = Proxy :: Proxy "beck"

initialState :: forall i. i -> State
initialState _ = { currentStage: Questions, fadingOutStage: Nothing }

mainComponent :: forall query input output m. MonadAff m => H.Component query input output m
mainComponent =
  H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval { handleAction = mainHandler }
  }

render :: forall m. MonadAff m => State -> H.ComponentHTML Action ChildSlots m
render state = 
  HH.div
    [ HP.class_ $ H.ClassName "coordinator-container"]
    [
    HH.div
      [ HP.class_ $ H.ClassName "stage-container" ]
      [ maybeRenderFadingOut state.fadingOutStage
      , renderCurrent state.currentStage
      ]
    ]

renderCurrent :: forall m. MonadAff m => Stage -> H.ComponentHTML Action ChildSlots m
renderCurrent stage =
  HH.div
    [ HP.class_ $ H.ClassName "fade-in"]
    [ case stage of
        Questions -> HH.slot _questions 0 Q.questionsComponent unit HandleQuestions
        Barrat -> HH.slot _barrat 1 Barrat.barratComponent unit HandleBarrat
        Beck -> HH.slot _beck 2 Beck.mainComponent unit HandleBeck
        Wisconsin -> HH.text "Wisconsin Component"
        GoNoGo -> HH.text "GoNoGo Component"
        Stroop -> HH.text "Stroop Component"
        Ending -> HH.text "Ending Component"
        Void -> HH.text ""
    ]

maybeRenderFadingOut :: forall m. MonadAff m => Maybe Stage -> H.ComponentHTML Action ChildSlots m
maybeRenderFadingOut Nothing = HH.text ""
maybeRenderFadingOut (Just stage) = 
  HH.div
    [ HP.class_ $ H.ClassName "fade-out"]
    [ case stage of
        Questions -> HH.slot _questions 0 Q.questionsComponent unit HandleQuestions
        Barrat -> HH.slot _barrat 1 Barrat.barratComponent unit HandleBarrat
        Beck -> HH.slot _beck 2 Beck.mainComponent unit HandleBeck
        Wisconsin -> HH.text "Wisconsin Component"
        GoNoGo -> HH.text "GoNoGo Component"
        Stroop -> HH.text "Stroop Component"
        Ending -> HH.text "Ending Component"
        Void -> HH.text "Void"
    ]

mainHandler :: forall output m. MonadAff m => Action -> H.HalogenM State Action ChildSlots output m Unit
mainHandler action = do
  case action of
    HandleQuestions _ -> fadeToStage Barrat
    HandleBarrat _ -> fadeToStage Beck
    FadeOutComplete -> do
       fadingOut <- H.gets _.fadingOutStage
       case fadingOut of
            Just _ -> H.modify_ \s -> s { fadingOutStage = Nothing }
            Nothing -> pure unit
    _ -> pure unit

fadeToStage :: forall output m. MonadAff m => Stage -> H.HalogenM State Action ChildSlots output m Unit
fadeToStage nextStage = do
  H.modify_ \s -> s { fadingOutStage = Just s.currentStage }
  H.modify_ \s -> s { currentStage = Void }
  H.liftAff $ delay (Milliseconds 500.0)
  H.modify_ \s -> s { currentStage = nextStage }
  mainHandler FadeOutComplete
