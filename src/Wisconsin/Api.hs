{-# LANGUAGE OverloadedRecordDot #-}

module Wisconsin.Api where

import Barrat.Api (getIdCookie)
import Database.Persist.Postgresql (ConnectionPool, toSqlKey, runSqlPool, PersistStoreWrite (insert))
import Servant (Handler)
import Web.Cookie (parseCookies)
import Data.ByteString.Char8 (pack)
import DB (Participantes, Key (unParticipantesKey), Wisconsin, Wisconsin(..))
import Control.Monad.IO.Class (MonadIO(liftIO))
import Wisconsin.Types (WisconsinResults, WisconsinResults(..))

constructWisconsin :: Key Participantes -> WisconsinResults -> Wisconsin
constructWisconsin p_id wisconsinResult =
  Wisconsin { wisconsinP_id = p_id 
            , wisconsinScore = wisconsinResult.score
            , wisconsinErrors = wisconsinResult.errors
            , wisconsinMerrors = wisconsinResult.maintenanceErrors
            , wisconsinPerseverations = wisconsinResult.perseverations
            , wisconsinDeferred = wisconsinResult.deferredPerseverations
            , wisconsinTtf = wisconsinResult.timeToFirst
            , wisconsinTae = wisconsinResult.timeAfterError
            , wisconsinTime = wisconsinResult.totalTime
            , wisconsinAttempts = wisconsinResult.criterionAttempts
            }

wisconsinHandler :: ConnectionPool -> Maybe String -> WisconsinResults -> Handler String
wisconsinHandler _ Nothing _ = undefined
wisconsinHandler pool (Just cookies) wisconsinResult = do
  let pId = getIdCookie (parseCookies $ pack cookies)
  let pKey = toSqlKey pId :: Key Participantes
  let wisconsin = constructWisconsin pKey wisconsinResult
  _ <- liftIO $ runSqlPool (insert wisconsin) pool
  return ""
