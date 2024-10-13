module Wisconsin where

import Prelude

import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web as AX
import Data.Argonaut (encodeJson)
import Data.Array (foldl, length, range, replicate, snoc, updateAt, zip, (!!))
import Data.DateTime.Instant (Instant, unInstant)
import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe(..), fromJust)
import Data.Show.Generic (genericShow)
import Data.Time.Duration (Milliseconds(..))
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect)
import Effect.Exception.Unsafe (unsafeThrow)
import Effect.Now (now)
import Extras (InstructionsOutput, InstructionsSlot, instructionsComponent)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Type.Proxy (Proxy(..))
import Web.Event.Event (Event, preventDefault)
import Web.HTML.Event.DragEvent (DragEvent)
import Web.HTML.Event.DragEvent as DE

data WisconsinStage
  = WisconsinInstructions
  | WisconsinTest

type Results =
  { score :: Int
  , errors :: Int
  , perseverations :: Int
  , deferredPerseverations :: Int
  , maintenanceErrors :: Int
  , timeToFirst :: Int
  , timeAfterError :: Number
  , totalTime :: Int
  }

type State =
  { currentCard :: Card
  , score :: Int
  , answers :: Array Answer
  , currentCriterion :: Criterion
  , currentIndex :: Int
  , stage :: WisconsinStage
  , lastTimer :: Number
  , showIncorrect :: Boolean
  }

initialState :: forall i. i -> State
initialState _ = 
  { currentCard: unsafeIndex cards 0
  , score: 0
  , answers: []
  , currentCriterion: unsafeIndex criteria 0
  , currentIndex: 0
  , stage: WisconsinInstructions
  , lastTimer: 0.0
  , showIncorrect: false
  }

data Action
  = WisconsinInstructionsDone InstructionsOutput
  | HandleWisconsinDone Output
  | HandleDrop DragEvent Int

data Output = WisconsinDone

type WisconsinSlot = forall query. H.Slot query Output Int

type ChildSlots = 
  ( wisconsinInstructions :: InstructionsSlot
  , wisconsinTest :: WisconsinSlot
  , wisconsinDone :: WisconsinSlot
  )

_wisconsinInstructions = Proxy :: Proxy "wisconsinInstructions"
_wisconsinTest = Proxy :: Proxy "wisconsinTest"
_wisconsinDone = Proxy :: Proxy "wisconsinDone"

render :: forall m. MonadAff m => State -> H.ComponentHTML Action ChildSlots m
render state = case state.stage of
  WisconsinInstructions ->
    HH.slot _wisconsinInstructions 40 (instructionsComponent instructions) unit WisconsinInstructionsDone
  WisconsinTest ->
    HH.slot _wisconsinTest 41 wisconsinComponent state HandleWisconsinDone

renderWisconsin :: forall m. H.ComponentHTML Action ChildSlots m
renderWisconsin =
  HH.div
    [ HP.class_ $ H.ClassName "wisconsin-container" ]
    []

sortingArea :: forall m. Int -> H.ComponentHTML Action ChildSlots m
sortingArea areaId =
  HH.div
    [ HP.class_ $ H.ClassName "sorting-area"
    , HE.onDrop \ev -> HandleDrop ev areaId
    ]
    []

wisconsinComponent :: forall query m. MonadAff m => H.Component query State Output m
wisconsinComponent = 
  H.mkComponent
    { initialState: identity
    , render: (\_ -> renderWisconsin)
    , eval: H.mkEval $ H.defaultEval
      { handleAction = wisconsinHandler }
    }

wisconsinHandler :: forall m. MonadAff m => Action -> H.HalogenM State Action ChildSlots Output m Unit
wisconsinHandler action =
  case action of
       WisconsinInstructionsDone _ -> do
          ms <- H.liftEffect nowToNumber
          H.modify_ \state -> state { stage = WisconsinTest, lastTimer = ms }
       _ -> pure unit

handleDrop :: forall m. MonadAff m => DragEvent -> Int -> H.HalogenM State Action ChildSlots Output m Unit
handleDrop ev areaId = do
  H.liftEffect $ preventDefault $ DE.toEvent ev
  pure unit

