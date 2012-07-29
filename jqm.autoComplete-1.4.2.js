/*
	Name: autoComplete
	Author: Raymond Camden & Andy Matthews
	Contributors: Jim Pease (@jmpease)
	Website: http://raymondcamden.com/
			http://andyMatthews.net
	Packed With: http://jsutility.pjoneil.net/
	Version: 1.4.2
*/
(function($) {

	"use strict";

	var defaults = {
		method: 'GET',
		icon: 'arrow-r',
		cancelRequests: false,
		target: $(),
		source: null,
		callback: null,
		link: null,
		minLength: 0,
		transition: 'fade',
		matchFromStart: true,
        termParam : 'term',
        loadingHtml : '<li data-icon="none"><a href="#">Searching...</a></li>'
	},
	openXHR = {},
	buildItems = function($this, data, settings) {
		var str = [];
		if (data) {
			$.each(data, function(index, value) {
				// are we working with objects or strings?
				if ($.isPlainObject(value)) {
					str.push('<li data-icon=' + settings.icon + '><a href="' + settings.link + encodeURIComponent(value.value) + '" data-transition="' + settings.transition + '">' + value.label + '</a></li>');
				} else {
					str.push('<li data-icon=' + settings.icon + '><a href="' + settings.link + encodeURIComponent(value) + '" data-transition="' + settings.transition + '">' + value + '</a></li>');
				}
			});
		}
		$(settings.target).html(str.join('')).listview("refresh");

		// is there a callback?
		if (settings.callback !== null && $.isFunction(settings.callback)) {
			attachCallback(settings);
		}

		if (str.length > 0) {
			$this.trigger("targetUpdated.autocomplete");
		} else {
			$this.trigger("targetCleared.autocomplete");
		}
	},
	attachCallback = function(settings) {
		$('li a', $(settings.target)).bind('click.autocomplete',function(e){
			e.stopPropagation();
			e.preventDefault();
			settings.callback(e);
		});
	},
	clearTarget = function($this, $target) {
		$target.html('').listview('refresh').closest("fieldset").removeClass("ui-search-active");
		$this.trigger("targetCleared.autocomplete");
	},
	handleInput = function(e) {
		var $this = $(this),
			id = $this.attr("id"),
			text,
			data,
			settings = $this.jqmData("autocomplete"),
			element_text,
			re;
		if (settings) {
			// get the current text of the input field
			text = $this.val();
            // check if it's the same as the last one
            if (settings._lastText === text) return;
            settings._lastText = text;
			// if we don't have enough text zero out the target
			if (text.length < settings.minLength) {
				clearTarget($this, $(settings.target));
			} else {
				// are we looking at a source array or remote data?
				if ($.isArray(settings.source)) {
					data = settings.source.sort().filter(function(element) {
						// matching from start, or anywhere in the string?
						if (settings.matchFromStart) {
							// from start
							element_text, re = new RegExp('^' + text, 'i');
						} else {
							// anywhere
							element_text, re = new RegExp(text, 'i');
						}
						if ($.isPlainObject(element)) {
							element_text = element.label;
						} else {
							element_text = element;
						}
						return re.test(element_text);
					});
					buildItems($this, data, settings);
				} 
				// Accept a function as source.
				// Function needs to call the callback, which is the first parameter.
				// source:function(text,callback) { mydata = [1,2]; callback(mydata); }
				else if (typeof settings.source === 'function') {
					
					settings.source(text,function(data){
						buildItems($this, data, settings);	
					});

				} else {
                    var ajax = {
						type: settings.method,
                        data: {},
                        dataType: 'json',
						beforeSend: function(jqXHR) {
							if (settings.cancelRequests) {
								if (openXHR[id]) {
									// If we have an open XML HTTP Request for this autoComplete ID, abort it
									openXHR[id].abort();
								} else {
								}
								// Set this request to the open XML HTTP Request list for this ID
								openXHR[id] = jqXHR;
							}
                            if (settings.loadingHtml) {
                                // Set a loading indicator as a temporary stop-gap to the response time issue
                                settings.target.html(settings.loadingHtml).listview('refresh');
                                settings.target.closest("fieldset").addClass("ui-search-active");
                            }
						},
						success: function(data) {
							buildItems($this, data, settings);
						},
						complete: function (jqXHR, textStatus) {
							// Clear this ID's open XML HTTP Request from the list
							if (settings.cancelRequests) {
								openXHR[id] = null;
							}
						}
                    };
                    if ($.isPlainObject(settings.source)) {
                        if (settings.source.callback) {
                            settings.source.callback(text, ajax);
                        }
                        for (var k in settings.source) {
                            if (k != 'callback') ajax[k] = settings.source[k];
                        }
                    } else {
                        ajax.url = settings.source;
                    }
					if (settings.termParam) ajax.data[settings.termParam] = text;
					$.ajax(ajax);
				}
			}
		}
	},
	methods = {
		init: function(options) {
			var el = this;
			el.jqmData("autocomplete", $.extend({}, defaults, options));
			var settings = el.jqmData("autocomplete");
			return el.unbind("keyup.autocomplete")
						.bind("keyup.autocomplete", handleInput)
						.next('.ui-input-clear')
						.bind('click', function(e){
							clearTarget(el, $(settings.target));
						});
		},
		// Allow dynamic update of source and link
		update: function(options) {
			var settings = this.jqmData("autocomplete");
			if (settings) {
				this.jqmData("autocomplete", $.extend(settings, options));
			}
			return this;
		},
		// Method to forcibly clear our target
		clear: function() {
			var settings = this.jqmData("autocomplete");
			if (settings) {
				clearTarget(this, $(settings.target));
			}
			return this;
		},
		// Method to destroy (cleanup) plugin
		destroy: function() {
			var settings = this.jqmData("autocomplete");
			if (settings) {
				clearTarget(this, $(settings.target));
				this.jqmRemoveData("autocomplete");
				this.unbind(".autocomplete");
			}
			return this;
		}
	};

	$.fn.autocomplete = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
	};

})(jQuery);
