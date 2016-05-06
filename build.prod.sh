#!/usr/bin/env bash

cd server && npm i;

cd ../front-end/ && npm i && npm run gulp:prod;

cd ../server/ && npm run start:prod;
