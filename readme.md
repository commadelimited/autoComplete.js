# autoComplete.js

AutoComplete is a jQuery Mobile plugin which allows developers to add autoComplete search boxes to your project.

This project was inspired by a [blog post](http://www.raymondcamden.com/index.cfm/2012/3/27/Example-of-Autocomplete-in-jQuery-Mobile) from @cfjedimaster.

## Example
View a simple [demo of autoComplete](http://andymatthews.net/code/autocomplete/)

## Quick start

Clone the git repo - `git clone git@github.com:commadelimited/autoComplete.js.git` - or [download it](https://github.com/commadelimited/autoComplete.js/zipball/master)

## Usage & Documentation

	$("#searchField").autocomplete({
		target: $('#suggestions'), // the listview to receive results
		source: 'data.cfc?method=search&returnformat=json', // URL return JSON data
		link: 'testing.cfm?term=', // link to be attached to each result
		minLength: 0 // minimum length of search string
	});

## Contributing

You are invited to contribute code and suggestions to this project. The more the merrier.

## Project Info

* Source: http://github.com/commadelimited/jquery.swipeButton.js
* Twitter: [http://twitter.com/commadelimited](http://twitter.com/commadelimited)
* Twitter: [http://twitter.com/cfjedimaster](http://twitter.com/cfjedimaster)

### 3rd party libraries required:

* jQuery: MIT/GPL license
* jQuery Mobile: MIT/GPL license

### Custom bits:

Public domain