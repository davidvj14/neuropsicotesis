{-# OPTIONS_GHC -Wno-missing-export-lists #-}
{-# LANGUAGE DataKinds                  #-}
{-# LANGUAGE DerivingStrategies         #-}
{-# LANGUAGE FlexibleInstances          #-}
{-# LANGUAGE GADTs                      #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE MultiParamTypeClasses      #-}
{-# LANGUAGE OverloadedStrings          #-}
{-# LANGUAGE QuasiQuotes                #-}
{-# LANGUAGE StandaloneDeriving         #-}
{-# LANGUAGE TemplateHaskell            #-}
{-# LANGUAGE TypeFamilies               #-}
{-# LANGUAGE UndecidableInstances       #-}
{-# LANGUAGE TypeOperators              #-}

module DB where

import Database.Persist.TH
import Database.Persist.Postgresql
import Control.Monad.Reader (ReaderT)

share [mkPersist sqlSettings, mkMigrate "migrateAll"] [persistLowerCase|
Participantes
    age Int
    sex Int
    major String
    alcohol Bool
    alcoholFrequency Int Maybe
    drugs Bool
    drugsFrequency Int Maybe
    disorder Bool
    disorderInput String Maybe
    injury Bool
    injuryTreated Bool Maybe
    injuryLocation String Maybe
    abuse Int
    abuseOther String Maybe
    shortage Int
    loss Bool
    ipAddr String
    deriving Show

Beck
    p_id ParticipantesId
    anxiexyScore Int
    anxietyAnswers [Int]
    depressionScore
    depressionAnswers [Int]
    Primary p_id
    deriving Show

Barrat
    p_id ParticipantesId
    cognitive Int
    motor Int
    unplanned Int
    raw_answers [Int]
    Primary p_id
    deriving Show

GoNoGo
    p_id ParticipantesId
    Primary p_id
    deriving Show


Wisconsin
    p_id ParticipantesId
    sorting_score Int
    errors Int
    perseverations Int
    deferred Int
    merrors Int
    sorting_ttf Int
    tae Double
    game_time Int
    attempts [Int]
    
    Primary p_id

Suspicious
    p_id ParticipantesId
    reasons [String] Maybe
    Primary p_id

    deriving Show
|]

doMigrations :: ReaderT SqlBackend IO ()
doMigrations = runMigration migrateAll