evalAnswer :: forall m. MonadAff m => Int -> H.HalogenM State Action ChildSlots Output m Unit
evalAnswer areaId = do
  let criterionCard = unsafeIndex criterionCards areaId
  currentCriterion <- H.gets _.currentCriterion
  currentCard <- H.gets _.currentCard
  timerOld <- H.gets _.lastTimer
  timerNew <- H.liftEffect nowToNumber
  let time = timerNew - timerOld
  case currentCriterion of
       Shape ->
         if currentCard.shape == criterionCard.shape
           then
              H.modify_ \state ->
                state { score = state.score + 1 
                      , answers = snoc state.answers { grade: Correct, timeTaken: time }
                      }
           else H.modify_ \state ->
              state { answers = snoc state.answers 
                      { grade: Incorrect currentCriterion (compareForError criterionCard currentCard)
                      , timeTaken: time
                      } 
                    }
       Color ->
         if currentCard.color == criterionCard.color
           then
              H.modify_ \state ->
                state { score = state.score + 1 
                      , answers = snoc state.answers { grade: Correct, timeTaken: time }
                      }
           else H.modify_ \state ->
              state { answers = snoc state.answers 
                      { grade: Incorrect currentCriterion (compareForError criterionCard currentCard)
                      , timeTaken: time
                      } 
                    }
       Number ->
         if currentCard.number == criterionCard.number
           then
              H.modify_ \state ->
                state { score = state.score + 1 
                      , answers = snoc state.answers { grade: Correct, timeTaken: time }
                      }
           else H.modify_ \state ->
              state { answers = snoc state.answers 
                      { grade: Incorrect currentCriterion (compareForError criterionCard currentCard)
                      , timeTaken: time
                      } 
                    }



sortingAreas :: forall m. H.ComponentHTML Action ChildSlots m
sortingAreas = HH.div [] []

instructions :: String
instructions = 
  "En esta tarea lo que tiene que hacer es tomar cada una de las cartas " <>
  "mostradas y colocarlas sobre una de las zonas designadas según como " <>
  "crea que se relacionan o deban clasificarse. Los criterios de " <>
  "clasificación irán cambiando conforme avance la prueba. Si la carta " <>
  "que colocó es correcta, no sucederá nada, pero si es incorrecta, " <>
  "se le notificará. Entonces tome la siguiente carta y trate de colocarla " <>
  "en el lugar adecuado."

data Criterion
  = Shape
  | Color
  | Number
derive instance eqCriterion :: Eq Criterion

data CardShape
  = Square
  | Rhombus
  | Trapeze
  | Octagon
derive instance eqCardShape :: Eq CardShape

data CardColor
  = Blue
  | Brown
  | Cyan
  | Red
derive instance eqCardColor :: Eq CardColor

data CardNumber
  = One
  | Two
  | Three
  | Four
derive instance eqCardNumber :: Eq CardNumber

data CardError
  = Other
  | OneErr Criterion
  | TwoErr Criterion Criterion

compareForError :: Card -> Card -> CardError
compareForError c1 c2 = 
  case length matches of
       0 -> Other
       1 -> OneErr fstMatch
       2 -> TwoErr fstMatch sndMatch
       _ -> unsafeThrow "Unreachable"
  where
        matches :: Array Criterion
        matches =
          (if c1.shape == c2.shape then [Shape] else []) <>
          (if c1.color == c2.color then [Color] else []) <>
          (if c1.number == c2.number then [Number] else [])
        fstMatch = unsafeFromJust $ matches !! 0
        sndMatch = unsafeFromJust $ matches !! 1

data Grade
  = Correct
  | Incorrect Criterion CardError

type Answer = 
  { grade :: Grade
  , timeTaken :: Number
  }

type Card = 
  { image :: String
  , shape :: CardShape
  , color :: CardColor
  , number :: CardNumber
  }

criteria :: Array Criterion
criteria = 
  [ Color
  , Shape
  , Number
  , Shape
  , Number
  , Color
  ]

criterionCards :: Array Card
criterionCards = 
  [ { image: "public/wisconsin/init1.png"
    , shape: Square
    , color: Cyan
    , number: One
    }
  , { image: "public/wisconsin/init2.png"
    , shape: Octagon
    , color: Red
    , number: Two
    }
  , { image: "public/wisconsin/init3.png"
    , shape: Rhombus
    , color: Brown
    , number: Three
    }
  , { image: "public/wisconsin/init4.png"
    , shape: Trapeze
    , color: Blue
    , number: Four
    }
  ]

