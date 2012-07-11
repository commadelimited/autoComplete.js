$(document).on("pageinit", function(event){
	$('#examples').bind('change', function(e, ui) {
		window.location = e.currentTarget.value;
	});
});