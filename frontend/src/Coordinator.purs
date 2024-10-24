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
import Wisconsin as W
import GoNoGo as GNG
import Stroop as Stroop
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

stageFromMbStr :: Maybe String -> Stage
stageFromMbStr Nothing = Questions
stageFromMbStr (Just cookie) =
  case cookie of
       "barrat" -> Barrat
       "beck" -> Beck
       "wisconsin" -> Wisconsin
       "gonogo" -> GoNoGo
       "stroop" -> Stroop
       _ -> Questions

data Action 
  = HandleQuestions Q.Output
  | HandleBarrat Barrat.Output
  | HandleBeck Beck.Output
  | HandleWisconsin W.Output
  | HandleGoNoGo GNG.Output
  | HandleStroop Stroop.Output
  | HandleEnding
  | FadeOutComplete

type ChildSlots = 
  ( questions :: Q.Slot
  , barrat :: Barrat.Slot
  , beck :: Beck.BeckSlot
  , wisconsin :: W.WisconsinSlot
  , goNoGo :: GNG.GoNoGoSlot
  , stroop :: Stroop.StroopSlot
  )

_questions = Proxy :: Proxy "questions"
_barrat = Proxy :: Proxy "barrat"
_beck = Proxy :: Proxy "beck"
_wisconsin = Proxy :: Proxy "wisconsin"
_goNoGo = Proxy :: Proxy "goNoGo"
_stroop = Proxy :: Proxy "stroop"

initialState :: Stage -> State
initialState stage = { currentStage: stage, fadingOutStage: Nothing }

mainComponent :: forall query output m. MonadAff m => H.Component query Stage output m
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
        Wisconsin -> HH.slot _wisconsin 3 W.mainComponent unit HandleWisconsin
        GoNoGo -> HH.slot _goNoGo 4 GNG.component unit HandleGoNoGo
        Stroop -> HH.slot _stroop 5 Stroop.stroopComponent unit HandleStroop
        Ending -> HH.text "Ending Component"
        Void -> HH.text ""
    ]

maybeRenderFadingOut :: forall m. MonadAff m => Maybe Stage -> H.ComponentHTML Action ChildSlots m
maybeRenderFadingOut Nothing = HH.text ""
maybeRenderFadingOut (Just stage) = 
  HH.div
    [ HP.class_ $ H.ClassName "fade-out"]
    [ case stage of
        Questions -> HH.slot _questions 10 Q.questionsComponent unit HandleQuestions
        Barrat -> HH.slot _barrat 11 Barrat.barratComponent unit HandleBarrat
        Beck -> HH.slot _beck 12 Beck.mainComponent unit HandleBeck
        Wisconsin -> HH.slot _wisconsin 13 W.mainComponent unit HandleWisconsin
        GoNoGo -> HH.slot _goNoGo 14 GNG.component unit HandleGoNoGo
        Stroop -> HH.slot _stroop 15 Stroop.stroopComponent unit HandleStroop
        Ending -> HH.text "Ending Component"
        Void -> HH.text ""
    ]

mainHandler :: forall output m. MonadAff m => Action -> H.HalogenM State Action ChildSlots output m Unit
mainHandler action = do
  case action of
    HandleQuestions _ -> fadeToStage Barrat
    HandleBarrat _ -> fadeToStage Beck
    HandleBeck _ -> fadeToStage Wisconsin
    HandleWisconsin _ -> fadeToStage GoNoGo
    HandleGoNoGo _ -> fadeToStage Stroop
    HandleStroop _ -> fadeToStage Ending
    FadeOutComplete -> do
       fadingOut <- H.gets _.fadingOutStage
       case fadingOut of
            Just _ -> H.modify_ \s -> s { fadingOutStage = Nothing }
            Nothing -> pure unit
    _ -> pure unit

fadeToStage :: forall output m. MonadAff m => Stage -> H.HalogenM State Action ChildSlots output m Unit
fadeToStage nextStage = do
  H.modify_ \s -> s { fadingOutStage = Just s.currentStage }
  H.liftAff $ delay (Milliseconds 500.0)
  H.modify_ \s -> s { currentStage = nextStage }
  mainHandler FadeOutComplete
