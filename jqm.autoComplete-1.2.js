/*
	Name: autoComplete
	Author: Raymond Camden & Andy Matthews
	Website: http://raymondcamden.com/
		http://andyMatthews.net
	Packed With: http://jsutility.pjoneil.net/
	Version: 1.1.1
*/
(function($){

	$.fn.autocomplete = function(o){

		o = $.extend( {}, $.fn.autocomplete.defaults, o );

		return this.each(function(i, el){

			// this
			var $e = $(el);

			// TODO: make sure that o.target is a jQuery object
			var $target = o.target;

			$e.bind('input', function ( e ) {

				// get the current text of the input field
				var text = $e.val();

				// if there's no length, then zero out the target
				if(text.length < 1) {
					$target.html('').listview('refresh');
				} else if (text.length > o.minLength){

					// are we looking at a source array or remote data?
					if ($.isArray(o.source)) {
						var data = o.source.sort().filter(function(element, index, array){
							var re = new RegExp('^' + text, 'i');
							if ($.isPlainObject(element)) {
								element_text = element.label;
							} else {
								element_text = element;
							}
							return re.test(element_text);
						});
						buildItems(data);
					} else {
						$.get(o.source, {term:text}, function(data) {
							buildItems(data);
						},"json");
					}
				}
			});

			function buildItems(data) {
				var str = [];
				$(data).each(function(index,value){
					// are we working with objects or strings?
					if ($.isPlainObject(value)) {
						str.push('<li><a href="' + o.link + value.value + '">' + value.label + '</a></li>');
					} else {
						str.push('<li><a href="' + o.link + value + '">' + value + '</a></li>');
					}
				});
				$target.html(str.join('')).listview("refresh");
			}
		});
	};

	$.fn.autocomplete.defaults = {
		target: $(),
		source: null,
		link: null,
		minLength: 0
	};

})(jQuery);

