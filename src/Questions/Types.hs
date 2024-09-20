{-# LANGUAGE DataKinds #-}
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DeriveAnyClass #-}

module Questions.Types where

import Data.Aeson
import GHC.Generics
import DB

newtype Code = Code { code :: String }
  deriving (Show, Generic)

instance FromJSON Code

data ParticipantForm
  = ParticipantForm
  { age :: Int,
    sex :: Int,
    major :: String,
    alcohol :: Bool,
    alcoholFrequency :: Maybe Int,
    drugs :: Bool,
    drugsFrequency :: Maybe Int,
    disorder :: Maybe String,
    injury :: Bool,
    injuryTreated :: Maybe Bool,
    injuryLocation :: Maybe String,
    abuse :: Int,
    abuseOther :: Maybe String,
    shortage :: Int,
    loss :: Int
  }
  deriving (Show, Generic, ToJSON)

instance FromJSON ParticipantForm

participantFromForm :: ParticipantForm -> String -> Participantes
participantFromForm pForm addr = participante
  where
    participante = Participantes { participantesShortage=pShortage
                                 , participantesSex=pSex
                                 , participantesMajor=pMajor
                                 , participantesLoss=pLoss
                                 , participantesIpAddr=addr
                                 , participantesInjuryTreated=pInjuryTreated
                                 , participantesInjuryLocation=pInjuryLocation
                                 , participantesInjury=pInjury
                                 , participantesDrugsFrequency=pDrugsFreq
                                 , participantesDrugs=pDrugs
                                 , participantesDisorder=pDisorder
                                 , participantesAlcoholFrequency=pAlcoholFreq
                                 , participantesAlcohol=pAlcohol
                                 , participantesAge=pAge
                                 , participantesAbuseOther=pAbuseOther
                                 , participantesAbuse=pAbuse
                                 }
    pAge = age pForm
    pSex = sex pForm
    pMajor = major pForm
    pAlcohol = alcohol pForm
    pAlcoholFreq = alcoholFrequency pForm
    pDrugs = drugs pForm
    pDrugsFreq = drugsFrequency pForm
    pDisorder = disorder pForm
    pInjury = injury pForm
    pInjuryTreated = injuryTreated pForm
    pInjuryLocation = injuryLocation pForm
    pAbuse = abuse pForm
    pAbuseOther = abuseOther pForm
    pShortage = shortage pForm
    pLoss = loss pForm
