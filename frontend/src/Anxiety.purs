module Anxiety where

import Prelude

import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web as AX
import Data.Array (foldl, replicate, snoc, updateAt, zip, range)
import Data.Maybe (Maybe(..))
import Data.String (joinWith)
import Data.Tuple (Tuple(..))
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect)
import Effect.Exception.Unsafe (unsafeThrow)
import Extras (InstructionsOutput, InstructionsSlot, instructionsComponent)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Type.Proxy (Proxy(..))
import Web.Event.Event (Event, preventDefault)

data AnxietyStage
  = Instructions
  | AnxietyForm

type State =
  { answers :: Array String
  , stage :: AnxietyStage
  }

initialState :: forall i. i -> State
initialState _ =
  { answers: replicate 30 ""
  , stage: Instructions
  }

type AnxietySlot = forall query. H.Slot query Output Int

type ChildSlots = 
  ( instructions :: InstructionsSlot
  , anxietySlot :: AnxietySlot
  )

_instructions = Proxy :: Proxy "instructions"
_anxietySlot = Proxy :: Proxy "anxietySlot"

data Action 
  = UpdateAnswers Int String
  | HandleSubmit Event
  | InstructionsDone InstructionsOutput
  | ActionUnit

data Output = AnxietyDone
type Slot = forall query. H.Slot query Output Int

handleAction :: forall m. MonadAff m => Action -> H.HalogenM State Action ChildSlots Output m Unit
handleAction action = do
  case action of
    UpdateAnswers index val -> setAnswer index val
    HandleSubmit ev -> handleSubmit ev
    InstructionsDone _ -> H.modify_ \state -> state { stage = AnxietyForm }
    _ -> pure unit
    

setAnswer :: forall m. MonadEffect m => Int -> String -> H.HalogenM State Action ChildSlots Output m Unit
setAnswer index val = do
  arr <- H.gets _.answers
  case updateAt index val arr of
       Nothing -> unsafeThrow "Could not update array"
       Just newArray -> H.modify_ \state -> state { answers = newArray }

handleSubmit :: forall m. MonadAff m => Event -> H.HalogenM State Action ChildSlots Output m Unit
handleSubmit ev = do
  H.liftEffect $ preventDefault ev
  answers <- H.gets _.answers
  _ <- H.liftAff $ AX.post ResponseFormat.ignore "/anxiety"
    (Just $ RequestBody.String $ joinWith " " answers)
  H.raise AnxietyDone

instructions :: String
instructions = "En este cuestionario hay una lista de síntomas "
  <> "comunes de la ansiedad. Lea cada uno de los ítems atentamente, e "
  <> "indique cuanto le ha afectado en las últimas 2 semanas incluyendo hoy."

questions :: Array String
questions = 
  [ "1. Torpe o entumecido"
  , "2. Acalorado"
  , "3. Con temblor en las piernas"
  , "4. Incapaz de relajarse"
  , "5. Con temor a que ocurra lo peor"
  , "6. Mareado, o que se le va la cabeza"
  , "7. Con latidos del corazón fuerte y acelerados"
  , "8. Inestable"
  , "9. Atemorizado o asustado"
  , "10. Nervioso"
  , "11. Con sensación de bloqueo"
  , "12. Con temblores en las manos"
  , "13. Inquieto, inseguro"
  , "14. Con miedo a perder el control"
  , "15. Con sensación de ahogo"
  , "16. Con temor a morir"
  , "17. Con miedo"
  , "18. Con problemas digestivos"
  , "19. Con desvanecimientos"
  , "20. Con rubor facial"
  , "21. Con sudores, frios o calientes"
  ]

mkQuestion :: forall w. String -> Int -> HH.HTML w Action
mkQuestion q index =
  HH.tr []
    [ HH.td_ [HH.text q]
    , HH.td_ 
      [ HH.input
        [HP.type_ HP.InputRadio, HP.name (show index), HP.required true, HE.onChecked \_ -> UpdateAnswers index "1"]]
    , HH.td_ 
      [ HH.input [HP.type_ HP.InputRadio, HP.name (show index), HE.onChecked \_ -> UpdateAnswers index "2"]]
    , HH.td_ 
      [ HH.input [HP.type_ HP.InputRadio, HP.name (show index), HE.onChecked \_ -> UpdateAnswers index "3"]]
    , HH.td_ 
      [ HH.input [HP.type_ HP.InputRadio, HP.name (show index), HE.onChecked \_ -> UpdateAnswers index "4"]]
    ]

mkAllQuestions :: forall w. Array (HH.HTML w Action)
mkAllQuestions = foldl step [] zipped
  where
        zipped = zip questions $ range 0 29
        step arr (Tuple q i) = snoc arr $ mkQuestion q i

render :: forall m. MonadAff m => State -> H.ComponentHTML Action ChildSlots m
render state = case state.stage of
  Instructions -> HH.slot _instructions 0 (instructionsComponent instructions) unit InstructionsDone
  AnxietyForm -> HH.slot _anxietySlot 1 anxietyComponent unit (\_ -> ActionUnit)

renderAnxiety :: forall m.  H.ComponentHTML Action ChildSlots m
renderAnxiety =
  HH.div
    [ HP.class_ $ H.ClassName "container"]
    [ HH.form
      [ HP.id "anxiety_form"
      , HE.onSubmit \ev -> HandleSubmit ev
      ]
      [ HH.table_
        [ HH.thead_ 
          [ HH.tr []
            [ HH.th_ []
            , HH.th_ [HH.text "En absoluto"]
            , HH.th_ [HH.text "Levemente"]
            , HH.th_ [HH.text "Moderadamente"]
            , HH.th_ [HH.text "Severamente"]
            ]
          ]
        , HH.tbody_ mkAllQuestions
        ]
      , HH.input [ HP.type_ HP.InputSubmit
                 , HP.title "Siguiente"
                 , HP.value "Siguiente"
                 ]
      ]
    ]

anxietyComponent :: forall input query m. MonadAff m => H.Component query input Output m
anxietyComponent =
  H.mkComponent
    { initialState
    , render: (\_ -> renderAnxiety)
    , eval: H.mkEval $ H.defaultEval
       { handleAction = handleAction
       }
    }
