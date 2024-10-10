module Beck where

import Prelude

import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web as AX
import Data.Array (foldl, replicate, snoc, updateAt, zip, range)
import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe(..))
import Data.Show.Generic (genericShow)
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
import Yoga.JSON as JSON

data BeckStage
  = AnxietyInstructions
  | AnxietyForm
  | DepressionInstructions
  | DepressionForm

derive instance genericBeckStage :: Generic BeckStage _

instance showBeckStage :: Show BeckStage where
  show = genericShow

type State =
  { anxietyAnswers :: Array Int
  , depressionAnswers :: Array Int
  , stage :: BeckStage
  }

data Action 
  = UpdateAnxiety Int Int
  | UpdateDepression Int Int
  | HandleSubmit Event
  | AnxietyInstructionsDone InstructionsOutput
  | AnxietyFormDone Event
  | DepressionInstructionsDone InstructionsOutput
  | ActionUnit
  | GoDepressionInstructions
  | HandleAnxietyDone Output

type DepressionAnswer = Tuple Int String

type DepressionQuestion = 
  { question :: String
  , answers :: Array DepressionAnswer
  }

initialState :: forall i. i -> State
initialState _ =
  { anxietyAnswers: replicate 21 (-100)
  , depressionAnswers: replicate 21 (-100)
  , stage: AnxietyInstructions
  }

type BeckSlot = forall query. H.Slot query Output Int

data Output = BeckDone
  | AnxietyCompleted (Array Int)

_anxietyInstructions = Proxy :: Proxy "anxietyInstructions"
_anxietySlot = Proxy :: Proxy "anxietySlot"
_depressionInstructions = Proxy :: Proxy "depressionInstructions"
_depressionSlot = Proxy :: Proxy "depressionSlot"

type ChildSlots = 
  ( anxietyInstructions :: InstructionsSlot
  , anxietySlot :: BeckSlot
  , depressionInstructions :: InstructionsSlot
  , depressionSlot :: BeckSlot
  )

handleAction :: forall m. MonadAff m => Action -> H.HalogenM State Action ChildSlots Output m Unit
handleAction action = do
  case action of
    UpdateAnxiety index val -> setAnxietyAnswer index val
    UpdateDepression index val -> setDepressionAnswer index val
    AnxietyFormDone ev -> do
       H.liftEffect $ preventDefault ev
       H.modify_ \state -> state { stage = DepressionInstructions }
    HandleSubmit ev -> handleSubmit ev
    AnxietyInstructionsDone _ -> H.modify_ \state -> state { stage = AnxietyForm }
    _ -> pure unit
    

setAnxietyAnswer :: forall m. MonadEffect m => Int -> Int -> H.HalogenM State Action ChildSlots Output m Unit
setAnxietyAnswer index val = do
  arr <- H.gets _.anxietyAnswers
  case updateAt index val arr of
       Nothing -> unsafeThrow "Could not update array"
       Just newArray -> H.modify_ \state -> state { anxietyAnswers = newArray }

setDepressionAnswer :: forall m. MonadEffect m => Int -> Int -> H.HalogenM State Action ChildSlots Output m Unit
setDepressionAnswer index val = do
  arr <- H.gets _.depressionAnswers
  case updateAt index val arr of
       Nothing -> unsafeThrow "Could not update array"
       Just newArray -> H.modify_ \state -> state { depressionAnswers = newArray }


handleSubmit :: forall m. MonadAff m => Event -> H.HalogenM State Action ChildSlots Output m Unit
handleSubmit ev = do
  H.liftEffect $ preventDefault ev
  anxietyAnswers <- H.gets _.anxietyAnswers
  depressionAnswers <- H.gets _.depressionAnswers
  let body = { anxiety: anxietyAnswers, depression: depressionAnswers }
  _ <- H.liftAff $ AX.post ResponseFormat.ignore "/beck"
    (Just $ RequestBody.String $ JSON.writeJSON body)
  H.raise BeckDone

mkAnxietyQuestion :: forall w. String -> Int -> HH.HTML w Action
mkAnxietyQuestion q index =
  HH.tr []
    [ HH.td_ [HH.text q]
    , HH.td_ 
      [ HH.input
        [HP.type_ HP.InputRadio, HP.name (show index), HP.required true, HE.onChecked \_ -> UpdateAnxiety index 0]]
    , HH.td_ 
      [ HH.input [HP.type_ HP.InputRadio, HP.name (show index), HE.onChecked \_ -> UpdateAnxiety index 1]]
    , HH.td_ 
      [ HH.input [HP.type_ HP.InputRadio, HP.name (show index), HE.onChecked \_ -> UpdateAnxiety index 2]]
    , HH.td_ 
      [ HH.input [HP.type_ HP.InputRadio, HP.name (show index), HE.onChecked \_ -> UpdateAnxiety index 3]]
    ]

