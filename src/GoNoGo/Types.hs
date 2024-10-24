{-# LANGUAGE DeriveGeneric #-}

module GoNoGo.Types where

import Data.Aeson (FromJSON)
import GHC.Generics (Generic)

data GoNoGoResults = 
  GoNoGoResults { comissionErrors :: Int
                , omissionErrors :: Int
                , responseTime :: Int
                }
  deriving (Show, Generic)

instance FromJSON GoNoGoResults
