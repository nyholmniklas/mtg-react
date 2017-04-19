Owlbrew
===========

[![Build Status](https://travis-ci.org/nyholmniklas/owlbrew.svg?branch=master)](https://travis-ci.org/nyholmniklas/owlbrew.github.io)

About
-------
Owlbrew is a Magic: the Gathering deck editor, built with React and Semantic UI.

The app is available at [www.owlbrew.io](http://www.owlbrew.io/)

Owlbrew uses the [Deckbrew API](https://deckbrew.com/api/) for data, and could not have been possible without it.

Owlbrew is not produced, endorsed, supported, or affiliated with Wizards of the Coast.
The textual and visual information presented through Owlbrew about Magic: The Gathering is copyrighted by Wizards of the Coast.

Prerequisites
-------

- Node JS


#### Install Gulp

You must install Gulp globally for Semantic UI to work.

```
npm install -g gulp
```

Setup
-------

#### Install dependencies

```
npm install
```


#### Build Semantic UI

```
cd semantic/
gulp build
```

#### Build and run server
```
npm run build-dev
npm run dev-server
```

You can now navigate to http://localhost:8080/public