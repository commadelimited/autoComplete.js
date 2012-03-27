/*
	Name: jqm.autoComplete-1.0.js
	Author: Raymond Camden & Andy Matthews
	Website: http://raymondcamden.com/
		http://andyMatthews.net
	Packed With: http://jsutility.pjoneil.net/
	Version: 1.0
*/
(function($){$.fn.autocomplete=function(o){o=$.extend({},$.fn.autocomplete.defaults,o);return this.each(function(i,el){var $e=$(el),$target=o.target;$e.bind('input',function(e){var text=$e.val();if(text.length<1){$target.html('').listview('refresh')}else if(text.length>o.minLength){if($.isArray(o.source)){}else{$.get(o.source,{term:text},function(data){var str=[];$(data).each(function(index,value){if($.isPlainObject(value)){str.push('<li><a href="'+o.link+value['value']+'">'+value['label']+'</a></li>')}else{str.push('<li><a href="'+o.link+value+'">'+value+'</a></li>')}});$target.html(str.join('')).listview("refresh")},"json")}}})})};$.fn.autocomplete.defaults={target:$(),source:null,link:null,minLength:0}})(jQuery);