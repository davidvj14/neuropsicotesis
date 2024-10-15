module Wisconsin where

import Prelude

import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web as AX
import Data.Argonaut (encodeJson)
import Data.Array (drop, foldl, head, last, length, range, replicate, snoc, take, updateAt, zip, (!!))
import Data.Array as Array
import Data.DateTime.Instant (Instant, unInstant)
import Data.Generic.Rep (class Generic)
import Data.Lazy (Lazy, defer, force)
import Data.Maybe (Maybe(..), fromJust)
import Data.Show.Generic (genericShow)
import Data.Time.Duration (Milliseconds(..))
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Aff as Aff
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Class.Console (log)
import Effect.Exception.Unsafe (unsafeThrow)
import Effect.Now (now)
import Effect.Timer (setTimeout)
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
  , maintenanceErrors :: Int
  , perseverations :: Int
  , deferredPerseverations :: Int
  , timeToFirst :: Number
  , timeAfterError :: Number
  , totalTime :: Number
  }

initResults :: Results
initResults = 
  { score : 0
  , errors: 0
  , maintenanceErrors: 0
  , perseverations: 0
  , deferredPerseverations: 0
  , timeToFirst: 0.0
  , timeAfterError: 0.0
  , totalTime: 0.0
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
  , sortedCards :: Array (Maybe Card)
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
  , sortedCards: replicate 4 Nothing
  }

data Action
  = WisconsinInstructionsDone InstructionsOutput
  | HandleWisconsinDone Output
  | HandleDrop DragEvent Int
  | SetShowIncorrect Boolean
  | PreventDefault Event

data Output
  = WisconsinDone

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

mainComponent :: forall query input m. MonadAff m => H.Component query input Output m
mainComponent =
  H.mkComponent 
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
      { handleAction = wisconsinHandler }
    }

renderWisconsin :: forall m. State -> H.ComponentHTML Action ChildSlots m
renderWisconsin state =
  HH.div
    [ HP.class_ $ H.ClassName "wisconsin-container" ]
    [ if state.showIncorrect then renderIncorrect else HH.div_ []
    , criteriaCards
    , HH.br_ 
    , sortingAreas state.sortedCards 
    , deckArea state.currentCard
    ]

sortingArea :: forall m. Int -> Maybe Card -> H.ComponentHTML Action ChildSlots m
sortingArea areaId mbCard =
  HH.div
    [ HP.class_ $ H.ClassName "sorting-area"
    , HE.onDrop \ev -> HandleDrop ev areaId
    , HE.onDragOver \ev -> PreventDefault $ DE.toEvent ev
    ]
    case mbCard of
         Just card ->
           [ HH.img
              [ HP.src card.image
              , HP.style "overflow:hidden"
              ]
           ]
         Nothing -> []

wisconsinComponent :: forall query m. MonadAff m => H.Component query State Output m
wisconsinComponent = 
  H.mkComponent
    { initialState: identity
    , render: renderWisconsin
    , eval: H.mkEval $ H.defaultEval
      { handleAction = wisconsinHandler }
    }

wisconsinHandler :: forall m. MonadAff m => Action -> H.HalogenM State Action ChildSlots Output m Unit
wisconsinHandler action =
  case action of
       WisconsinInstructionsDone _ -> do
          ms <- H.liftEffect nowToNumber
          H.modify_ \state -> state { stage = WisconsinTest, lastTimer = ms }
       PreventDefault ev -> H.liftEffect $ preventDefault ev
       HandleDrop ev areaId -> handleDrop ev areaId
       HandleWisconsinDone _ -> do
          answers <- H.gets _.answers
          H.liftEffect $ log $ "end len: " <> (show $ length answers)
          let results = eval answers
          _ <- H.liftAff $ AX.post ResponseFormat.ignore "/wisconsin"
            (Just $ RequestBody.Json $ encodeJson results)
          H.raise WisconsinDone
       _ -> pure unit

handleDrop :: forall m. MonadAff m => DragEvent -> Int -> H.HalogenM State Action ChildSlots Output m Unit
handleDrop ev areaId = do
  H.liftEffect $ preventDefault $ DE.toEvent ev
  sortedCards <- H.gets _.sortedCards
  currentCard <- H.gets _.currentCard
  let newSorted = unsafeArrUpdate areaId (Just currentCard) sortedCards
  H.modify_ \state -> state { sortedCards = newSorted }
  isCorrect <- evalAnswer areaId
  when (not isCorrect) (timerShowIncorrect)
  setNextCard
  maybeNextCriterion
  timer <- H.liftEffect nowToNumber
  H.modify_ \state -> state { lastTimer = timer }

