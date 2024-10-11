{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE OverloadedRecordDot #-}

module Beck.Types where

import Data.Aeson (FromJSON)
import GHC.Generics (Generic)

data BeckPostData = BeckPostData
  { anxiety :: [Int]
  , depression :: [Int]
  }
  deriving (Show, Generic)

instance FromJSON BeckPostData

getAnxietyScore :: BeckPostData -> Int
getAnxietyScore beckData = sum beckData.anxiety

getDepressionScore :: BeckPostData -> Int
getDepressionScore beckData = sum beckData.depression
