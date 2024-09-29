module Questions where

import Prelude

import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web as AX
import Data.Argonaut.Core (jsonSingletonObject, stringify, Json)
import Data.Argonaut.Core as DAC
import Data.Argonaut.Encode as DAE
import Data.Either (Either(..))
import Data.Foldable (traverse_)
import Data.Int (fromString)
import Data.Maybe (Maybe(..), fromMaybe)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Console (log)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Web.Event.Event (Event, preventDefault)

type State =
  { formData :: FormData
  , conditionalDivs :: ConditionalDivs
  , code :: String
  }

type FormData =
  { age :: Int
  , sex :: Int
  , major :: String
  , alcohol :: Boolean
  , alcoholFreq :: Maybe Int
  , drugs :: Boolean
  , drugsFreq :: Maybe Int
  , disorder :: Boolean
  , disorderInput :: Maybe String
  , injury :: Boolean
  , injuryLocation :: Maybe String
  , injuryTreated :: Maybe Boolean
  , abuse :: Int
  , abuseOther :: Maybe String
  , shortage :: Int
  , loss :: Boolean
  }

formToJSON :: FormData -> Json
formToJSON = DAE.encodeJson

type ConditionalDivs =
  { alcoholFreq :: Boolean
  , drugsFreq :: Boolean
  , disorder :: Boolean
  , injury :: Boolean
  , abuseOther :: Boolean
  , badCode :: Boolean
  }

data Action 
  = UpdateForm String String
  | UpdateCode String
  | ShowQuestion String Boolean
  | CompositeAction (Array Action)
  | SendForm Event
  | GoNext

data Output = Submitted

type Slot = forall query. H.Slot query Output Int

--data Query a = GetState (State -> a)

initialState :: forall i. i -> State
initialState _ =
  { formData:
      { age: -1
      , sex: -1
      , major: ""
      , alcohol: false
      , alcoholFreq: Nothing
      , drugs: false
      , drugsFreq: Nothing
      , disorder: false
      , disorderInput: Nothing
      , injury: false
      , injuryLocation: Nothing
      , injuryTreated: Nothing
      , abuse: -1
      , abuseOther: Nothing
      , shortage: -1
      , loss: false
    }
    , conditionalDivs: 
      { alcoholFreq: false
      , drugsFreq: false
      , disorder: false
      , injury: false
      , abuseOther: false
      , badCode : false
      }
    , code: ""
  }

questionsComponent :: forall input query m. MonadAff m => H.Component query input Output m
questionsComponent =
  H.mkComponent
    { initialState
    , render: renderQuestions
    , eval: H.mkEval $ H.defaultEval 
        { handleAction = eventHandler
        }
    }

renderQuestions :: forall m. State -> H.ComponentHTML Action () m
renderQuestions = renderQuestionsForm

renderQuestionsForm :: forall m. State -> H.ComponentHTML Action () m
renderQuestionsForm state = 
  HH.div 
    [ HP.class_ $ H.ClassName "container"]
    [ HH.h1_ [ HH.text "Evaluación neuropsicológica" ]
    , HH.h3_ [ HH.text $ "Hola, muchas gracias por tomarte el tiempo para participar, " <>
                         "por favor contesta con sinceridad, se te asignará un número " <>
                         "de participante por lo que tus respuestas serán anónimas." ]
    , HH.form
        [ HP.id "participant_form"
        , HE.onSubmit \ev -> SendForm ev
        ]
        [ ageQuestion 
        , sexQuestion
        , majorQuestion
        , alcoholQuestion
        , if state.conditionalDivs.alcoholFreq then alcoholFreqQuestion else HH.div_[]
        , drugsQuestion
        , disorderQuestion
        , if state.conditionalDivs.disorder then disorderInputQuestion else HH.div_[]
        , injuryQuestion
        , if state.conditionalDivs.injury then injuryLocationQuestion else HH.div_ []
        , if state.conditionalDivs.injury then injuryTreatedQuestion else HH.div_ []
        , abuseQuestion state.conditionalDivs.abuseOther
        , shortageQuestion
        , lossQuestion
        , codeVerification state.conditionalDivs.badCode
        , HH.input [ HP.type_ HP.InputSubmit
                   , HP.title "Siguiente"
                   , HP.value "Siguiente"
                   ]
        ]
    ]

