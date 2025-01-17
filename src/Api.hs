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
import Barrat.Api
import Servant.HTML.Lucid
import Lucid
import Data.ByteString.Char8 (ByteString)
import Beck.Types (BeckPostData)
import Beck.Api (beckHandler)
import Stroop.Types (StroopResults)
import Stroop.Api (stroopHandler)
import GoNoGo.Types (GoNoGoResults)
import GoNoGo.Api (goNoGoHandler)
import Wisconsin.Types (WisconsinResults)
import Wisconsin.Api (wisconsinHandler)

type API = Get '[HTML] (Html ())
  :<|> "code-validation" :> ReqBody '[JSON] Code :> Post '[JSON] Bool
  :<|> "participant"
      :> RemoteHost
      :> ReqBody '[JSON] ParticipantForm
      :> Post '[JSON] (Headers '[Header "Set-Cookie" SetCookie] String)
  :<|> "barrat"
    :> Header "Cookie" String
    :> ReqBody '[PlainText] String
    :> Post '[PlainText] String
  :<|> "wisconsin"
    :> Header "Cookie" String
    :> ReqBody '[JSON] WisconsinResults
    :> Post '[PlainText] String
  :<|> "stroop"
    :> Header "Cookie" String
    :> ReqBody '[JSON] StroopResults
    :> Post '[PlainText] String
  :<|> "gonogo"
    :> Header "Cookie" String
    :> ReqBody '[JSON] GoNoGoResults
    :> Post '[PlainText] String
  :<|> "beck"
    :> Header "Cookie" String
    :> ReqBody '[JSON] BeckPostData
    :> Post '[PlainText] String
  :<|> "public" :> Raw

app :: ConnectionPool -> Application
app pool = serve (Proxy :: Proxy API) (server pool)

server :: ConnectionPool -> Server API
server pool = rootHandler
  :<|> validateCode
  :<|> participantHandler pool
  :<|> barratHandler pool
  :<|> wisconsinHandler pool
  :<|> stroopHandler pool
  :<|> goNoGoHandler pool
  :<|> beckHandler pool
  :<|> serveDirectoryFileServer "public"

rootHandler :: Handler (Html ())
rootHandler = do
  content <- liftIO $ TIO.readFile "public/index.html"
  return $ toHtmlRaw content
  
