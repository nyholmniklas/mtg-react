#!/usr/bin/env bash
npm install -g gulp
mkdir ~/public
cd ~/public
npm install semantic-ui
for entry in "$search_dir"/*
do
  echo "$entry"
done
cd ~/public/semantic
gulp build