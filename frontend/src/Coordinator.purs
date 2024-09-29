module Coordinator where

import Prelude

import Barrat as Barrat
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect)
import Halogen as H
import Halogen.HTML as HH
import Questions as Q
import Type.Proxy (Proxy(..))

data Stage 
  = Questions
  | Barrat
  | Wisconsin
  | Beck
  | GoNoGo
  | Stroop
  | Ending
  | Void

data Action 
  = HandleQuestions Q.Output
  | HandleBarrat Barrat.Output
  | HandleCardSorting
  | HandleCardGame
  | HandleEnding

type ChildSlots = 
  ( questions :: Q.Slot
  , barrat :: Barrat.Slot
  )

_questions = Proxy :: Proxy "questions"
_barrat = Proxy :: Proxy "barrat"

initialState :: forall i. i -> Stage
initialState _ = Questions

mainComponent :: forall query input output m. MonadAff m => H.Component query input output m
mainComponent =
  H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval { handleAction = mainHandler }
  }

render :: forall m. MonadAff m => Stage -> H.ComponentHTML Action ChildSlots m
render stage = case stage of
  Questions -> HH.slot _questions 0 Q.questionsComponent unit HandleQuestions
  Barrat -> HH.slot _barrat 1 Barrat.barratComponent unit HandleBarrat
  Wisconsin -> HH.text "Wisconsin Component"
  Beck -> HH.text "Beck Component"
  GoNoGo -> HH.text "GoNoGo Component"
  Stroop -> HH.text "Stroop Component"
  Ending -> HH.text "Ending Component"
  Void -> HH.text "Void"

mainHandler :: forall output m. MonadEffect m => Action -> H.HalogenM Stage Action ChildSlots output m Unit
mainHandler action = do
  case action of
    HandleQuestions _ -> H.modify_ \_ -> Barrat
    HandleBarrat _ -> H.modify_ \_ -> Wisconsin
    HandleCardSorting -> H.modify_ \_ -> Beck
    HandleCardGame -> H.modify_ \_ -> Ending
    HandleEnding -> H.modify_ \_ -> Void

