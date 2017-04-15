#!/usr/bin/env bash
npm install -g gulp
cd ./public
npm install semantic-ui
for entry in "$search_dir"/*
do
  echo "$entry"
done
cd ./semantic
gulp build