module Wisconsin where

import Prelude

import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Affjax.Web as AX
import Data.Argonaut (encodeJson)
import Data.Array (drop, head, last, length, replicate, snoc, take, updateAt, (!!))
import Data.Array as Array
import Data.DateTime.Instant (unInstant)
import Data.Int (toNumber)
import Data.Maybe (Maybe(..))
import Data.Number (floor)
import Data.Time.Duration (Milliseconds(..))
import Data.Traversable (for, traverse)
import Effect (Effect)
import Effect.Aff as Aff
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect)
import Effect.Class.Console (log)
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
  , maintenanceErrors :: Int
  , perseverations :: Int
  , deferredPerseverations :: Int
  , timeToFirst :: Number
  , timeAfterError :: Number
  , totalTime :: Number
  , criterionAttempts :: Array Int
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
  , criterionAttempts: []
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
  , sortedCards :: Array (Maybe Int)
  , currentAttempts :: Int
  , criterionAttempts :: Array Int
  , foundCriterion :: Boolean
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
  , currentAttempts: 0
  , criterionAttempts: []
  , foundCriterion: false
  }

data Action
  = WisconsinInstructionsDone InstructionsOutput
  | HandleWisconsinDone Output 
  | HandleDrop DragEvent Int
  | SetShowIncorrect Boolean
  | PreventDefault Event

data Output
  = WisconsinDone (Array Answer) (Array Int)

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
    , deckArea state.currentIndex
    ]