mkAllAnxietyQuestions :: forall w. Array (HH.HTML w Action)
mkAllAnxietyQuestions = foldl step [] zipped
  where
        zipped = zip anxietyQuestions $ range 0 29
        step arr (Tuple q i) = snoc arr $ mkAnxietyQuestion q i

render :: forall m. MonadAff m => State -> H.ComponentHTML Action ChildSlots m
render state = case state.stage of
  AnxietyInstructions -> HH.slot _anxietyInstructions 30 (instructionsComponent anxietyInstructions) state AnxietyInstructionsDone
  AnxietyForm -> HH.slot _anxietySlot 31 anxietyComponent state HandleAnxietyDone
  DepressionInstructions -> HH.slot _depressionInstructions 32 (instructionsComponent depressionInstructions) state DepressionInstructionsDone
  DepressionForm -> HH.slot _depressionSlot 33 depressionComponent state (\_ -> ActionUnit)

renderAnxiety :: forall m.  H.ComponentHTML Action ChildSlots m
renderAnxiety =
  HH.div
    [ HP.class_ $ H.ClassName "container"]
    [ HH.form
      [ HP.id "anxiety_form"
      , HE.onSubmit \ev -> AnxietyFormDone ev
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
        , HH.tbody_ mkAllAnxietyQuestions
        ]
      , HH.input [ HP.type_ HP.InputSubmit
                 , HP.title "Siguiente"
                 , HP.value "Siguiente"
                 ]
      ]
    ]

anxietyComponent :: forall query m. MonadAff m => H.Component query State Output m
anxietyComponent =
  H.mkComponent
    { initialState: identity
    , render: (\_ -> renderAnxiety)
    , eval: H.mkEval $ H.defaultEval
       { handleAction = \action -> case action of
           AnxietyFormDone ev -> do
             H.liftEffect $ preventDefault ev
             anxAns <- H.gets _.anxietyAnswers
             H.raise $ AnxietyCompleted anxAns
           _ -> handleAction action
       }
    }

renderDepression :: forall m.  H.ComponentHTML Action ChildSlots m
renderDepression =
  HH.div
    [ HP.class_ $ H.ClassName "container"]
    [ HH.form
      [ HP.id "depression_form"
      , HE.onSubmit \ev -> HandleSubmit ev
      ]
      [ HH.div_ mkAllDepressionQuestions
      , HH.input [ HP.type_ HP.InputSubmit
                 , HP.title "Siguiente"
                 , HP.value "Siguiente"
                 ]
      ]
    ]

depressionComponent :: forall query m. MonadAff m => H.Component query State Output m
depressionComponent =
  H.mkComponent
    { initialState: identity
    , render: (\_ -> renderDepression)
    , eval: H.mkEval $ H.defaultEval
       { handleAction = handleAction
       }
    }


mainComponent :: forall query input m. MonadAff m => H.Component query input Output m
mainComponent =
  H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval { handleAction = mainHandler }
  }

mainHandler :: forall m. MonadEffect m => Action -> H.HalogenM State Action ChildSlots Output m Unit
mainHandler =
  case _ of
       AnxietyInstructionsDone _ -> H.modify_ \state -> state { stage = AnxietyForm }
       GoDepressionInstructions -> do
          H.modify_ \state -> state { stage = DepressionInstructions }
       DepressionInstructionsDone _ -> H.modify_ \state -> state { stage = DepressionForm }
       HandleAnxietyDone (AnxietyCompleted anxAns) -> do
        H.modify_ \state ->
          state { stage = DepressionInstructions
                , anxietyAnswers = anxAns
                }
       _ -> pure unit

genDepressionRadios :: forall w. Array (Tuple Int String) -> Int -> Array (HH.HTML w Action)
genDepressionRadios answers index = foldl step [] answers
  where
        step arr (Tuple val str) =
          arr <>
            [ HH.input
              [ HP.type_ HP.InputRadio
              , HP.name (show index)
              , HP.required true
              , HE.onChecked \_ -> UpdateDepression index val
              ]
            , HH.text $ "    " <> str
            , HH.br_
            ]


mkDepressionQuestion :: forall w. DepressionQuestion -> Int -> HH.HTML w Action
mkDepressionQuestion q index =
  HH.div
    [ HP.class_ $ HH.ClassName "question"]
    [ HH.label_ [HH.text q.question]
    , HH.br_
    , HH.div_ $ genDepressionRadios q.answers index
    ]

