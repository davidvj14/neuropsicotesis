{-# LANGUAGE OverloadedRecordDot #-}
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
  { age :: Int
  , sex :: Int
  , major :: String
  , alcohol :: Bool
  , alcoholFrequency :: Maybe Int
  , alcoholIntensity :: Maybe Int
  , smoke :: Bool
  , smokingYears :: Maybe Double
  , smokingIntensity :: Maybe Double
  , drugs :: Bool
  , drugsFrequency :: Maybe Int
  , disorder :: Bool
  , disorderInput :: Maybe String
  , injury :: Bool
  , injuryTreated :: Maybe Bool
  , injuryLocation :: Maybe String
  , abuse :: Int
  , abuseOther :: Maybe String
  , shortage :: Int
  , loss :: Bool
  }
  deriving (Show, Generic, ToJSON)

instance FromJSON ParticipantForm

participantFromForm :: ParticipantForm -> String -> Participantes
participantFromForm pForm addr = participante
  where
    participante = Participantes { participantesShortage = pForm.shortage
                                 , participantesSex = pForm.sex
                                 , participantesMajor = pForm.major
                                 , participantesLoss = pForm.loss
                                 , participantesIpAddr = addr
                                 , participantesInjuryTreated = pForm.injuryTreated
                                 , participantesInjuryLocation = pForm.injuryLocation
                                 , participantesInjury = pForm.injury
                                 , participantesDrugsFrequency =pForm.drugsFrequency
                                 , participantesDrugs = pForm.drugs
                                 , participantesDisorder = pForm.disorder
                                 , participantesDisorderInput = pForm.disorderInput
                                 , participantesAlcoholFrequency = pForm.alcoholFrequency
                                 , participantesAlcoholIntensity = pForm.alcoholIntensity
                                 , participantesAlcohol = pForm.alcohol
                                 , participantesSmoke = pForm.smoke
                                 , participantesSmokingYears = pForm.smokingYears
                                 , participantesSmokingIntensity = pForm.smokingIntensity
                                 , participantesAge = pForm.age
                                 , participantesAbuseOther = pForm.abuseOther
                                 , participantesAbuse = pForm.abuse
                                 }
