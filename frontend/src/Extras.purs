module Extras where

import Prelude

import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP

data InstructionsOutput = DoneReading
data Action = ClickedDone
type State = Unit

initialState :: forall i. i -> State
initialState _ = unit

instructionsComponent :: forall input query m. MonadAff m => String -> H.Component query input InstructionsOutput m
instructionsComponent instructions = 
  H.mkComponent
    { initialState
    , render: (\_ -> renderInstructions instructions)
    , eval: H.mkEval $ H.defaultEval 
      { handleAction = handleAction }
    }

renderInstructions :: forall m. String -> H.ComponentHTML Action () m
renderInstructions instructions = mkInstructions instructions

handleAction :: forall m. MonadAff m => Action -> H.HalogenM State Action () InstructionsOutput m Unit
handleAction _ = H.raise DoneReading

mkInstructions :: forall w. String -> HH.HTML w Action
mkInstructions instructions = 
  HH.div
    [ HP.class_ $ HH.ClassName "instructions-container" ]
    [ HH.text instructions 
    , HH.br_
    , HH.input
        [ HP.type_ HP.InputButton 
        , HE.onClick \_ -> ClickedDone
        , HP.value "Continuar"
        ]
    ]

type InstructionsSlot = forall query. H.Slot query InstructionsOutput Int
