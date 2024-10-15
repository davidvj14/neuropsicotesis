module Main where

import Coordinator (mainComponent, stageFromMbStr)
import Effect (Effect)
import Extras (readCookie)
import Halogen as H
import Halogen.Aff as HA
import Halogen.VDom.Driver (runUI)
import Prelude

main :: Effect Unit
main = HA.runHalogenAff do
  stageCookie <- H.liftEffect $ readCookie "stage"
  let stage = stageFromMbStr stageCookie
  body <- HA.awaitBody
  runUI mainComponent stage body
