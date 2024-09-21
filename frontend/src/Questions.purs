module Questions where

import Prelude

import Data.Maybe (Maybe(..))
import Effect.Class (class MonadEffect)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Web.Event.Event (Event, preventDefault)

data State = State | State2

data Action 
  = ValidateCode Event 
  | SendForm 
  | SendForm2 
  | GoNext

data Output = Submitted

type Slot = H.Slot Query Output

data Query a = GetState (State -> a)

initialState :: forall i. i -> State
initialState _ = State

questionsComponent :: forall input m. MonadEffect m => H.Component Query input Output m
questionsComponent =
  H.mkComponent
    { initialState
    , render: renderQuestions
    , eval: H.mkEval $ H.defaultEval 
        { handleAction = eventHandler
        , handleQuery = handleQuery
        }
    }

renderQuestions :: forall m. State -> H.ComponentHTML Action () m
renderQuestions state = case state of
  State -> renderQuestionsForm
  State2 -> HH.div_ [HH.text "State 2"]

renderQuestionsForm :: forall m. H.ComponentHTML Action () m
renderQuestionsForm = 
  HH.form
    [ HP.id "participant_form"
    , HE.onSubmit \ev -> ValidateCode ev
    ]
    [ ageQuestion 
    , HH.input [ HP.type_ HP.InputSubmit, HP.title "Siguiente" ]
    ]

eventHandler :: forall m. MonadEffect m => Action -> H.HalogenM State Action () Output m Unit
eventHandler = case _ of
  ValidateCode ev -> do
     H.liftEffect $ preventDefault ev
     H.raise Submitted
  SendForm -> H.modify_ \_ -> State2
  SendForm2 -> H.modify_ \_ -> State
  GoNext -> H.raise Submitted

handleQuery :: forall a m. MonadEffect m => Query a -> H.HalogenM State Action () Output m (Maybe a)
handleQuery = case _ of
  GetState reply -> do
    state <- H.get
    pure $ Just (reply state)

mkQuestion :: forall w i. String -> HH.HTML w i -> HH.HTML w i
mkQuestion label innerHtml =
  HH.div 
    [ HP.class_ $ HH.ClassName "question" ]
    [ HH.text label 
    , HH.br_
    , innerHtml
    , HH.br_
    ]

ageQuestion :: forall w. HH.HTML w Action
ageQuestion = mkQuestion "Edad" $ 
  HH.input
    [ HP.type_ HP.InputNumber
    , HP.id "age"
    , HP.name "participant[age]"
    , HP.required true
    , HE.onValueInput \_ -> SendForm
    ]