evalAnswer :: forall m. MonadAff m => Int -> H.HalogenM State Action ChildSlots Output m Boolean
evalAnswer areaId = do
  let critCard = unsafeIndex criterionCards areaId
  currentCriterion <- H.gets _.currentCriterion
  currentCard <- H.gets _.currentCard
  timerOld <- H.gets _.lastTimer
  timerNew <- H.liftEffect nowToNumber
  let time = timerNew - timerOld
  case currentCriterion of
       Shape ->
         if currentCard.shape == critCard.shape
           then do
              H.modify_ \state ->
                state { score = state.score + 1 
                      , answers = snoc state.answers { grade: Correct, timeTaken: time }
                      }
              ans <- H.gets _.answers
              H.liftEffect $ log $ "len: " <> (show $ length ans)
              pure true
           else do
              H.liftEffect $ log "?"
              H.modify_ \state ->
                state { answers = snoc state.answers 
                        { grade: Incorrect currentCriterion (compareForError critCard currentCard)
                        , timeTaken: time
                        } 
                      }
              ans <- H.gets _.answers
              H.liftEffect $ log $ "len: " <> (show $ length ans)
              pure false
       Color ->
         if currentCard.color == critCard.color
           then do
              H.modify_ \state ->
                state { score = state.score + 1 
                      , answers = snoc state.answers { grade: Correct, timeTaken: time }
                      }
              ans <- H.gets _.answers
              H.liftEffect $ log $ "len: " <> (show $ length ans)
              pure true
           else do
              H.modify_ \state ->
                state { answers = snoc state.answers 
                        { grade: Incorrect currentCriterion (compareForError critCard currentCard)
                        , timeTaken: time
                        } 
                      }
              ans <- H.gets _.answers
              H.liftEffect $ log $ "len: " <> (show $ length ans)
              pure false
       Number ->
         if currentCard.number == critCard.number
           then do
              H.modify_ \state ->
                state { score = state.score + 1 
                      , answers = snoc state.answers { grade: Correct, timeTaken: time }
                      }
              ans <- H.gets _.answers
              H.liftEffect $ log $ "len: " <> (show $ length ans)
              pure true
           else do
              H.modify_ \state ->
                state { answers = snoc state.answers 
                        { grade: Incorrect currentCriterion (compareForError critCard currentCard)
                        , timeTaken: time
                        } 
                      }
              ans <- H.gets _.answers
              H.liftEffect $ log $ "len: " <> (show $ length ans)
              pure false

timerShowIncorrect :: forall m. MonadAff m => H.HalogenM State Action ChildSlots Output m Unit
timerShowIncorrect = do
  H.modify_ \state -> state { showIncorrect = true }
  H.liftAff $ Aff.delay $ Milliseconds 500.0
  H.modify_ \state -> state { showIncorrect = false }

maybeNextCriterion :: forall m. MonadAff m => H.HalogenM State Action ChildSlots Output m Unit
maybeNextCriterion = do
  score <- H.gets _.score
  when
    (mod score 10 == 0)
    (H.modify_ \state -> state { currentCriterion = unsafeIndex criteria (score / 10)})


sortingAreas :: forall m. Array (Maybe Card) -> H.ComponentHTML Action ChildSlots m
sortingAreas sortedCards =
  HH.div
    [ HP.id "card-area" ]
      [ HH.div
        [ HP.id "card-area" ]
        [ sortingArea 0 $ unsafeIndex sortedCards 0
        , sortingArea 1 $ unsafeIndex sortedCards 1
        , sortingArea 2 $ unsafeIndex sortedCards 2
        , sortingArea 3 $ unsafeIndex sortedCards 3
        ]
      ]

criteriaCards :: forall m. H.ComponentHTML Action ChildSlots m
criteriaCards =
  HH.div
    [ HP.id "criteria-cards"]
    [ criterionCard $ unsafeIndex criterionCards 0
    , criterionCard $ unsafeIndex criterionCards 1
    , criterionCard $ unsafeIndex criterionCards 2
    , criterionCard $ unsafeIndex criterionCards 3
    ]

criterionCard :: forall m. Card -> H.ComponentHTML Action ChildSlots m
criterionCard card = 
  HH.div
    [ HP.class_ $ H.ClassName "sorting-area"]
    [ HH.img
      [ HP.src card.image
      , HP.style "overflow: hidden"
      ] 
    ]

deckArea :: forall m. Card -> H.ComponentHTML Action ChildSlots m
deckArea card =
  HH.div
    [ HP.class_ $ H.ClassName "deck-area" 
    , HP.draggable true
    ]
    [ HH.img [ HP.src card.image, HP.style "overflow: hidden", HP.id "deck-card" ] ]

renderIncorrect :: forall m. H.ComponentHTML Action ChildSlots m
renderIncorrect = 
  HH.div
    [ HP.id "message"
    , HP.class_ $ H.ClassName "message-container"
    ]
    [ HH.text "Incorrecto" ]

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

