module Coordinator where

import Prelude

import Extras (setStageCookie)
import Beck as Beck
import Barrat as Barrat
import Data.Maybe (Maybe(..))
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
       "void" -> Void
       "ending" -> Ending
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
initialState stage = { currentStage: stage }

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
      [ renderCurrent state.currentStage ]
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
        Ending -> ending
        Void -> HH.text ""
    ]

mainHandler :: forall output m. MonadAff m => Action -> H.HalogenM State Action ChildSlots output m Unit
mainHandler action = do
  case action of
    HandleQuestions Q.Submitted -> do
       H.liftEffect $ setStageCookie "barrat"
       fadeToStage Barrat
    HandleQuestions Q.BadCodes -> do
       H.liftEffect $ setStageCookie "void"
       fadeToStage Void
    HandleBarrat _ -> do 
       H.liftEffect $ setStageCookie "beck"
       fadeToStage Beck
    HandleBeck _ -> do
       H.liftEffect $ setStageCookie "wisconsin"
       fadeToStage Wisconsin
    HandleWisconsin _ -> do
       --H.liftEffect $ setStageCookie "gonogo"
       fadeToStage GoNoGo
    HandleGoNoGo _ -> do
       H.liftEffect $ setStageCookie "stroop"
       fadeToStage Stroop
    HandleStroop _ -> do
       H.liftEffect $ setStageCookie "ending"
       fadeToStage Ending
    _ -> pure unit

fadeToStage :: forall output m. MonadAff m => Stage -> H.HalogenM State Action ChildSlots output m Unit
fadeToStage nextStage = do
  H.modify_ \s -> s { currentStage = nextStage }

ending :: forall m. MonadAff m => H.ComponentHTML Action ChildSlots m
ending = 
  HH.div
    [ HP.class_ $ H.ClassName "ending-container" ]
    [ HH.img [ HP.src "public/gracias.jpeg", HP.style "width: 50vw;" ]
    , HH.br_
    , HH.h2_ [ HH.text "Has finalizado toda la prueba, agradecemos tu participación." ]
    ]

