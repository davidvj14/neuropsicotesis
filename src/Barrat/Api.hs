{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE DataKinds #-}

module Barrat.Api where

import Questions.Types
import Servant
import Barrat.Types
import Network.Socket (SockAddr(..), hostAddressToTuple, hostAddress6ToTuple)
import Database.Persist (insert, PersistEntity (keyFromValues))

import Data.Word (Word8)
import Control.Monad.IO.Class (MonadIO(liftIO))
import Database.Persist.Postgresql (ConnectionPool, runSqlPool, BackendKey (unSqlBackendKey), toSqlKey)
import Web.Cookie
import DB (Participantes, Key (unParticipantesKey))
import GHC.Int (Int64)
import Data.ByteString.Char8 (pack, ByteString, readInt)
import Data.Maybe (fromMaybe)

getIdCookie :: [(ByteString, ByteString)] -> Int64
getIdCookie [] = -1
getIdCookie (("p_id", value) : _) = fromIntegral $ fst $ fromMaybe (-1, "") (readInt value)
getIdCookie (_ : xs) = getIdCookie xs

barratHandler :: ConnectionPool -> Maybe String -> String -> Handler String
barratHandler _ Nothing _ = undefined
barratHandler pool (Just cookies) values = do
  let vals = words values
  let results = processAnswers vals
  let pId = getIdCookie (parseCookies $ pack cookies)
  let pKey = toSqlKey pId :: Key Participantes
  let res = barratFromResults pKey results
  _ <- liftIO $ runSqlPool (insert res) pool
  return ""