eventHandler :: forall m. MonadAff m => Action -> H.HalogenM State Action () Output m Unit
eventHandler = case _ of
  SendForm ev -> do
     H.liftEffect $ preventDefault ev
     formHandler
  UpdateForm k v -> updateForm k v
  ShowQuestion k b -> showQuestion k b
  UpdateCode newCode -> updateCode newCode
  CompositeAction actions -> traverse_ eventHandler actions
  _ -> H.raise Submitted

{-
handleQuery :: forall a m. MonadEffect m => Query a -> H.HalogenM State Action () Output m (Maybe a)
handleQuery = case _ of
  GetState reply -> do
    state <- H.get
    pure $ Just (reply state)
    -}
updateForm :: forall m. MonadEffect m => String -> String -> H.HalogenM State Action () Output m Unit
updateForm key value = do
  formData <- H.gets _.formData
  H.modify_ \state -> { formData: (case key of
             "age" -> formData { age = fromMaybe (-1) $ fromString value}
             "sex" -> formData { sex = fromMaybe (-1) $ fromString value}
             "major" -> formData { major = value }
             "alcohol" -> formData { alcohol = value == "1" }
             "alcohol_freq" -> formData { alcoholFreq = Just $ fromMaybe (-1) $ fromString value }
             "drugs" -> formData { drugs = value == "1" }
             "drugs_freq" -> formData { drugsFreq = Just $ fromMaybe (-1) $ fromString value }
             "disorder" -> formData { disorder = value == "1" }
             "disorderInput" -> formData { disorderInput = Just value }
             "injury" -> formData { injury = value == "1" }
             "injuryLocation" -> formData { injuryLocation = Just value }
             "injuryTreated" -> formData { injuryTreated = Just $ value == "1" }
             "abuse" -> formData { abuse = formData.abuse + (fromMaybe (0) $ fromString value) }
             "abuseOther" -> formData { abuseOther = Just value }
             "shortage" -> formData { shortage = formData.shortage + (fromMaybe (0) $ fromString value) }
             _ -> formData)
             , conditionalDivs: state.conditionalDivs
             , code: state.code
             }

showQuestion :: forall m. MonadEffect m => String -> Boolean -> H.HalogenM State Action () Output m Unit
showQuestion key shouldShow = H.modify_ \state -> 
  { formData: state.formData
  , conditionalDivs: (
    case key of
         "alcoholFreq" -> state.conditionalDivs { alcoholFreq = shouldShow }
         "drugsFreq" -> state.conditionalDivs { drugsFreq = shouldShow }
         "disorder" -> state.conditionalDivs { disorder = shouldShow }
         "injury" -> state.conditionalDivs { injury = shouldShow }
         "abuseOther" -> state.conditionalDivs { abuseOther = shouldShow }
         _ -> state.conditionalDivs)
  , code: state.code
  }

updateCode :: forall m. MonadEffect m => String -> H.HalogenM State Action () Output m Unit
updateCode newCode = H.modify_ \state ->
  { formData: state.formData
  , conditionalDivs: state.conditionalDivs
  , code: newCode
  }

formHandler :: forall m. MonadAff m => H.HalogenM State Action () Output m Unit
formHandler = do
  code <- H.gets _.code
  codeResult <- H.liftAff $ validateCode code
  if codeResult
    then do
       form <- H.gets _.formData
       H.liftAff $ sendForm form
       H.liftEffect $ log "submitting..."
       H.raise Submitted
    else do
       H.modify_ \state -> { formData: state.formData
                           , conditionalDivs: state.conditionalDivs { badCode = true }
                           , code: state.code
                           }

sendForm :: FormData -> Aff Unit
sendForm form = do
  _ <- AX.post ResponseFormat.json "/participant"
    (Just $ RequestBody.json (formToJSON form))
  pure unit

validateCode :: String -> Aff Boolean
validateCode code = do
  response <- AX.post ResponseFormat.json "/code-validation"
    (Just $ RequestBody.json (jsonSingletonObject "code" (DAC.fromString code)))
  case response of
       Left err -> do
          liftEffect $ log $ AX.printError err
          pure false
       Right { body } -> do
          liftEffect $ log $ stringify body
          pure true

mkQuestion :: forall w i. String -> Array (HH.HTML w i) -> HH.HTML w i
mkQuestion label innerHtml =
  HH.div 
    [ HP.class_ $ HH.ClassName "question" ](
    [ HH.label_ [HH.text label]
    , HH.br_] <> innerHtml <> [HH.br_])

