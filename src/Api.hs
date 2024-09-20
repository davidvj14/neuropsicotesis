{-# LANGUAGE DataKinds #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TypeOperators #-}

module Api where

import Servant
import Web.Cookie
import Database.Persist.Postgresql (ConnectionPool)
import Questions.Types (Code, ParticipantForm)

type API = Get '[PlainText] Raw
    :<|> "code-validation" :> ReqBody '[JSON] Code :> Post '[PlainText] Bool
    :<|> "step1"
      :> RemoteHost
      :> ReqBody '[ParticipantForm]
      :> Post '[PlainText] (Headers '[Header "SetCookie" SetCookie] String)
    :<|> "styles" :> Raw
    :<|> "scripts" :> Raw
