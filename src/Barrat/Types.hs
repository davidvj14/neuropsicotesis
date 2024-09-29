{-# LANGUAGE TemplateHaskell #-}

module Barrat.Types where
import Control.Lens
import DB (Barrat (Barrat, barratUnplanned, barratRaw_answers, barratP_id, barratMotor, barratCognitive), ParticipantesId)

data ImpulsivityType
  = Cognitive
  | Motor
  | Unplanned

type IsInverse = Bool

data Question = Question ImpulsivityType IsInverse

getQuestionValue :: String -> IsInverse -> Int
getQuestionValue strVal isInverse = if isInverse
  then
    case strVal of
         "1" -> 4
         "2" -> 3
         "3" -> 1
         "4" -> 0
         _ -> 0
  else
    case strVal of
         "1" -> 0
         "2" -> 1
         "3" -> 3
         "4" -> 4
         _ -> 0

questions :: [Question]
questions =
  [ Question Unplanned True -- 1
  , Question Motor False -- 2
  , Question Unplanned False -- 3
  , Question Cognitive False -- 4
  , Question Unplanned True -- 5
  , Question Motor True -- 6
  , Question Cognitive True -- 7
  , Question Unplanned True -- 8
  , Question Motor False -- 9
  , Question Cognitive True -- 10
  , Question Unplanned True -- 11
  , Question Motor False -- 12
  , Question Cognitive True -- 13
  , Question Unplanned False -- 14
  , Question Unplanned False -- 15
  , Question Cognitive False -- 16
  , Question Unplanned True -- 17
  , Question Motor False -- 18
  , Question Cognitive True -- 19
  , Question Unplanned False -- 20
  , Question Motor False -- 21
  , Question Unplanned True -- 22
  , Question Motor False -- 23
  , Question Cognitive False -- 24
  , Question Unplanned False -- 25
  , Question Motor False -- 26
  , Question Cognitive False -- 27
  , Question Unplanned False -- 28
  , Question Motor False -- 29
  , Question Unplanned True -- 30
  ]

data BarratResults = BarratResults
  { _cognitive :: Int
  , _motor :: Int
  , _unplanned :: Int
  , _answers :: [Int]
  }
  deriving (Show)

makeLenses ''BarratResults

initResult :: BarratResults
initResult = BarratResults
  { _cognitive = 0
  , _motor = 0
  , _unplanned = 0
  , _answers = []
  }

processAnswers :: [String] -> BarratResults
processAnswers ans = foldl step initResult zipped
  where
    zipped = zip ans questions
    step acc (a, Question kind isInverse) =
      let answerValue = getQuestionValue a isInverse
       in acc & over answers (++ [read a]) . (case kind of
            Cognitive -> over cognitive (+ answerValue)
            Motor -> over motor (+ answerValue)
            Unplanned -> over unplanned (+ answerValue))

barratFromResults :: DB.ParticipantesId -> BarratResults -> Barrat
barratFromResults pId results = Barrat
  { barratUnplanned= _unplanned results
  , barratRaw_answers= _answers results
  , barratP_id=pId
  , barratMotor= _motor results
  , barratCognitive= _cognitive results
  }
