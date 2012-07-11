$(document).on("pageinit", function(event){
	$('#examples').bind('change', function(e, ui) {
		window.location = e.currentTarget.value;
	});
	// $('#searchBox').bind('change', function(e){
	// 	console.log(e);
	// });
	// $('.ui-input-clear').bind('click', function(e){
	// 	alert('click!');
	// });
});