ageQuestion :: forall w. HH.HTML w Action
ageQuestion = mkQuestion "Edad" [
  HH.input
    [ HP.type_ HP.InputNumber
    , HP.id "age"
    , HP.required true
    , HE.onValueInput \val -> UpdateForm "age" val
    ]
  ]

sexQuestion :: forall w. HH.HTML w Action
sexQuestion = mkQuestion "Sexo"
  [ HH.input
    [ HP.type_ HP.InputRadio 
    , HP.id "sex"
    , HP.required true
    , HP.value "0"
    , HE.onChecked \_ -> UpdateForm "sex" "0"
    ]
  , HH.text "Masculino"
  , HH.br_
  , HH.input
    [ HP.type_ HP.InputRadio 
    , HP.id "sex"
    , HP.required true
    , HP.value "1"
    , HE.onChecked \_ -> UpdateForm "sex" "1"
    ]
  , HH.text "Femenino"
  ]

majorQuestion :: forall w. HH.HTML w Action
majorQuestion = mkQuestion "Carrera"
  [ HH.input
    [ HP.type_ HP.InputText
    , HP.id "major"
    , HP.required true
    , HE.onValueInput \val -> UpdateForm "major" val
    ]
  ]

alcoholQuestion :: forall w. HH.HTML w Action
alcoholQuestion = mkQuestion "¿Consumes alcohol?"
  [ HH.input 
    [ HP.type_ HP.InputRadio
    , HP.id "alcohol_yes"
    , HP.name "alcohol"
    , HP.required true
    , HE.onChecked \_ -> CompositeAction
      [ UpdateForm "alcohol" "1"
      , ShowQuestion "alcoholFreq" true 
      ]
    ]
  , HH.text "Sí"
  , HH.br_
  , HH.input 
    [ HP.type_ HP.InputRadio
    , HP.id "alcohol_no"
    , HP.name "alcohol"
    , HP.required true
    , HE.onChecked \_ -> CompositeAction
      [ UpdateForm "alcohol" "0"
      , ShowQuestion "alcoholFreq" false 
      ]
    ]
  , HH.text "No"
  ]

alcoholFreqQuestion :: forall w. HH.HTML w Action
alcoholFreqQuestion = mkQuestion "¿Con qué frecuencia consumes? (Sin importar la cantidad)"
  [ HH.select
      [ HP.id "alcohol"
      , HE.onValueChange \value -> UpdateForm "alcoholFreq" value
      , HP.required true
      ]
      [ HH.option
          [ HP.disabled true, HP.selected true, HP.value "" ]
          [HH.text "Seleccionar frecuencia"]
      , HH.option
          [ HP.value "0" ]
          [HH.text "Todos los días"]
      , HH.option
          [ HP.value "1" ]
          [HH.text "Una vez a la semana"]
      , HH.option
          [ HP.value "2" ]
          [HH.text "Cada dos semanas"]
      , HH.option
          [ HP.value "3" ]
          [HH.text "Una vez al mes"]
      , HH.option
          [ HP.value "4" ]
          [HH.text "De manera esporádica"]
      ]

  ]

drugsQuestion :: forall w. HH.HTML w Action
drugsQuestion = mkQuestion "¿Consumes drogas?"
  [ HH.input 
    [ HP.type_ HP.InputRadio
    , HP.id "drugs_yes"
    , HP.required true
    , HE.onChecked \_ -> CompositeAction
      [ UpdateForm "drugs" "1"
      , ShowQuestion "drugsFreq" false 
      ]
    ]
  , HH.text "Sí"
  , HH.br_
  , HH.input 
    [ HP.type_ HP.InputRadio
    , HP.id "drugs_no"
    , HP.required true
    , HE.onChecked \_ -> CompositeAction
      [ UpdateForm "drugs" "0"
      , ShowQuestion "drugsFreq" false 
      ]
    ]
  , HH.text "No"
  ]

