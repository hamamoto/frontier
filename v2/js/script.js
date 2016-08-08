$(document).ready(function() {


	$('#menu a').click(function(event){
		event.preventDefault();
		var link = this;
		$.smoothScroll({
			scrollTarget: link.hash
		});
	});

	$('#name-link-0').mouseover('click touchstart', function() {
    	$('#bio0').animate({opacity: '1'}, 120); 
    });

});

$( window ).load(function() {
    // position page at center
 	var div = $('#frontier'); // take your div id
    $(window).scrollTop(div.offset().top);
	$('#allcontainer').removeClass('transparent');
	$("#menu").addClass("transparent");

});	
