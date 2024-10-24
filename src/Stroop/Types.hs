{-# LANGUAGE DeriveGeneric #-}

module Stroop.Types where

import Data.Aeson (FromJSON)
import GHC.Generics (Generic)

data StroopResults = 
  StroopResults { stroopTime :: Int
                , stroopStimuli :: Int
                , stroopErrors :: Int
                , nonStroopTime :: Int
                , nonStroopStimuli :: Int
                , nonStroopErrors :: Int
                }
  deriving (Show, Generic)

instance FromJSON StroopResults