sortingArea :: forall m. Int -> Maybe Int -> H.ComponentHTML Action ChildSlots m
sortingArea areaId mbCard =
  HH.div
    [ HP.class_ $ H.ClassName "sorting-area"
    , HE.onDrop \ev -> HandleDrop ev areaId
    , HE.onDragOver \ev -> PreventDefault $ DE.toEvent ev
    ]
    case mbCard of
         Just index ->
           [ HH.div
           [ HP.id "deck-card"
           , HP.style
              $  "width: 200px; "
              <> "height: 200px; " 
              <> "background-image: url(public/wisconsin/sprite.png); "
              <> "background-position: " <> calculateSpritePosition index <> "; "
              <> "background-repeat: no-repeat;"
              ]
            []
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
       HandleWisconsinDone (WisconsinDone answers attempts) -> do
          let results = eval answers attempts
          H.liftEffect $ log $ show results
          _ <- H.liftAff $ AX.post ResponseFormat.ignore "/wisconsin"
            (Just $ RequestBody.Json $ encodeJson results)
          H.raise $ WisconsinDone [] []
       _ -> pure unit

handleDrop :: forall m. MonadAff m => DragEvent -> Int -> H.HalogenM State Action ChildSlots Output m Unit
handleDrop ev areaId = do
  H.liftEffect $ preventDefault $ DE.toEvent ev
  sortedCards <- H.gets _.sortedCards
  currentCard <- H.gets _.currentCard
  index <- H.gets _.currentIndex
  let newSorted = unsafeArrUpdate areaId (Just index) sortedCards
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
  currentAttempts <- H.gets _.currentAttempts
  criterionAttempts <- H.gets _.criterionAttempts
  foundCriterion <- H.gets _.foundCriterion
  let time = timerNew - timerOld
  let updateState grade = H.modify_ \state ->
        state { answers = snoc state.answers { grade, timeTaken: time } 
              , currentAttempts = state.currentAttempts + 1
              }
  case currentCriterion of
       Shape ->
         if currentCard.shape == critCard.shape
           then do
              updateState Correct
              H.modify_ \state -> state { score = state.score + 1
                                        , currentAttempts = 0
                                        , criterionAttempts = 
                                            if foundCriterion
                                              then state.criterionAttempts
                                              else snoc criterionAttempts (currentAttempts + 1)
                                        , foundCriterion = true
                                        }
              pure true
           else do
              updateState $ Incorrect currentCriterion (compareForError critCard currentCard)
              H.modify_ \state -> state { currentAttempts = currentAttempts + 1 }
              pure false
       Color ->
         if currentCard.color == critCard.color
           then do
              updateState Correct
              H.modify_ \state -> state { score = state.score + 1
                                        , currentAttempts = 0
                                        , criterionAttempts = 
                                            if foundCriterion
                                              then state.criterionAttempts
                                              else snoc criterionAttempts (currentAttempts + 1)
                                        , foundCriterion = true
                                        }
              pure true
           else do
              updateState $ Incorrect currentCriterion (compareForError critCard currentCard)
              H.modify_ \state -> state { currentAttempts = currentAttempts + 1 }
              pure false
       Number ->
         if currentCard.number == critCard.number
           then do
              updateState Correct
              H.modify_ \state -> state { score = state.score + 1
                                        , currentAttempts = 0
                                        , criterionAttempts = 
                                            if foundCriterion
                                              then state.criterionAttempts
                                              else snoc criterionAttempts (currentAttempts + 1)
                                        , foundCriterion = true
                                        }
              pure true
           else do
              updateState $ Incorrect currentCriterion (compareForError critCard currentCard)
              H.modify_ \state -> state { currentAttempts = currentAttempts + 1 }
              pure false

timerShowIncorrect :: forall m. MonadAff m => H.HalogenM State Action ChildSlots Output m Unit
timerShowIncorrect = do
  H.modify_ \state -> state { showIncorrect = true }
  H.liftAff $ Aff.delay $ Milliseconds 500.0
  H.modify_ \state -> state { showIncorrect = false }

maybeNextCriterion :: forall m. MonadAff m => H.HalogenM State Action ChildSlots Output m Unit
maybeNextCriterion = do
  score <- H.gets _.score
  when (mod score 10 == 0) $ do
    H.modify_ \state -> state
      { currentCriterion = unsafeIndex criteria (score / 10)
      , foundCriterion = false
      }


sortingAreas :: forall m. Array (Maybe Int) -> H.ComponentHTML Action ChildSlots m
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
    [ criterionCard 0
    , criterionCard 1
    , criterionCard 2
    , criterionCard 3
    ]

criterionCard :: forall m. Int -> H.ComponentHTML Action ChildSlots m
criterionCard n = 
  HH.div
    [ HP.class_ $ H.ClassName "sorting-area"]
    [ HH.div
      [ HP.id "deck-card"
      , HP.style $
          "width: 200px; " <> 
          "height: 200px; " <>
          "background-image: url(public/wisconsin/init_sprite.png); " <>
          "background-position: " <> calculateSpritePosition n <> "; " <>
          "background-repeat: no-repeat;"
      ]
      []
    ]

deckArea :: forall m. Int -> H.ComponentHTML Action ChildSlots m
deckArea currentIndex =
  HH.div
    [ HP.class_ $ H.ClassName "deck-area" 
    , HP.draggable true
    ]
    [ HH.div
      [ HP.id "deck-card"
      , HP.style $
          "width: 200px; " <> 
          "height: 200px; " <>
          "background-image: url(public/wisconsin/sprite.png); " <>
          "background-position: " <> calculateSpritePosition currentIndex <> "; " <>
          "background-repeat: no-repeat;"
      ]
      []
    ]

calculateSpritePosition :: Int -> String
calculateSpritePosition index =
  let 
    row = index `div` 8
    col = index `mod` 8
  in 
    "-" <> show (col * 200) <> "px -" <> show (row * 200) <> "px"

renderIncorrect :: forall m. H.ComponentHTML Action ChildSlots m
renderIncorrect = 
  HH.div
    [ HP.id "message"
    , HP.class_ $ H.ClassName "message-container"
    ]
    [ HH.text "Incorrecto" ]


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

eval :: Array Answer -> Array Int -> Results
eval answers attempts = 
  case head answers of
    Nothing -> initResults
    Just firstAnswer ->
      let
        initialResult = initResults { timeToFirst = firstAnswer.timeTaken, criterionAttempts = attempts }
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
  { shape :: CardShape
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
  if newIndex >= 10
    then do
       answers <- H.gets _.answers
       attempts <- H.gets _.criterionAttempts
       H.raise $ WisconsinDone answers attempts
    else
       H.modify_ \state -> state { currentIndex = newIndex, currentCard = nextCard newIndex }
  where
    nextCard newIndex = unsafeIndex cards newIndex

instructions :: String
instructions = 
  "En esta tarea lo que tiene que hacer es tomar cada una de las cartas " <>
  "mostradas y colocarlas sobre una de las zonas designadas según como " <>
  "crea que se relacionan o deban clasificarse.\n Los criterios de " <>
  "clasificación irán cambiando conforme avance la prueba.\n Si la carta " <>
  "que colocó es correcta, no sucederá nada, pero si es incorrecta, " <>
  "se le notificará.\n Entonces tome la siguiente carta y trate de colocarla " <>
  "en el lugar adecuado."

criterionCards :: Array Card
criterionCards = 
  [ { shape: Square
    , color: Cyan
    , number: One
    }
  , { shape: Octagon
    , color: Red
    , number: Two
    }
  , { shape: Rhombus
    , color: Brown
    , number: Three
    }
  , { shape: Trapeze
    , color: Blue
    , number: Four
    }
  ]

cards :: Array Card
cards = 
  [ { shape: Square
    , color: Blue
    , number: One
    }
  , { shape: Rhombus
    , color: Brown
    , number: Two
    }
  , { shape: Trapeze
    , color: Cyan
    , number: Three
    }
  , { shape: Octagon
    , color: Red
    , number: Four
    }
  , { shape: Rhombus
    , color: Blue
    , number: One
    }
  , { shape: Square
    , color: Brown
    , number: Two
    }
  , { shape: Octagon
    , color: Cyan
    , number: Three
    }
  , { shape: Rhombus
    , color: Red
    , number: Four
    }
  , { shape: Octagon
    , color: Blue
    , number: One
    }
  , { shape: Trapeze
    , color: Brown
    , number: Two
    }
  , { shape: Rhombus
    , color: Cyan
    , number: Three
    }
  , { shape: Square
    , color: Red
    , number: Four
    }
  , { shape: Trapeze
    , color: Blue
    , number: One
    }
  , { shape: Octagon
    , color: Brown
    , number: Two
    }
  , { shape: Square
    , color: Cyan
    , number: Three
    }
  , { shape: Trapeze
    , color: Red
    , number: Four
    }
  , { shape: Octagon
    , color: Cyan
    , number: One
    }
  , { shape: Trapeze
    , color: Red
    , number: Two
    }
  , { shape: Square
    , color: Blue
    , number: Three
    }
  , { shape: Rhombus
    , color: Brown
    , number: Four
    }
  , { shape: Rhombus
    , color: Cyan
    , number: One
    }
  , { shape: Octagon
    , color: Red
    , number: Two
    }
  , { shape: Trapeze
    , color: Blue
    , number: Three
    }
  , { shape: Square
    , color: Brown
    , number: Four
    }
  , { shape: Trapeze
    , color: Cyan
    , number: One
    }
  , { shape: Square
    , color: Red
    , number: Two
    }
  , { shape: Rhombus
    , color: Blue
    , number: Three
    }
  , { shape: Octagon
    , color: Brown
    , number: Four
    }
  , { shape: Square
    , color: Cyan
    , number: One
    }
  , { shape: Rhombus
    , color: Red
    , number: Two
    }
  , { shape: Octagon
    , color: Blue
    , number: Three
    }
  , { shape: Trapeze
    , color: Brown
    , number: Four
    }
  , { shape: Octagon
    , color: Brown
    , number: One
    }
  , { shape: Rhombus
    , color: Blue
    , number: Two
    }
  , { shape: Octagon
    , color: Red
    , number: Three
    }
  , { shape: Square
    , color: Cyan
    , number: Four
    }
  , { shape: Rhombus
    , color: Brown
    , number: One
    }
  , { shape: Octagon
    , color: Blue
    , number: Two
    }
  , { shape: Square
    , color: Red
    , number: Three
    }
  , { shape: Trapeze
    , color: Cyan
    , number: Four
    }
  , { shape: Square
    , color: Brown
    , number: One
    }
  , { shape: Trapeze
    , color: Blue
    , number: Two
    }
  , { shape: Rhombus
    , color: Red
    , number: Three
    }
  , { shape: Octagon
    , color: Cyan
    , number: Four
    }
  , { shape: Trapeze
    , color: Brown
    , number: One
    }
  , { shape: Square
    , color: Blue
    , number: Two
    }
  , { shape: Octagon
    , color: Red
    , number: Three
    }
  , { shape: Rhombus
    , color: Cyan
    , number: Four
    }
  , { shape: Octagon
    , color: Red
    , number: One
    }
  , { shape: Trapeze
    , color: Cyan
    , number: Two
    }
  , { shape: Rhombus
    , color: Brown
    , number: Three
    }
  , { shape: Square
    , color: Blue
    , number: Four
    }
  , { shape: Trapeze
    , color: Red
    , number: One
    }
  , { shape: Octagon
    , color: Cyan
    , number: Two
    }
  , { shape: Square
    , color: Brown
    , number: Three
    }
  , { shape: Rhombus
    , color: Blue
    , number: Four
    }
  , { shape: Rhombus
    , color: Red
    , number: One
    }
  , { shape: Square
    , color: Cyan
    , number: Two
    }
  , { shape: Octagon
    , color: Brown
    , number: Three
    }
  , { shape: Trapeze
    , color: Blue
    , number: Four
    }
  , { shape: Square
    , color: Red
    , number: One
    }
  , { shape: Rhombus
    , color: Cyan
    , number: Two
    }
  , { shape: Trapeze
    , color: Brown
    , number: Three
    }
  , { shape: Octagon
    , color: Blue
    , number: Four
    }
  ]
