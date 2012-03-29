# autoComplete.js

AutoComplete is a jQuery Mobile plugin which allows developers to add autoComplete search boxes to your project.

Based on the [blog entry ](http://www.raymondcamden.com/index.cfm/2012/3/27/Example-of-Autocomplete-in-jQuery-Mobile) of Raymond Camden ([@cfjedimaster](https://github.com/cfjedimaster)).



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

AutoComplete can access local arrays, or remote data sources.

AutoComplete.js can read data in one of three ways: simple or complex. Simple data should be returned from the source in the following format:

	[
		"Maine",
		"Maryland",
		"Massachusetts"
	]

Causing the resulting code to look like this: `<a href="testing.cfm?term=Maine">Maine</a>`

Complex data allows the developer to specify which value goes where. AutoComplete.js requires data to be returned in a specific format:

	[
		{
			value: "22",
			label: "Maine"
		},
		{
			value: "23",
			label: "Maryland"
		},
		{
			value: "24",
			label: "Massachusetts"
		}
	]

Causing the resulting code to look like this: `<a href="testing.cfm?term=22">Maine</a>`

## Contributing

You are invited to contribute code and suggestions to this project. The more the merrier.

## Project Info

* Source: https://github.com/commadelimited/autoComplete.js
* Twitter: [http://twitter.com/commadelimited](http://twitter.com/commadelimited)
* Twitter: [http://twitter.com/cfjedimaster](http://twitter.com/cfjedimaster)

### 3rd party libraries required:

* jQuery: MIT/GPL license
* jQuery Mobile: MIT/GPL license

### Custom bits:

Public domain