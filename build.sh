#!/bin/bash
# Build Lambda Package by Spudmash Media
# USAGE:
#    just run it, see results in /dist folder
###############################################################################

mkdir dist
cd src
npm i
zip -r ../dist/fn-randomuser.zip *