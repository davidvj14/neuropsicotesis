{-# LANGUAGE DataKinds #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TypeOperators #-}

module Api where

import Servant
import Web.Cookie
import Database.Persist.Postgresql (ConnectionPool)
import qualified Data.Text.IO as TIO
import Questions.Types (Code, ParticipantForm)
import Control.Monad.IO.Class (MonadIO(liftIO))
import Questions.Api (validateCode, participantHandler)
import Servant.HTML.Lucid
import Lucid

type API = Get '[HTML] (Html ())
  :<|> "code-validation" :> ReqBody '[JSON] Code :> Post '[JSON] Bool
  :<|> "participant"
      :> RemoteHost
      :> ReqBody '[JSON] ParticipantForm
      :> Post '[JSON] (Headers '[Header "Set-Cookie" SetCookie] String)
  :<|> "public" :> Raw

app :: ConnectionPool -> Application
app pool = serve (Proxy :: Proxy API) (server pool)

server :: ConnectionPool -> Server API
server pool = rootHandler
  :<|> validateCode
  :<|> participantHandler pool
  :<|> serveDirectoryFileServer "public"

rootHandler :: Handler (Html ())
rootHandler = do
  content <- liftIO $ TIO.readFile "public/index.html"
  return $ toHtmlRaw content
  
