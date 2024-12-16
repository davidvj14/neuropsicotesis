{-# LANGUAGE OverloadedStrings #-}
module Main (main) where

import Database.Persist.Postgresql
import System.Environment (lookupEnv)

import Config (defaultConfig, Config(..), Environment(..), setLogger, makePool)
import DB
import Network.Wai.Handler.Warp
import Api
import Questions.Types
import qualified Data.ByteString.Lazy as BsLazy
import Data.Aeson (ToJSON(toJSON), decode, encode)
import Network.Wai.Handler.WarpTLS (tlsSettings, runTLS)


main :: IO ()
main = do
  env <- lookupSetting "ENV" Development
  port <- lookupSetting "PORT" 8081
  pool <- makePool env
  --let cfg = defaultConfig { getPool = pool, getEnvConfig = env }
  --let logger = setLogger env
  runSqlPool doMigrations pool
  run port (app pool)
  --runTLS tlsOpts warpOpts (app pool)
    --where
      --tlsOpts = tlsSettings "/etc/ssl/certs/prueba-np.com.crt" "/etc/ssl/private/prueba-np.com.key"
      --warpOpts = setPort 8081 defaultSettings

lookupSetting :: Read a => String -> a -> IO a
lookupSetting env def = do
  p <- lookupEnv env
  return $ maybe def read p
