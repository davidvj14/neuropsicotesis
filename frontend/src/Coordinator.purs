module Coordinator where

import Prelude
import Data.Maybe (Maybe(..))
import Effect.Class (class MonadEffect)
import Halogen as H
import Halogen.HTML as HH
import Type.Proxy (Proxy(..))
import Questions as Q

data Stage 
  = Questions
  | Barrat
  | CardSorting
  | CardGame
  | Ending
  | Void

data Action 
  = HandleQuestions Q.Output
  | HandleBarrat
  | HandleCardSorting
  | HandleCardGame
  | HandleEnding

type ChildSlots = 
  ( questions :: Q.Slot Unit
  -- Add other slots here as needed
  -- , barrat :: Barrat.Slot Unit
  -- , cardSorting :: CardSorting.Slot Unit
  -- etc.
  )

_questions = Proxy :: Proxy "questions"

initialState :: forall i. i -> Stage
initialState _ = Questions

mainComponent :: forall query input output m. MonadEffect m => H.Component query input output m
mainComponent =
  H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval { handleAction = mainHandler }
  }

render :: forall m. MonadEffect m => Stage -> H.ComponentHTML Action ChildSlots m
render = case _ of
  Questions -> HH.slot_ _questions unit Q.questionsComponent unit
  Barrat -> HH.text "Barrat Component"
  CardSorting -> HH.text "Card Sorting Component"
  CardGame -> HH.text "Card Game Component"
  Ending -> HH.text "Ending Component"
  Void -> HH.text "Void"

mainHandler :: forall output m. MonadEffect m => Action -> H.HalogenM Stage Action ChildSlots output m Unit
mainHandler = case _ of
  HandleQuestions Q.Submitted -> H.modify_ \_ -> Barrat
  HandleBarrat -> H.modify_ \_ -> CardSorting
  HandleCardSorting -> H.modify_ \_ -> CardGame
  HandleCardGame -> H.modify_ \_ -> Ending
  HandleEnding -> H.modify_ \_ -> Void