drugsFreqQuestion :: forall w. HH.HTML w Action
drugsFreqQuestion = mkQuestion "¿Con qué frecuencia consumes? (Sin importar la cantidad)"
  [ HH.select
      [ HP.id "drugs"
      , HE.onValueChange \value -> UpdateForm "drugsFreq" value
      , HP.required true
      ]
      [ HH.option
          [ HP.disabled true, HP.selected true, HP.value "" ]
          [HH.text "Seleccionar frecuencia"]
      , HH.option
          [ HP.value "0" ]
          [HH.text "Todos los días"]
      , HH.option
          [ HP.value "1" ]
          [HH.text "Una vez a la semana"]
      , HH.option
          [ HP.value "2" ]
          [HH.text "Cada dos semanas"]
      , HH.option
          [ HP.value "3" ]
          [HH.text "Una vez al mes"]
      , HH.option
          [ HP.value "4" ]
          [HH.text "De manera esporádica"]
      ]
  ]

disorderQuestion :: forall w. HH.HTML w Action
disorderQuestion = mkQuestion "Tienes algún diagnóstico psiquiátrico o neurológico?"
  [ HH.small_
      [HH.text $ "Dicho diagnóstico debe de haber sido designado por un profesional de la salud, " <>
                 "puede ser diagnóstico de ansiedad, depresión, bipolaridad tipo I o II, TDA-H, " <>
                 "autismo, alguna enfermedad neurodegenerativa, etc."
      ]
  , HH.input
      [ HP.type_ HP.InputRadio 
      , HP.id "disorder_yes"
      , HP.name "disorder"
      , HP.value "1"
      , HP.required true
      , HE.onChecked \_ -> CompositeAction [ UpdateForm "disorder" "1", ShowQuestion "disorder" true ]
      ]
  , HH.text "Sí"
  , HH.input
      [ HP.type_ HP.InputRadio 
      , HP.id "disorder_no"
      , HP.name "disorder"
      , HP.value "0"
      , HP.required true
      , HE.onChecked \_ -> CompositeAction [ UpdateForm "disorder" "0", ShowQuestion "disorder" false ]
      ]
  , HH.text "No"
  ]

disorderInputQuestion :: forall w. HH.HTML w Action
disorderInputQuestion = mkQuestion "¿Cuál es tu diagnóstico?"
  [ HH.input
      [ HP.type_ HP.InputText
      , HP.id "disorder_input"
      , HP.name "disorder"
      , HP.required true
      , HE.onValueChange \val -> UpdateForm "disorderInput" val
      ]
  ]

injuryQuestion :: forall w. HH.HTML w Action
injuryQuestion = mkQuestion "¿Has presentado algún golpe en la cabeza importante?"
  [ HH.small_
      [HH.text $ "Por el cual te hayan hecho una tomografía y " <> 
        "que haya generado algún traumatismo en el cerebro"
      ]
  , HH.input
      [ HP.type_ HP.InputRadio 
      , HP.id "injury_yes"
      , HP.name "injury"
      , HP.value "1"
      , HP.required true
      , HE.onChecked \_ -> CompositeAction [ UpdateForm "injury" "1", ShowQuestion "injury" true ]
      ]
  , HH.text "Sí"
  , HH.input
      [ HP.type_ HP.InputRadio 
      , HP.id "injury_no"
      , HP.name "injury"
      , HP.value "0"
      , HP.required true
      , HE.onChecked \_ -> CompositeAction [ UpdateForm "injury" "0", ShowQuestion "injury" false ]
      ]
  , HH.text "No"
  ]

injuryLocationQuestion :: forall w. HH.HTML w Action
injuryLocationQuestion = mkQuestion "¿En dónde se ubicó el golpe?"
  [ HH.input
      [ HP.type_ HP.InputText
      , HP.id "injury_location_input"
      , HP.name "injury_location"
      , HP.required true
      , HE.onValueChange \val -> UpdateForm "injuryLocation" val
      ]
  ]

injuryTreatedQuestion :: forall w. HH.HTML w Action
injuryTreatedQuestion = mkQuestion "¿Fue tratado el traumatismo?"
  [ HH.input
      [ HP.type_ HP.InputRadio 
      , HP.id "treated_yes"
      , HP.name "treated"
      , HP.value "1"
      , HP.required true
      , HE.onChecked \_ -> UpdateForm "injuryTreated" "1"
      ]
  , HH.text "Sí"
  , HH.input
      [ HP.type_ HP.InputRadio 
      , HP.id "treated_no"
      , HP.name "treated"
      , HP.value "0"
      , HP.required true
      , HE.onChecked \_ -> UpdateForm "injuryTreated" "0"
      ]
  , HH.text "No"
  ]

