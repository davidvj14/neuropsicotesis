{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DataKinds #-}

module Questions.Api where

import Questions.Types
import Servant
import Network.Socket (SockAddr(..), hostAddressToTuple, hostAddress6ToTuple)
import Database.Persist (insert)

import Data.Word (Word8)
import Control.Monad.IO.Class (MonadIO(liftIO))
import Database.Persist.Postgresql (ConnectionPool, runSqlPool, BackendKey (unSqlBackendKey))
import Web.Cookie
import DB (Participantes, Key (unParticipantesKey))
import GHC.Int (Int64)
import Data.ByteString.Char8 (pack)

validateCode :: Code -> Handler Bool
validateCode (Code c) = return $ c == "7721"

hostAddrToStr :: (Word8, Word8, Word8, Word8) -> String
hostAddrToStr (a, b, c, d) = show a <> "." <> show b <> "." <> show c <> "." <> show d

getClientIp :: SockAddr -> String
getClientIp (SockAddrInet _ addr) = (show . hostAddrToStr . hostAddressToTuple) addr
getClientIp (SockAddrInet6 _ _ addr _) = (show . hostAddress6ToTuple) addr
getClientIp _ = "undefined"

extractKey :: Key Participantes -> Int64
extractKey = unSqlBackendKey . unParticipantesKey

pIdCookie :: Int64 -> SetCookie
pIdCookie pId = defaultSetCookie {
    setCookieName = "p_id",
    setCookieValue = pack $ show pId
                                 }

participantHandler :: ConnectionPool -> SockAddr -> ParticipantForm ->
    Handler (Headers '[Header "Set-Cookie" SetCookie] String)
participantHandler pool addr pForm = do
    let clientIp = getClientIp addr
    let participant = participantFromForm pForm clientIp
    pId <- liftIO $ runSqlPool (insert participant) pool
    let idValue = extractKey pId
    return $ addHeader (pIdCookie idValue) (show idValue)