instance eqCardError :: Eq CardError where
  eq Other Other = true
  eq Other _ = false
  eq (OneErr c1) other =
    case other of
         Other -> false
         (OneErr c2) -> c1 == c2
         (TwoErr c2 c3) -> c1 == c2 || c1 == c3
  eq (TwoErr c1 c2) other =
    case other of
         Other -> false
         (OneErr c3) -> c1 == c3 || c2 == c3
         (TwoErr c3 c4) -> c1 == c3 || c1 == c4 || c2 == c3 || c2 == c4

compareForError :: Card -> Card -> CardError
compareForError c1 c2 = 
  case length matches of
       0 -> Other
       1 -> OneErr (unsafeFromJust $ matches !! 0)
       2 -> TwoErr (unsafeFromJust $ matches !! 0) (unsafeFromJust $ matches !! 1)
       _ -> unsafeThrow "Unreachable"
  where
        matches :: Array Criterion
        matches =
          (if c1.shape == c2.shape then [Shape] else []) <>
          (if c1.color == c2.color then [Color] else []) <>
          (if c1.number == c2.number then [Number] else [])

enqueue :: forall a. a -> Array a -> Array a
enqueue x deque = if Array.length deque < 4
                   then Array.snoc deque x
                   else Array.snoc (Array.drop 1 deque) x

checkForDeferred :: Array Answer -> Grade -> Boolean
checkForDeferred last4 grade =
  case last4 !! 0 of
    Just g | g.grade == grade -> true
    _ -> case last4 !! 1 of
      Just g | g.grade == grade -> true
      _ -> case last4 !! 2 of
        Just g | g.grade == grade -> true
        _ -> false

checkForPerseveration :: Array Answer -> Grade -> Boolean
checkForPerseveration last4 grade =
  case last last4 of
    Nothing -> false
    Just ans -> case ans.grade of
      Correct -> false
      Incorrect _ _ -> ans.grade == grade
  
checkForMaintenanceError :: Array Answer -> Boolean
checkForMaintenanceError last4 =
  case last4 !! 0 of
    Just a0 | a0.grade == Correct ->
      case last4 !! 1 of
        Just a1 | a1.grade == Correct ->
          case last4 !! 2 of
            Just a2 | a2.grade == Correct -> true
            _ -> false
        _ -> false
    _ -> false

evalStep :: Results -> Array Answer -> Answer -> Results
evalStep result last4 answer =
  let
    result' = result { totalTime = result.totalTime + answer.timeTaken }
    result'' = case head (take 1 last4) of
      Just prevAnswer | isIncorrect prevAnswer.grade ->
        result' { timeAfterError = result'.timeAfterError + answer.timeTaken }
      _ -> result'
  in
    case answer.grade of
      Correct -> result'' { score = result''.score + 1 }
      Incorrect _ _ ->
        if checkForPerseveration last4 answer.grade then
          result'' { perseverations = result''.perseverations + 1 }
        else if checkForDeferred last4 answer.grade then
          result'' { deferredPerseverations = result''.deferredPerseverations + 1 }
        else if checkForMaintenanceError last4 then
          result'' { maintenanceErrors = result''.maintenanceErrors + 1 }
        else
          result'' { errors = result''.errors + 1 }

eval :: Array Answer -> Results
eval answers = 
  case head answers of
    Nothing -> initResults
    Just firstAnswer ->
      let
        initialResult = initResults { timeToFirst = firstAnswer.timeTaken }
        go :: Results -> Array Answer -> Array Answer -> Results
        go acc last4 remainingAnswers =
          case head remainingAnswers of
            Nothing -> acc
            Just answer ->
              let
                newAcc = evalStep acc last4 answer
                newLast4 = take 4 $ snoc last4 answer
              in
                go newAcc newLast4 (drop 1 remainingAnswers)
      in
        go initialResult [] answers

isIncorrect :: Grade -> Boolean
isIncorrect (Incorrect _ _) = true
isIncorrect _ = false


data Grade
  = Correct
  | Incorrect Criterion CardError
derive instance eqGrade :: Eq Grade

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

unsafeArrUpdate :: forall a. Int -> a -> Array a -> Array a
unsafeArrUpdate index new arr = 
  case updateAt index new arr of
       Just newArr -> newArr
       _ -> unsafeThrow "unsafeArrUpdate exception"

nowToNumber :: Effect Number
nowToNumber = do
  timer <- now
  let (Milliseconds ms) = unInstant timer
  pure ms

setNextCard :: forall m. MonadEffect m => H.HalogenM State Action ChildSlots Output m Unit
setNextCard = do
  currentIndex <- H.gets _.currentIndex
  H.liftEffect $ log $ show currentIndex
  let newIndex = currentIndex + 1
  if newIndex >= 5
    then H.raise WisconsinDone
    else
       H.modify_ \state -> state { currentIndex = newIndex, currentCard = nextCard newIndex }
  where
    nextCard newIndex = unsafeIndex cards newIndex

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
