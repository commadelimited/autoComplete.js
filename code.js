$(document).ready(function(){
	$('#examples').on('change', function(e, ui) {
		// hackish way
		setTimeout(function(){window.location.href = e.currentTarget.value;},100)
	});
});