mkAllDepressionQuestions :: forall w. Array (HH.HTML w Action)
mkAllDepressionQuestions = foldl step [] zipped
  where
        zipped = zip depressionQuestions $ range 0 20
        step arr (Tuple q i) = snoc arr $ mkDepressionQuestion q i

anxietyInstructions :: String
anxietyInstructions = "En este cuestionario hay una lista de síntomas "
  <> "comunes de la ansiedad. Lea cada uno de los ítems atentamente, e "
  <> "indique cuanto le ha afectado en las últimas 2 semanas incluyendo hoy."

anxietyQuestions :: Array String
anxietyQuestions = 
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

depressionInstructions :: String
depressionInstructions = "Este cuestionario consta de 21 grupos de afirmaciones, " <>
  "por favor, lea con atención cada uno de ellos cuidadosamente. Luego elija uno " <>
  "de cada grupo, el que mejor describa el modo en que se ha sentido las últimas " <>
  "2 semanas, incluyendo el día de hoy"

depressionQuestions :: Array DepressionQuestion
depressionQuestions =
  [ { question: "Tristeza"
    , answers: [ Tuple 0 "No me siento triste."
               , Tuple 1 "Me siento triste gran parte del tiempo."
               , Tuple 2 "Me siento triste todo el tiempo."
               , Tuple 3 "Me siento tan triste o soy tan infeliz que no puedo soportarlo."
               ]
    }
  , { question: "Pesimismo"
    , answers: [ Tuple 0 "No estoy desalentado respecto a mi futuro"
               , Tuple 1 "Me siento más desalentado respecto de mi futuro que lo que solía estarlo."
               , Tuple 2 "No espero que las cosas funcionen para mí."
               , Tuple 3 "Siento que no hay esperanza para mi futuro y que sólo puede empeorar."
               ]
    }
  , { question: "Fracaso"
    , answers: [ Tuple 0 "No me siento como un fracasado."
               , Tuple 1 "He fracasado más de lo que hubiera debido."
               , Tuple 2 "Cuando miro hacia atrás, veo muchos fracasos."
               , Tuple 3 "Siento que como persona soy un fracaso total."
               ]
    }
  , { question: "Pérdida de placer"
    , answers: [ Tuple 0 "Obtengo tanto placer como siempre por las cosas de las que disfruto."
               , Tuple 1 "No disfruto tanto las cosas como solía hacerlo."
               , Tuple 2 "Obtengo muy poco placer de las cosas que solía disfrutar."
               , Tuple 3 "No puedo obtener ningún placer de las cosas de las que solía disfrutar."
               ]
    }
  , { question: "Sentimiento de culpa"
    , answers: [ Tuple 0 "No me siento particularmente culpable."
               , Tuple 1 "Me siento culpable respecto de varias cosas que he hecho o que debería haber hecho."
               , Tuple 2 "Me siento bastante la mayor parte del tiempo."
               , Tuple 3 "Me siento culpable todo el tiempo."
               ]
    }
  , { question: "Sentimiento de castigo"
    , answers: [ Tuple 0 "No siento que este siendo castigado."
               , Tuple 1 "Siento que tal vez pueda ser castigado."
               , Tuple 2 "Espero ser castigado."
               , Tuple 3 "Siento que estoy siendo castigado."
               ]
    }
  , { question: "Disconformidad con uno mismo"
    , answers: [ Tuple 0 "Siento acerca de mi lo mismo que siempre."
               , Tuple 1 "He perdido la confianza en mí mismo."
               , Tuple 2 "Estoy decepcionado conmigo mismo."
               , Tuple 3 "No me gusto a mi mismo."
               ]
    }
  , { question: "Autocrítica"
    , answers: [ Tuple 0 "No me critico ni me culpo más de lo habitual."
               , Tuple 1 "Estoy más crítico conmigo de lo que solía estarlo."
               , Tuple 2 "Me critico a mí mismo por todos mis errores."
               , Tuple 3 "Me culpo a mí mismo por todo lo malo que sucede."
               ]
    }
  , { question: "Pensamientos o deseos suicidas"
    , answers: [ Tuple 0 "No tengo ningún pensamiento de matarme."
               , Tuple 1 "He tenido pensamientos de matarme, pero no lo haría."
               , Tuple 2 "Querría matarme."
               , Tuple 3 "Me mataría si tuviera la oportunidad de hacerlo."
               ]
    }
  , { question: "Llanto"
    , answers: [ Tuple 0 "No lloro más de lo que solía hacerlo."
               , Tuple 1 "Lloro más de lo que solía hacerlo."
               , Tuple 2 "Lloro por cualquier pequeñez."
               , Tuple 3 "Siento ganas de llorar, pero no puedo."
               ]
    }
  , { question: "Agitación"
    , answers: [ Tuple 0 "No estoy más inquieto o tenso de lo habitual."
               , Tuple 1 "Me siento más inquieto o tenso que lo habitual."
               , Tuple 2 "Estoy tan inquieto o agitado que me es difícil quedarme quieto."
               , Tuple 3 "Estoy tan inquieto o agitado que tengo que estar siempre en movimiento o haciendo algo."
               ]
    }
  , { question: "Pérdida de interés"
    , answers: [ Tuple 0 "No he perdido el interés en otras actividades o personas."
               , Tuple 1 "Estoy menos interesado que antes en otras personas o cosas."
               , Tuple 2 "He perdido casi todo el interés en otras personas o cosas."
               , Tuple 3 "Me es difícil interesarme por algo."
               ]
    }
  , { question: "Indecisión"
    , answers: [ Tuple 0 "Tomo mis propias decisiones tan bien como siempre."
               , Tuple 1 "Me resulta más difícil que de costumbre tomar decisiones."
               , Tuple 2 "Encuentro mucha más dificultad que antes de tomar decisiones."
               , Tuple 3 "Tengo problemas para tomar cualquier decisión."
               ]
    }
  , { question: "Desvalorización"
    , answers: [ Tuple 0 "No siento que yo no sea valioso."
               , Tuple 1 "No me considero a mí mismo tan valioso y útil como considerarme."
               , Tuple 2 "Me siento menos valioso cuando me comparo con otros."
               , Tuple 3 "Siento que no valgo nada."
               ]
    }
  , { question: "Pérdida de energía"
    , answers: [ Tuple 0 "Tengo tanta energía como siempre."
               , Tuple 1 "Tengo menos energía que la que solía tener."
               , Tuple 2 "No tengo suficiente energía para hacer demasiado."
               , Tuple 3 "No tengo energía suficiente para hacer nada."
               ]
    }
  , { question: "Cambio de hábitos de sueño"
    , answers: [ Tuple 0 "No he experimento ningún cambio en mis hábitos de sueño."
               , Tuple 1 "Duermo un poco más que lo habitual."
               , Tuple 1 "Duermo un poco menos que lo habitual."
               , Tuple 2 "Duermo mucho más que lo habitual."
               , Tuple 2 "Duermo mucho menos que lo habitual"
               , Tuple 3 "Duermo la mayor parte del día."
               , Tuple 3 "Me despierto 1-2 horas más temprano y no puedo volver a dormirme"
               ]
    }
  , { question: "Irritabilidad"
    , answers: [ Tuple 0 "No estoy tan irritable que lo habitual."
               , Tuple 1 "Estoy más irritable que lo habitual."
               , Tuple 2 "Estoy mucho más irritable que lo habitual."
               , Tuple 3 "Estoy irritable todo el tiempo."
               ]
    }
  , { question: "Cambios en apetito"
    , answers: [ Tuple 0 "No he experimentado ningún cambio en mi apetito."
               , Tuple 1 "Mi apetito es un poco menor que lo habitual."
               , Tuple 1 "Mi apetito es un poco mayor que lo habitual."
               , Tuple 2 "Mi apetito es mucho menor que antes."
               , Tuple 2 "Mi apetito es mucho es mucho mayor que lo habitual."
               , Tuple 3 "No tengo apetito en absoluto."
               , Tuple 3 "Quiero comer todo el día."
               ]
    }
  , { question: "Dificultad en la concentración"
    , answers: [ Tuple 0 "Puedo concentrarme tan bien como siempre."
               , Tuple 1 "No puedo concentrarme tan bien como habitualmente."
               , Tuple 2 "Me es difícil mantener la mente en algo por mucho tiempo."
               , Tuple 3 "Encuentro que no puedo concentrarme en nada."
               ]
    }
  , { question: "Cansancio o fatiga"
    , answers: [ Tuple 0 "No estoy más cansado o fatigado que lo habitual."
               , Tuple 1 "Me fatigo o me canso más fácilmente que lo habitual."
               , Tuple 2 "Estoy demasiado fatigado o cansado para hacer muchas de las cosas que solía hacer."
               , Tuple 3 "Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer."
               ]
    }
  , { question: "Pérdida de interés en el sexo"
    , answers: [ Tuple 0 "No he notado ningún cambio reciente en mi interés por el sexo."
               , Tuple 1 "Estoy menos interesado en el sexo de lo que solía estarlo."
               , Tuple 2 "Estoy mucho menos interesado en el sexo."
               , Tuple 3 "He perdido completamente el interés en el sexo."
               ]
    }
  ]
