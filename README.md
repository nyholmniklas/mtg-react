Owlbrew
===========

[![Build Status](https://travis-ci.org/nyholmniklas/owlbrew.github.io.svg?branch=master)](https://travis-ci.org/nyholmniklas/owlbrew.github.io)

Prerequisites
-------

#### Install Node

```
git clone git://github.com/nodejs/node.git
cd node
./configure
make
sudo make install
```

#### Install Gulp

You must install Gulp globally for Semantic UI to work.

```
npm install -g gulp
```

Setup
-------

#### Build Semantic UI

```
cd semantic/
gulp build
```

#### Run eslint and build

```
npm run test
```

#### Run dev server

```
npm install
npm run server
```

You can now navigate to http://localhost:8080