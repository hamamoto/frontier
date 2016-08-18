// check viewport size

function isMobile(){
	return ($(window).width() <= 600 )
}	

function isTablet(){
	return ($(window).width() <= 1024 && $(window).width() > 600 )
}

function isDesktop(){
	return ($(window).width() > 1024)
}

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

	// active scroll

	$(window).scroll(function() {

		var position = $(this).scrollTop();

		$('.container').each(function() {
			var target = $(this).offset().top;
			var id = $(this).attr('id');

			if (position >= target) {
				$('#menu > ul > li > a').removeClass('active');
				$('#menu > ul > li > a[href=#' + id + ']').addClass('active');
			}
		});
	});


	// randomly apply image sizes and positions

	// get random numbers, no repeats
	var uniqueRandoms = [];
	var numRandoms = 10;
	function makeUniqueRandom() {
	    // refill the array if needed
	    if (!uniqueRandoms.length) {
	    	for (var i = 0; i < numRandoms; i++) {
	    		uniqueRandoms.push(i);
	    	}
	    }
	    var index = Math.floor(Math.random() * uniqueRandoms.length);
	    var val = uniqueRandoms[index];

	    // now remove that value from the array
	    uniqueRandoms.splice(index, 1);

	    return val;

	}

	// array for random sizes
	var sizes = [1, 2, 3, 4];

	// apply image and position randomly
	$('.random').each(function() {
		$(this).addClass('image-pos-' + (makeUniqueRandom() + 1));
		$(this).addClass('image-size-' + sizes[~~(Math.random()*sizes.length)]);
	});	

	if ( isMobile() ) {	
	}	

	// expand talks to show full description

	// $('#expand').click(function(){
	// 	$('.talk-contain').animate({height:'100%', "flex-basis":"100%"}, 500);
	// });

// 	$( ".talk-contain #expand" ).click(function() {
//   $( ".talk-contain" ).toggleClass( "more", 1000000);
// });

    // $('#expand').click( function() {
    //     var toggleWidth = $(".talk-contain").width() == "100%" ? "30%" : "100%";
    //     $('.talk-contain').animate({ width: toggleWidth });
    // });

	$('#expand').click(function(){
		if ($(this).parent().hasClass('wide')) {
			$(this).parent().removeClass('wide');
			$( "#expand p" ).html( '-' );
		} else {
			$(this).parent().addClass('wide');
			$( "#expand p" ).html( '+' );
		}
	});


	var stickyElements = document.getElementsByClassName('sticky');

	for (var i = stickyElements.length - 1; i >= 0; i--) {
	    Stickyfill.add(stickyElements[i]);
	}

	$('.image-hover').hover(function() {
		var image = $(this).attr("data-image");
		$('#'+image).addClass('hover');
	}, function() {
		var image = $(this).attr("data-image");
		$('#'+image).removeClass('hover');
	});

});

$( window ).load(function() {
    // position page at center
 	var div = $('#frontier'); // take your div id
 	$(window).scrollTop(div.offset().top);
 	$('#allcontainer').removeClass('transparent');
 	$("#menu").removeClass("transparent");


 	// show randomly placed images when window is loaded
 	$( '.random' ).each(function() {
 		$(this).addClass('show');
 	});	


 });	


