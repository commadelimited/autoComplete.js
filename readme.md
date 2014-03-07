# autoComplete.js

AutoComplete is a jQuery Mobile plugin which allows developers to add autoComplete search boxes to your project.

Based on the [blog entry ](http://www.raymondcamden.com/index.cfm/2012/3/27/Example-of-Autocomplete-in-jQuery-Mobile) of Raymond Camden ([@cfjedimaster](https://github.com/cfjedimaster)).

## Example
View a simple [demo of autoComplete](http://andymatthews.net/code/autocomplete/)

## Quick start

Clone the git repo - `git clone https://github.com/commadelimited/autoComplete.js.git` - or [download it](https://github.com/commadelimited/autoComplete.js/zipball/master)

## Usage & Documentation

	$("#searchField").autocomplete({
		method: 'GET', // allows POST as well
		icon: 'arrow-r', // option to specify icon
		target: $('#suggestions'), // the listview to receive results
		source: 'data.cfc?method=search&returnformat=json', // URL return JSON data
		callback: fn(){}, // optional callback function fires upon result selection
		link: 'target.html?term=', // link to be attached to each result
		minLength: 0 // minimum length of search string
		transition: 'fade',// page transition, default is fade
		matchFromStart: true, // search from start, or anywhere in the string
		loadingHtml : '<li data-icon="none"><a href="#">Searching...</a></li>', // HTML to display when searching remotely
		interval: 0, // The minimum delay in milliseconds between server calls when using a remote "source"
		builder : null, // optional callback to build HTML for autocomplete
		labelHTML: fn(){}, // optional callback function when formatting the display value of list items
		onNoResults: fn(), // optional callback function when no results were matched
		onLoading: fn(), // optional callback function called just prior to ajax call
		onLoadingFinished: fn(), // optional callback function called just after ajax call has completed
		dataHandler : fn(), // optional function to convert the received JSON data to the format described below
		klass: 'tinted', // optional class name for listview's <li> tag
		forceFirstChoiceOnEnterKey : true, // force the first choice in the list when Enter key is hit
		transformResponse: fn() //transform your data into useable data to create autoComplete items list, return json obect with
					// label and value attribute e.g. {label : "text to show", value: "hidden value"}
	});

AutoComplete can access local arrays or remote data sources.

AutoComplete.js can read data in one of two ways: simple or complex. Simple data should be returned from the source in the following format:

	[
		"Maine",
		"Maryland",
		"Massachusetts"
	]

Causing the resulting code to look like this: `<a href="target.html?term=Maine">Maine</a>`

Complex data allows developers to specify which value goes where. This option requires data to be returned as an array of objects:

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

Causing the resulting code to look like this: `<a href="target.html?term=22">Maine</a>`

### Data-autocomplete attribute

In 1.4.3 a new "data-autocomplete" property was added to the anchor tag contained with each list item. This attribute contains a serialized version of each item in the array. See "callback-plus.html" for usage.

### Callback

When using the optional callback function autoComplete will only execute code found within the callback. The click event object is passed into the callback function for use in accessing the information contained in the selection. Here's one use case:

	$("#searchField").autocomplete("update", {
		source: [ "foo", "bar", "baz" ],
		minLength: 3,
		callback: function(e) {
			var $a = $(e.currentTarget); // access the selected item
			$('#searchField').val($a.text()); // place the value of the selection into the search box
			$("#searchField").autocomplete('clear'); // clear the listview
		}
	});

## Utility Methods

### update - takes an object containing AutoComplete settings to update

This method allows you to update AutoComplete settings for an element after the plugin has been initialized.

	$("#searchField").autocomplete("update", {
		source: [ "foo", "bar", "baz" ],
		minLength: 3
	});

### clear

This method will clear the "target" listview.  Useful if you need to empty the list in response to other events.

	$("#searchField").autocomplete("clear");

### destroy

This method will clean up any bound events or data stored on the element.

	$("#searchField").autocomplete("destroy");

## Events

### targetUpdated.autocomplete

Event fired each time the target listview is updated.  A potential use is to bind to this event and scroll to the top of the page so that the list of completions is not completely hidden behind the soft/virtual keyboard.

	$("#searchField").autocomplete({
		target: $('#autocomplete'),
		source: autocompletes
	}).bind("targetUpdated.autocomplete", function(e) {
		$.mobile.silentScroll($(e.currentTarget).offset().top);
	});

### targetCleared.autocomplete

Event fired when the target listview is emptied (no completions to display).

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

MIT/GPL license

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/commadelimited/autocomplete.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
