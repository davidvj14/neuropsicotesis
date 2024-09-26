
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

Barrat
    p_id ParticipantesId
    cognitive Int
    motor Int
    unplanned Int
    raw_answers [Int]
    Primary p_id

CardSorting
    p_id ParticipantesId
    sorting_score Int
    errors Int
    perseverations Int
    deferred Int
    merrors Int
    sorting_ttf Int
    tae Double
    game_time Int
    Primary p_id
    
CardGame
    p_id ParticipantesId
    game_score Int
    answers [Int]
    game_ttf Int
    game_time Int
    questions [Int]
    Primary p_id

Suspicious
    p_id ParticipantesId
    reasons [String] Maybe
    Primary p_id

    deriving Show
|]

doMigrations :: ReaderT SqlBackend IO ()
doMigrations = runMigration migrateAll
