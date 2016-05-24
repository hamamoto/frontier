
$(document).ready(function(){




	$('#btn1').mouseover('click touchstart', function() { 
		// $("#img1").css("-webkit-filter", "blur(0px)",500);
		// $("#img1").animate({-webkit-filter: 'blur(0px)'}, 300);
		$({blurRadius: 0}).animate({blurRadius: 0}, {
			duration: 1000,
        easing: 'swing', // or "linear"
                         // use jQuery UI or Easing plugin for more options
                         step: function() {
                         	console.log(this.blurRadius);
                         	$('#img1').css({
                         		"-webkit-filter": "blur("+this.blurRadius+"px)",
                         		"filter": "blur("+this.blurRadius+"px)"                         	});
                         }
                     });
		$('#img1').animate({opacity: '1'}, 1000);
	});



	$('#btn1').mouseleave('click touchstart', function() { 
		// $("#img1").css("-webkit-filter", "blur(10px)",500);
		// $("#img1").animate({-webkit-filter: 'blur(10px)'}, 300);
		$({blurRadius: 10}).animate({blurRadius: 10}, {
			duration: 500,
        easing: 'swing', // or "linear"
                         // use jQuery UI or Easing plugin for more options
                         step: function() {
                         	console.log(this.blurRadius);
                         	$('#img1').css({
                         		"-webkit-filter": "blur("+this.blurRadius+"px)",
                         		"filter": "blur("+this.blurRadius+"px)"
                         	});
                         }
                     });
		$('#img1').animate({opacity: '0.2'}, 1000);
	});

	$('#btn2').mouseover('click touchstart', function() { 
		// $("#img1").css("-webkit-filter", "blur(0px)",500);
		// $("#img1").animate({-webkit-filter: 'blur(0px)'}, 300);
		$({blurRadius: 0}).animate({blurRadius: 0}, {
			duration: 1000,
        easing: 'swing', // or "linear"
                         // use jQuery UI or Easing plugin for more options
                         step: function() {
                         	console.log(this.blurRadius);
                         	$('#img2').css({
                         		"-webkit-filter": "blur("+this.blurRadius+"px)",
                         		"filter": "blur("+this.blurRadius+"px)"                         	});
                         }
                     });
		$('#img2').animate({opacity: '1'}, 1000);
	});



	$('#btn2').mouseleave('click touchstart', function() { 
		// $("#img1").css("-webkit-filter", "blur(10px)",500);
		// $("#img1").animate({-webkit-filter: 'blur(10px)'}, 300);
		$({blurRadius: 10}).animate({blurRadius: 10}, {
			duration: 500,
        easing: 'swing', // or "linear"
                         // use jQuery UI or Easing plugin for more options
                         step: function() {
                         	console.log(this.blurRadius);
                         	$('#img2').css({
                         		"-webkit-filter": "blur("+this.blurRadius+"px)",
                         		"filter": "blur("+this.blurRadius+"px)"
                         	});
                         }
                     });
		$('#img2').animate({opacity: '0.2'}, 1000);
	});

	$('#btn3').mouseover('click touchstart', function() { 
		// $("#img1").css("-webkit-filter", "blur(0px)",500);
		// $("#img1").animate({-webkit-filter: 'blur(0px)'}, 300);
		$({blurRadius: 0}).animate({blurRadius: 0}, {
			duration: 1000,
        easing: 'swing', // or "linear"
                         // use jQuery UI or Easing plugin for more options
                         step: function() {
                         	console.log(this.blurRadius);
                         	$('#img3').css({
                         		"-webkit-filter": "blur("+this.blurRadius+"px)",
                         		"filter": "blur("+this.blurRadius+"px)"                         	});
                         }
                     });
		$('#img3').animate({opacity: '1'}, 1000);
	});



	$('#btn3').mouseleave('click touchstart', function() { 
		// $("#img1").css("-webkit-filter", "blur(10px)",500);
		// $("#img1").animate({-webkit-filter: 'blur(10px)'}, 300);
		$({blurRadius: 10}).animate({blurRadius: 10}, {
			duration: 500,
        easing: 'swing', // or "linear"
                         // use jQuery UI or Easing plugin for more options
                         step: function() {
                         	console.log(this.blurRadius);
                         	$('#img3').css({
                         		"-webkit-filter": "blur("+this.blurRadius+"px)",
                         		"filter": "blur("+this.blurRadius+"px)"
                         	});
                         }
                     });
		$('#img3').animate({opacity: '0.2'}, 1000);
	});

	$('#btn4').mouseover('click touchstart', function() { 
		// $("#img1").css("-webkit-filter", "blur(0px)",500);
		// $("#img1").animate({-webkit-filter: 'blur(0px)'}, 300);
		$({blurRadius: 0}).animate({blurRadius: 0}, {
			duration: 1000,
        easing: 'swing', // or "linear"
                         // use jQuery UI or Easing plugin for more options
                         step: function() {
                         	console.log(this.blurRadius);
                         	$('#img4').css({
                         		"-webkit-filter": "blur("+this.blurRadius+"px)",
                         		"filter": "blur("+this.blurRadius+"px)"                         	});
                         }
                     });
		$('#img4').animate({opacity: '1'}, 1000);
	});



	$('#btn4').mouseleave('click touchstart', function() { 
		// $("#img1").css("-webkit-filter", "blur(10px)",500);
		// $("#img1").animate({-webkit-filter: 'blur(10px)'}, 300);
		$({blurRadius: 10}).animate({blurRadius: 10}, {
			duration: 500,
        easing: 'swing', // or "linear"
                         // use jQuery UI or Easing plugin for more options
                         step: function() {
                         	console.log(this.blurRadius);
                         	$('#img4').css({
                         		"-webkit-filter": "blur("+this.blurRadius+"px)",
                         		"filter": "blur("+this.blurRadius+"px)"
                         	});
                         }
                     });
		$('#img4').animate({opacity: '0.2'}, 1000);
	});



});