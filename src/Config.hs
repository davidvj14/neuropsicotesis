{-# LANGUAGE OverloadedStrings #-}
{-# OPTIONS_GHC -Wno-missing-export-lists #-}

module Config where
import Database.Persist.Postgresql (ConnectionPool, createPostgresqlPool, ConnectionString)
import Network.Wai.Middleware.RequestLogger (logStdoutDev, logStdout)
import Network.Wai                          (Middleware)
import Control.Monad.Logger                 (runNoLoggingT, runStdoutLoggingT)
import System.Environment (getEnv)
import Data.ByteString.Char8 (pack)

data Config = Config
    { getPool :: ConnectionPool
    , getEnvConfig :: Environment
    }

data Environment
    = Development
    | Test
    | Production
    deriving (Eq, Show, Read)

defaultConfig :: Config
defaultConfig = Config
    { getPool = undefined
    , getEnvConfig = Development
    }

setLogger :: Environment -> Middleware
setLogger Test = id
setLogger Development = logStdoutDev
setLogger Production = logStdout

makePool :: Environment -> IO ConnectionPool
makePool Test = do
    connString <- connStr Test
    runNoLoggingT $ createPostgresqlPool connString (envPool Test)
makePool e = do
    connString <- connStr Test
    runStdoutLoggingT $ createPostgresqlPool connString (envPool e)

envPool :: Environment -> Int
envPool Test = 1
envPool Development = 1
envPool Production = 8

connStr :: Environment -> IO ConnectionString
connStr _ = do
    dbHost <- getEnv "DB_HOST"
    dbName <- getEnv "DB_NAME"
    dbUser <- getEnv "DB_USER"
    dbPass <- getEnv "DB_PASS"
    dbPort <- getEnv "DB_PORT"
    return $ "host=" <> pack dbHost
          <> " dbname=" <> pack dbName
          <> " user=" <> pack dbUser
          <> " password=" <> pack dbPass
          <> " port=" <> pack dbPort
