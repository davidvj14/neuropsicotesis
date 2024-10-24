{-# LANGUAGE DeriveGeneric #-}

module Wisconsin.Types where

import Data.Aeson (FromJSON)
import GHC.Generics (Generic)

data WisconsinResults = 
  WisconsinResults { score :: Int
                   , errors :: Int
                   , maintenanceErrors :: Int
                   , perseverations :: Int
                   , deferredPerseverations :: Int
                   , timeToFirst :: Double
                   , timeAfterError :: Double
                   , totalTime :: Double
                   , criterionAttempts :: [Int]
                   }
  deriving (Show, Generic)

instance FromJSON WisconsinResults
