{-# LANGUAGE OverloadedRecordDot #-}

module GoNoGo.Api where

import Barrat.Api (getIdCookie)
import Database.Persist.Postgresql (ConnectionPool, toSqlKey, runSqlPool, PersistStoreWrite (insert))
import Servant (Handler)
import Web.Cookie (parseCookies)
import Data.ByteString.Char8 (pack)
import DB (Participantes, Key (unParticipantesKey), GoNoGo, GoNoGo(..))
import Control.Monad.IO.Class (MonadIO(liftIO))
import GoNoGo.Types (GoNoGoResults, GoNoGoResults(..))

constructGoNoGo :: Key Participantes -> GoNoGoResults -> GoNoGo
constructGoNoGo p_id goNoGoResult =
  GoNoGo { goNoGoP_id = p_id 
         , goNoGoOmissionErrors = goNoGoResult.omissionErrors
         , goNoGoComissionErrors = goNoGoResult.comissionErrors
         , goNoGoResponseTime = goNoGoResult.responseTime
         }

goNoGoHandler :: ConnectionPool -> Maybe String -> GoNoGoResults -> Handler String
goNoGoHandler _ Nothing _ = undefined
goNoGoHandler pool (Just cookies) goNoGoResult = do
  let pId = getIdCookie (parseCookies $ pack cookies)
  let pKey = toSqlKey pId :: Key Participantes
  let goNoGo = constructGoNoGo pKey goNoGoResult
  _ <- liftIO $ runSqlPool (insert goNoGo) pool
  return ""
