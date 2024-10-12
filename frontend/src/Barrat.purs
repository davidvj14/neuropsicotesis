module Barrat where

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

data BarratStage 
  = BarratInstructions
  | BarratForm

type State =
  { answers :: Array String
  , stage :: BarratStage
  }

initialState :: forall i. i -> State
initialState _ = 
  { answers: replicate 30 "" 
  , stage: BarratInstructions
  }

data Action 
  = BarratInstructionsDone InstructionsOutput
  | UpdateAnswers Int String
  | HandleSubmit Event
  | HandleBarratDone Output

data Output = BarratDone
type Slot = forall query. H.Slot query Output Int

type BarratSlot = forall query. H.Slot query Output Int

type ChildSlots = 
  ( barratInstructions :: InstructionsSlot
  , barratForm :: BarratSlot
  )

_barratInstructions = Proxy :: Proxy "barratInstructions"
_barratForm = Proxy :: Proxy "barratForm"

render :: forall m. MonadAff m => State -> H.ComponentHTML Action ChildSlots m
render state = case state.stage of
  BarratInstructions -> HH.slot _barratInstructions 20 (instructionsComponent instructions) unit BarratInstructionsDone
  BarratForm -> HH.slot _barratForm 21 barratFormComponent unit HandleBarratDone

barratComponent :: forall query input m. MonadAff m => H.Component query input Output m
barratComponent =
  H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval { handleAction = barratHandler }
  }

barratHandler :: forall m. MonadEffect m => Action -> H.HalogenM State Action ChildSlots Output m Unit
barratHandler = 
  case _ of
       BarratInstructionsDone _ -> H.modify_ \state -> state { stage = BarratForm }
       HandleBarratDone _ -> H.raise BarratDone
       _ -> pure unit

handleAction :: forall m. MonadAff m => Action -> H.HalogenM State Action () Output m Unit
handleAction action = do
  case action of
    UpdateAnswers index val -> setAnswer index val
    HandleSubmit ev -> handleSubmit ev
    _ -> pure unit

setAnswer :: forall m. MonadEffect m => Int -> String -> H.HalogenM State Action () Output m Unit
setAnswer index val = do
  arr <- H.gets _.answers
  case updateAt index val arr of
       Nothing -> unsafeThrow "Could not update array"
       Just newArray -> H.modify_ \state -> state { answers = newArray }

handleSubmit :: forall m. MonadAff m => Event -> H.HalogenM State Action () Output m Unit
handleSubmit ev = do
  H.liftEffect $ preventDefault ev
  answers <- H.gets _.answers
  _ <- H.liftAff $ AX.post ResponseFormat.ignore "/barrat"
    (Just $ RequestBody.String $ joinWith " " answers)
  H.raise BarratDone

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

renderBarrat :: forall m. State -> H.ComponentHTML Action () m
renderBarrat _ =
  HH.div
    [ HP.class_ $ H.ClassName "container"]
    [ HH.form
      [ HP.id "barrat_form"
      , HE.onSubmit \ev -> HandleSubmit ev
      ]
      [ HH.table_
        [ HH.thead_ 
          [ HH.tr []
            [ HH.th_ []
            , HH.th_ [HH.text "Raramente o nunca"]
            , HH.th_ [HH.text "Ocasionalmente"]
            , HH.th_ [HH.text "A menudo"]
            , HH.th_ [HH.text "Siempre o casi siempre"]
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

barratFormComponent :: forall input query m. MonadAff m => H.Component query input Output m
barratFormComponent =
  H.mkComponent
    { initialState
    , render: renderBarrat
    , eval: H.mkEval $ H.defaultEval
       { handleAction = handleAction
       }
    }

instructions :: String
instructions =
  "Las personas son diferentes en cuanto a la forma en que se comportan y " <>
  "piensan en distintas situaciones. Ésta es una  prueba para medir algunas " <>
  "de las formas en que usted actúa y piensa. No se detenga demasiado tiempo " <>
  "en ninguna de las oraciones. Responda rápida y honestamente."

questions :: Array String
questions = 
  [ "1. Planifico mis tareas con cuidado"
  , "2. Hago las cosas sin pensarlas"
  , "3. Casi nunca me tomo las cosas a pecho (no me perturbo con facilidad)"
  , "4. Mis pensamientos pueden tener gran velocidad (tengo pensamientos que van muy rápido en mi mente)"
  , "5. Planifico mis viajes con antelación"
  , "6. Soy una persona con autocontrol"
  , "7. Me concentro con facilidad (se me hace fácil concentrarme)"
  , "8. Ahorro con regularidad"
  , "9. Se me hace difícil estar quieto/a durante largos períodos de tiempo"
  , "10. Pienso las cosas cuidadosamente"
  , "11. Planifico para tener un trabajo fijo (me esfuerzo por asegurar que tendré dinero para pagar mis gastos)"
  , "12. Digo las cosas sin pensarlas"
  , "13. Me gusta pensar sobre problemas complicados (me gusta pensar sobre problemas complejos)"
  , "14. Cambio de trabajo frecuentemente (no me quedo en el mismo trabajo durante largos períodos de tiempo)"
  , "15. Actúo impulsivamente"
  , "16. Me aburro con facilidad tratando de resolver problemas en mi mente (me aburre pensar en algo por demasiado tiempo)"
  , "17. Visito al médico y al dentista con regularidad"
  , "18. Hago las cosas en el momento que se me ocurren"
  , "19. Soy una persona que piensa sin distraerse (puedo enfocar mi mente en una sola cosa por mucho tiempo)"
  , "20. Cambio de vivienda a menudo (me mudo con frecuencia o no me gusta vivir en el mismo sitio por mucho tiempo)"
  , "21. Compro cosas impulsivamente"
  , "22. Termino lo que empiezo"
  , "23. Camino y me muevo con rapidez"
  , "24. Resuelvo los problemas experimentando (resuelvo los problemas empleando una posible solución y viendo si funciona)"
  , "25. Gasto en efectivo o a crédito más de lo que gano (gasto más de lo gano)"
  , "26. Hablo rápido"
  , "27. Tengo pensamientos extraños cuando estoy pensando (a veces tengo pensamientos irrelevantes cuando pienso)"
  , "28. Me interesa más el presente que el futuro"
  , "29. Me siento inquieto/a en clases o charlas (me siento inquieto/a si tengo que oír a alguien hablar durante un largo período de tiempo)"
  , "30. Planifico el futuro (me interesa más el futuro que el presente)"
  ]

