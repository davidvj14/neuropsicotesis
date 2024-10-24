{-# LANGUAGE OverloadedRecordDot #-}

module Stroop.Api where

import Barrat.Api (getIdCookie)
import Database.Persist.Postgresql (ConnectionPool, toSqlKey, runSqlPool, PersistStoreWrite (insert))
import Servant (Handler)
import Web.Cookie (parseCookies)
import Data.ByteString.Char8 (pack)
import DB (Participantes, Key (unParticipantesKey), Stroop, Stroop(..))
import Control.Monad.IO.Class (MonadIO(liftIO))
import Stroop.Types (StroopResults, StroopResults(..))

constructStroop :: Key Participantes -> StroopResults -> Stroop
constructStroop p_id stroopResult =
  Stroop { stroopP_id = p_id 
         , stroopStroopTime = stroopResult.stroopTime
         , stroopStroopStimuli = stroopResult.stroopStimuli
         , stroopStroopErrors = stroopResult.stroopErrors
         , stroopNonStroopTime = stroopResult.nonStroopTime
         , stroopNonStroopStimuli = stroopResult.nonStroopStimuli
         , stroopNonStroopErrors = stroopResult.nonStroopErrors
         }

stroopHandler :: ConnectionPool -> Maybe String -> StroopResults -> Handler String
stroopHandler _ Nothing _ = undefined
stroopHandler pool (Just cookies) stroopResult = do
  let pId = getIdCookie (parseCookies $ pack cookies)
  let pKey = toSqlKey pId :: Key Participantes
  let stroop = constructStroop pKey stroopResult
  _ <- liftIO $ runSqlPool (insert stroop) pool
  return ""
