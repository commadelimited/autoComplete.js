(function($){"use strict";var defaults={target:$(),source:null,link:null,minLength:0},buildItems=function(data,settings){var str=[];$.each(data,function(index,value){if($.isPlainObject(value)){str.push('<li><a href="'+settings.link+encodeURIComponent(value.value)+'">'+value.label+'</a></li>');}else{str.push('<li><a href="'+settings.link+encodeURIComponent(value)+'">'+value+'</a></li>');}});$(settings.target).html(str.join('')).listview("refresh");},handleInput=function(e){var $this=$(this),settings=$this.jqmData("autocomplete");if(settings){var text=$this.val();if(text.length<=settings.minLength){$(settings.target).html('').listview('refresh');}else{if($.isArray(settings.source)){var data=settings.source.sort().filter(function(element){var re=new RegExp('^'+text,'i');return re.test(element);});buildItems(data,settings);}else{$.get(settings.source,{term:text},function(data){buildItems(data,settings);},"json");}}}},methods={init:function(options){this.jqmData("autocomplete",$.extend({},defaults,options));return this.unbind("input",handleInput).bind("input",handleInput);},update:function(options){var settings=this.jqmData("autocomplete");if(settings){this.jqmData("autocomplete",$.extend(settings,options));}return this;},clear:function(){var settings=this.jqmData("autocomplete");if(settings){$(settings.target).html('').listview('refresh');}return this;},destroy:function(){var settings=this.jqmData("autocomplete");if(settings){this.unbind("input",handleInput);this.jqmRemoveData("autocomplete");$(settings.target).html('').listview('refresh');}return this;}};$.fn.autocomplete=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}};})(jQuery);