abuseQuestion :: forall w. Boolean -> HH.HTML w Action
abuseQuestion other = mkQuestion "¿En tu vida viviste algún tipo de abuso?"
  [ HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "abuse"
      , HE.onChecked \c -> UpdateForm "abuse" $ if c then "1" else "-1"
      ]
  , HH.text "Abuso psicológico"
  , HH.br_
  , HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "abuse"
      , HE.onChecked \c -> UpdateForm "abuse" $ if c then "2" else "-2"
      ]
  , HH.text "Violencia física"
  , HH.br_
  , HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "abuse"
      , HE.onChecked \c -> UpdateForm "abuse" $ if c then "4" else "-4"
      ]
  , HH.text "Abuso sexual"
  , HH.br_
  , HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "abuse"
      , HE.onChecked \c -> UpdateForm "abuse" $ if c then "8" else "-8"
      ]
  , HH.text "Abuso escolar o bullying"
  , HH.br_
  , HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "abuse"
      , HE.onChecked \c -> UpdateForm "abuse" $ if c then "16" else "-16"
      ]
  , HH.text "Abuso financiero"
  , HH.br_
  , HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "abuse"
      , HE.onChecked \c -> UpdateForm "abuse" $ if c then "-1000" else "1000"
      ]
  , HH.text "Ninguno"
  , HH.br_
  , HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "abuse"
      , HE.onChecked \c -> CompositeAction 
          [ UpdateForm "abuse" $ if c then "32" else "-32"
          , ShowQuestion "abuseOther" c
          ]
      ]
  , HH.text "Otro"
  , if other then abuseQuestionOther else HH.div_ []
  ]

abuseQuestionOther :: forall w. HH.HTML w Action
abuseQuestionOther = 
  HH.input 
    [ HP.type_ HP.InputText, HP.name "abuseOther", HP.required true ]
  

shortageQuestion :: forall w. HH.HTML w Action
shortageQuestion = mkQuestion "¿En tu vida viviste carencia económica, social o emocional?" 
  [ HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "shortage"
      , HE.onChecked \c -> UpdateForm "shortage" $ if c then "1" else "-1"
      ]
  , HH.text "Económica"
  , HH.br_
  , HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "shortage"
      , HE.onChecked \c -> UpdateForm "shortage" $ if c then "2" else "-2"
      ]
  , HH.text "Social"
  , HH.br_
  , HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "shortage"
      , HE.onChecked \c -> UpdateForm "shortage" $ if c then "4" else "-4"
      ]
  , HH.text "Emocional"
  , HH.br_
  , HH.input 
      [ HP.type_ HP.InputCheckbox 
      , HP.name "shortage"
      , HE.onChecked \c -> UpdateForm "shortage" $ if c then "-1000" else "1000"
      ]
  , HH.text "Ninguna"
  ]

lossQuestion :: forall w. HH.HTML w Action
lossQuestion = mkQuestion "¿Has vivido alguna pérdida importante recientemente?" 
  [ HH.small_
      [HH.text $ "Algún familiar, mascota, trabajo, etc."
      ]
  , HH.input
      [ HP.type_ HP.InputRadio 
      , HP.id "loss_yes"
      , HP.name "loss"
      , HP.value "1"
      , HP.required true
      , HE.onChecked \_ -> CompositeAction [ UpdateForm "loss" "1", ShowQuestion "loss" true ]
      ]
  , HH.text "Sí"
  , HH.br_
  , HH.input
      [ HP.type_ HP.InputRadio 
      , HP.id "loss_no"
      , HP.name "loss"
      , HP.value "0"
      , HP.required true
      , HE.onChecked \_ -> CompositeAction [ UpdateForm "loss" "0", ShowQuestion "disorder" false ]
      ]
  , HH.text "No"
  ]

codeVerification :: forall w. Boolean -> HH.HTML w Action
codeVerification isBad = mkQuestion "Ingresa aquí el código que te proporcionó la persona que está aplicando la prueba"
  [ HH.input
    [ HP.type_ HP.InputText
    , HP.id "code"
    , HP.required true
    , HE.onValueInput \val -> UpdateCode val
    ]
  , if isBad then HH.label_ [ HH.text "Código equivocado" ] else HH.div_ []
  ]
