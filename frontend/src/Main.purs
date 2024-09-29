module Main where

import Coordinator (mainComponent)
import Prelude (unit, Unit, bind)

import Effect (Effect)
import Halogen.Aff as HA
import Halogen.VDom.Driver (runUI)

main :: Effect Unit
main = HA.runHalogenAff do
  body <- HA.awaitBody
  runUI mainComponent unit body
