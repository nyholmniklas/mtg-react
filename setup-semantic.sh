#!/usr/bin/env bash
cd /app
for entry in "$search_dir"/*
do
  echo "$entry"
done
cd /app/public
npm install semantic-ui
cd /semantic
npm install -g gulp
gulp build