{-# LANGUAGE OverloadedRecordDot #-}
module Beck.Api where

import Barrat.Api (getIdCookie)
import Database.Persist.Postgresql (ConnectionPool, toSqlKey, runSqlPool, PersistStoreWrite (insert))
import Beck.Types (BeckPostData(..), getAnxietyScore, getDepressionScore)
import Servant (Handler)
import Web.Cookie (parseCookies)
import Data.ByteString.Char8 (pack)
import DB (Participantes, Key (unParticipantesKey), Beck, Beck(..))
import Control.Monad.IO.Class (MonadIO(liftIO))

constructBeck :: Key Participantes -> BeckPostData -> Beck
constructBeck p_id beckData =
  Beck { beckP_id = p_id
       , beckAnxiexyScore = getAnxietyScore beckData
       , beckAnxietyAnswers = beckData.anxiety
       , beckDepressionScore = getDepressionScore beckData
       , beckDepressionAnswers = beckData.depression
       }

beckHandler :: ConnectionPool -> Maybe String -> BeckPostData -> Handler String
beckHandler _ Nothing _ = undefined
beckHandler pool (Just cookies) beckData = do
  let pId = getIdCookie (parseCookies $ pack cookies)
  let pKey = toSqlKey pId :: Key Participantes
  let beckResults = constructBeck pKey beckData
  _ <- liftIO $ runSqlPool (insert beckResults) pool
  return ""
