#!/bin/bash
rm -rf dist
npm --no-git-tag-version --tag-version-prefix="" version patch
npm run build:ssr

docker build -t podnoms.azurecr.io/podnoms.pages .
az acr login --name podnoms
docker push podnoms.azurecr.io/podnoms.pages
