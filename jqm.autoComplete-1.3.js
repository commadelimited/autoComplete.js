/*
	Name: autoComplete
	Author: Raymond Camden & Andy Matthews
	Website: http://raymondcamden.com/
		http://andyMatthews.net
	Packed With: http://jsutility.pjoneil.net/
	Version: 1.3
 */
(function($) {

    "use strict";

    var defaults = {
            target: $(),
            source: null,
            link: null,
            minLength: 0
    },
    buildItems = function(data, settings) {
        var str = [];
        $.each(data, function(index, value) {
            // are we working with objects or strings?
            if ($.isPlainObject(value)) {
                str.push('<li><a href="' + settings.link + encodeURIComponent(value.value) + '">' + value.label + '</a></li>');
            } else {
                str.push('<li><a href="' + settings.link + encodeURIComponent(value) + '">' + value + '</a></li>');
            }
        });
        $(settings.target).html(str.join('')).listview("refresh");
    },
    handleInput = function(e) {
        var $this = $(this), text, data, settings = $this.jqmData("autocomplete");
        if (settings) {
            // get the current text of the input field
            text = $this.val();
            // if we don't have enough text zero out the target
            if (text.length < settings.minLength) {
                $(settings.target).html('').listview('refresh');
            } else {
                // are we looking at a source array or remote data?
                if ($.isArray(settings.source)) {
                    data = settings.source.sort().filter(function(element) {
                        var element_text, re = new RegExp('^' + text, 'i');
                        if ($.isPlainObject(element)) {
                            element_text = element.label;
                        } else {
                            element_text = element;
                        }
                        return re.test(element_text);
                    });
                    buildItems(data, settings);
                } else {
                    $.get(settings.source, { term: text }, function(data) {
                        buildItems(data, settings);
                    },"json");
                }
            }
        }
    },
    methods = {
            init: function(options) {
                this.jqmData("autocomplete", $.extend({}, defaults, options));
                return this.unbind("input", handleInput).bind("input", handleInput);
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
                    $(settings.target).html('').listview('refresh');
                }
                return this;
            },
            // Method to destroy (cleanup) plugin
            destroy: function() {
                var settings = this.jqmData("autocomplete");
                if (settings) {
                    this.unbind("input", handleInput);
                    this.jqmRemoveData("autocomplete");
                    $(settings.target).html('').listview('refresh');
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