unsafeIndex :: forall a. Array a -> Int -> a
unsafeIndex arr index = case arr !! index of
  Just a -> a
  _ -> unsafeThrow "unsafeIndex exception"

unsafeFromJust :: forall a. Maybe a -> a
unsafeFromJust = case _ of
  Just a -> a
  _ -> unsafeThrow "unsafeFromJust exception"

nowToNumber :: Effect Number
nowToNumber = do
  timer <- now
  let (Milliseconds ms) = unInstant timer
  pure ms

setNextCard :: forall m. MonadEffect m => H.HalogenM State Action ChildSlots Output m Unit
setNextCard = do
  currentIndex <- H.gets _.currentIndex
  let newIndex = currentIndex + 1
  if newIndex >= 64
    then H.raise WisconsinDone
    else
       H.modify_ \state -> state { currentIndex = newIndex, currentCard = nextCard newIndex }
  where
    nextCard newIndex = unsafeFromJust $ cards !! newIndex

cards :: Array Card
cards = 
  [ { image: "public/wisconsin/card1.png"
    , shape: Square
    , color: Blue
    , number: One
    }
  , { image: "public/wisconsin/card2.png"
    , shape: Rhombus
    , color: Brown
    , number: Two
    }
  , { image: "public/wisconsin/card3.png"
    , shape: Trapeze
    , color: Cyan
    , number: Three
    }
  , { image: "public/wisconsin/card4.png"
    , shape: Octagon
    , color: Red
    , number: Four
    }
  , { image: "public/wisconsin/card5.png"
    , shape: Rhombus
    , color: Blue
    , number: One
    }
  , { image: "public/wisconsin/card6.png"
    , shape: Square
    , color: Brown
    , number: Two
    }
  , { image: "public/wisconsin/card7.png"
    , shape: Octagon
    , color: Cyan
    , number: Three
    }
  , { image: "public/wisconsin/card8.png"
    , shape: Rhombus
    , color: Red
    , number: Four
    }
  , { image: "public/wisconsin/card9.png"
    , shape: Octagon
    , color: Blue
    , number: One
    }
  , { image: "public/wisconsin/card10.png"
    , shape: Trapeze
    , color: Brown
    , number: Two
    }
  , { image: "public/wisconsin/card11.png"
    , shape: Rhombus
    , color: Cyan
    , number: Three
    }
  , { image: "public/wisconsin/card12.png"
    , shape: Square
    , color: Red
    , number: Four
    }
  , { image: "public/wisconsin/card13.png"
    , shape: Trapeze
    , color: Blue
    , number: One
    }
  , { image: "public/wisconsin/card14.png"
    , shape: Octagon
    , color: Brown
    , number: Two
    }
  , { image: "public/wisconsin/card15.png"
    , shape: Square
    , color: Cyan
    , number: Three
    }
  , { image: "public/wisconsin/card16.png"
    , shape: Trapeze
    , color: Red
    , number: Four
    }
  , { image: "public/wisconsin/card17.png"
    , shape: Octagon
    , color: Cyan
    , number: One
    }
  , { image: "public/wisconsin/card18.png"
    , shape: Trapeze
    , color: Red
    , number: Two
    }
  , { image: "public/wisconsin/card19.png"
    , shape: Square
    , color: Blue
    , number: Three
    }
  , { image: "public/wisconsin/card20.png"
    , shape: Rhombus
    , color: Brown
    , number: Four
    }
  , { image: "public/wisconsin/card21.png"
    , shape: Rhombus
    , color: Cyan
    , number: One
    }
  , { image: "public/wisconsin/card22.png"
    , shape: Octagon
    , color: Red
    , number: Two
    }
  , { image: "public/wisconsin/card23.png"
    , shape: Trapeze
    , color: Blue
    , number: Three
    }
  , { image: "public/wisconsin/card24.png"
    , shape: Square
    , color: Brown
    , number: Four
    }
  , { image: "public/wisconsin/card25.png"
    , shape: Trapeze
    , color: Cyan
    , number: One
    }
  , { image: "public/wisconsin/card26.png"
    , shape: Square
    , color: Red
    , number: Two
    }
  , { image: "public/wisconsin/card27.png"
    , shape: Rhombus
    , color: Blue
    , number: Three
    }
  , { image: "public/wisconsin/card28.png"
    , shape: Octagon
    , color: Brown
    , number: Four
    }
  , { image: "public/wisconsin/card29.png"
    , shape: Square
    , color: Cyan
    , number: One
    }
  , { image: "public/wisconsin/card30.png"
    , shape: Rhombus
    , color: Red
    , number: Two
    }
  , { image: "public/wisconsin/card31.png"
    , shape: Octagon
    , color: Blue
    , number: Three
    }
  , { image: "public/wisconsin/card32.png"
    , shape: Trapeze
    , color: Brown
    , number: Four
    }
  , { image: "public/wisconsin/card33.png"
    , shape: Octagon
    , color: Brown
    , number: One
    }
  , { image: "public/wisconsin/card34.png"
    , shape: Rhombus
    , color: Blue
    , number: Two
    }
  , { image: "public/wisconsin/card35.png"
    , shape: Octagon
    , color: Red
    , number: Three
    }
  , { image: "public/wisconsin/card36.png"
    , shape: Square
    , color: Cyan
    , number: Four
    }
  , { image: "public/wisconsin/card37.png"
    , shape: Rhombus
    , color: Brown
    , number: One
    }
  , { image: "public/wisconsin/card38.png"
    , shape: Octagon
    , color: Blue
    , number: Two
    }
  , { image: "public/wisconsin/card39.png"
    , shape: Square
    , color: Red
    , number: Three
    }
  , { image: "public/wisconsin/card40.png"
    , shape: Trapeze
    , color: Cyan
    , number: Four
    }
  , { image: "public/wisconsin/card41.png"
    , shape: Square
    , color: Brown
    , number: One
    }
  , { image: "public/wisconsin/card42.png"
    , shape: Trapeze
    , color: Blue
    , number: Two
    }
  , { image: "public/wisconsin/card43.png"
    , shape: Rhombus
    , color: Red
    , number: Three
    }
  , { image: "public/wisconsin/card44.png"
    , shape: Octagon
    , color: Cyan
    , number: Four
    }
  , { image: "public/wisconsin/card45.png"
    , shape: Trapeze
    , color: Brown
    , number: One
    }
  , { image: "public/wisconsin/card46.png"
    , shape: Square
    , color: Blue
    , number: Two
    }
  , { image: "public/wisconsin/card47.png"
    , shape: Octagon
    , color: Red
    , number: Three
    }
  , { image: "public/wisconsin/card48.png"
    , shape: Rhombus
    , color: Cyan
    , number: Four
    }
  , { image: "public/wisconsin/card49.png"
    , shape: Octagon
    , color: Red
    , number: One
    }
  , { image: "public/wisconsin/card50.png"
    , shape: Trapeze
    , color: Cyan
    , number: Two
    }
  , { image: "public/wisconsin/card51.png"
    , shape: Rhombus
    , color: Brown
    , number: Three
    }
  , { image: "public/wisconsin/card52.png"
    , shape: Square
    , color: Blue
    , number: Four
    }
  , { image: "public/wisconsin/card53.png"
    , shape: Trapeze
    , color: Red
    , number: One
    }
  , { image: "public/wisconsin/card54.png"
    , shape: Octagon
    , color: Cyan
    , number: Two
    }
  , { image: "public/wisconsin/card55.png"
    , shape: Square
    , color: Brown
    , number: Three
    }
  , { image: "public/wisconsin/card56.png"
    , shape: Rhombus
    , color: Blue
    , number: Four
    }
  , { image: "public/wisconsin/card57.png"
    , shape: Rhombus
    , color: Red
    , number: One
    }
  , { image: "public/wisconsin/card58.png"
    , shape: Square
    , color: Cyan
    , number: Two
    }
  , { image: "public/wisconsin/card59.png"
    , shape: Octagon
    , color: Brown
    , number: Three
    }
  , { image: "public/wisconsin/card60.png"
    , shape: Trapeze
    , color: Blue
    , number: Four
    }
  , { image: "public/wisconsin/card61.png"
    , shape: Square
    , color: Red
    , number: One
    }
  , { image: "public/wisconsin/card62.png"
    , shape: Rhombus
    , color: Cyan
    , number: Two
    }
  , { image: "public/wisconsin/card63.png"
    , shape: Trapeze
    , color: Brown
    , number: Three
    }
  , { image: "public/wisconsin/card64.png"
    , shape: Octagon
    , color: Blue
    , number: Four
    }
  ]
