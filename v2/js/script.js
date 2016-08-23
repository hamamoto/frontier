// anim frame

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};
})();



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

	$('.home').click('click touchstart', function() {
		$('#menuMobile').animate({opacity: '1'}, 120);
		$('#menuMobile').animate({"z-index": '1000'}, 120); 
		$(this).animate({opacity: '0'}, 300);
		$(this).css({"z-index": '1000'}, 120);
		$('.homeClose').animate({opacity: '1'}, 300);
		$('.homeClose').css({"z-index": '2000'}, 120); 
	});

	$('.homeClose').click('click touchstart', function() {
		$('#menuMobile').animate({opacity: '0'}, 120); 
		$('#menuMobile').animate({"z-index": '-10'}, 120); 
		$(this).animate({opacity: '0'}, 300);  
		$(this).css({"z-index": '1000'}, 120);  
		$('.home').animate({opacity: '1'}, 300);
		$('.home').css({"z-index": '2000'}, 120); 
	});

	$('.home').click('click touchstart', function() {
		$('#menuMobile').animate({opacity: '1'}, 120);
		$('#menuMobile').animate({"z-index": '1000'}, 120); 
		$(this).animate({opacity: '0'}, 300);
		$(this).css({"z-index": '1000'}, 120);
		$('.homeClose').animate({opacity: '1'}, 300);
		$('.homeClose').css({"z-index": '2000'}, 120); 
	});


	$('#menu a').click(function(event){
		event.preventDefault();
		var link = this;
		$.smoothScroll({
			scrollTarget: link.hash
		});
	});

	$('#menuMobile a').click(function(event){
		$("#menuMobile").animate({opacity: '0'}, 300);
		$("#menuMobile").css({"z-index": '-10'}, 120);
		$('.home').animate({opacity: '1'}, 300);
		$('.home').css({"z-index": '2000'}, 120); 
		$('.homeClose').animate({opacity: '0'}, 300);
		$('.homeClose').css({"z-index": '1000'}, 120); 
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

// active scroll mobile
	$(window).scroll(function() {

		var position = $(this).scrollTop();

		$('.container').each(function() {
			var target = $(this).offset().top;
			var id = $(this).attr('id');

			if (position >= target) {
				$('#menuMobile > ul > li > a').removeClass('active');
				$('#menuMobile > ul > li > a[href=#' + id + ']').addClass('active');
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

	$('.talk-contain #expand').click(function(){
		if ($(this).siblings(".details").hasClass('hide')) {
			$(this).siblings(".details").removeClass('hide');
			$(this).siblings(".details").children(".bio").animate({ "opacity": "1" }, 500);
			$(this).siblings(".details").children(".desc").animate({ "opacity": "1" }, 500);
			$(this).siblings(".details").children(".links").animate({ "opacity": "1" }, 500);
			$( this ).html( '<p>-</p>' );
		} else {
			$(this).siblings(".details").addClass('hide');
			$(this).siblings(".details").children(".bio").animate({ "opacity": "0" }, 500);
			$(this).siblings(".details").children(".desc").animate({ "opacity": "0" }, 500);
			$(this).siblings(".details").children(".links").animate({ "opacity": "0" }, 500);
			$( this ).html( '<p>+</p>' );
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

 	init3dType();
 });


// 3D

var $webglCanvas = null;
var $wrap = null;
var wrapWidth = 0;
var wrapHeight = 0;
var wrapPadding = 150;

var wWidth = 0;
var wHeight = 0;

var mouseX = 0;
var mouseY = 0;
var targetMouseX = 0;
var targetMouseY = 0;

var DEG_TO_RAD = Math.PI / 180;

var renderer = null;
var scene = null;

var clock = null;

var camera = null;

var controls = null;

var object = null;
var material = null;
var plane = null;
var texture = null;

var image = null;
var imageSrc = 'img/frontier_type.png';
var imageloaded = false;
var canvas = null;
var ctx = null;
var cWidth = 1024;
var cHeight = 1024;


var init3dType = function() {

	$wrap = $('#frontier').find('.type');
	wrapWidth = $wrap.outerWidth()+wrapPadding*2;
	wrapHeight = $wrap.outerHeight()+wrapPadding*2;

	loadImage();

	initCanvas();

	init3d();

	initShaderMaterial();

	object = new THREE.Object3D();
	scene.add(object);

	onResize();

	addEvents();

	render();
};

var loadImage = function() {
	image = new Image();
	image.onload = onImageLoad;
	image.src = imageSrc;
};

var onImageLoad = function() {

	imageloaded = true;

	var ratio = image.naturalWidth/image.naturalHeight;
	var drawWidth = cWidth;
	var drawHeight = cWidth /ratio;

	ctx.drawImage(image, 0, 0, drawWidth, drawHeight);

	var planeGeo = new THREE.PlaneGeometry(230, 230, 20, 20);
	plane = new THREE.Mesh(planeGeo, material);

	object.add(plane);

	plane.rotation.z = 180*DEG_TO_RAD;
	plane.position.y = 70;

	texture.needsUpdate = true;
};

var initCanvas = function() {
	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');

// document.body.appendChild((canvas));

canvas.style.position = 'absolute';

canvas.width = cWidth;
canvas.height = cHeight;
};

var init3d = function() {

	if (Detector.webgl) {
		renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
		renderer.setSize(wrapWidth, wrapHeight);
		renderer.setClearColor(0xff0000, 0.0);

		$wrap.append(renderer.domElement);
		$webglCanvas = $(renderer.domElement);

		clock = new THREE.Clock();

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(10000, wrapWidth/wrapHeight, 0.1, 10000);
		camera.position.z = 65;
		camera.lookAt(new THREE.Vector3(0, 0 ,0));
	}
	else {
		$('h1, h2').css({
			opacity: 1
		});
	}
};

var initShaderMaterial = function() {
	texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	var uniforms = {
		texture:    { type: "t", value: texture },
		canvasSize:   { type: "2f", value: [cWidth, cHeight]},
		time:           { type: "f", value: 1.0 },
		mouse:           { type: "2f", value: [1.0, 1.0]}
	};

	material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: $('.vertexShader')[0].textContent,
		fragmentShader: $('.fragmentShader')[0].textContent,
		transparent: true
	});

	material.needsUpdate = true;
};


var render = function() {

	targetMouseX += (mouseX - targetMouseX) * 0.03;
	targetMouseY += (mouseY - targetMouseY) * 0.03;

	if (Detector.webgl) {
		time = clock.getElapsedTime();

		material.uniforms.mouse.value = [targetMouseX, targetMouseY];
		material.uniforms.time.value = time;

		renderer.render(scene, camera);
	}

	requestAnimFrame(render);
};


var addEvents = function() {
	window.onmousemove = function(e) {
		onMouseMove(e);
	};

	window.onresize = function() {
		onResize();
	};
};


var onMouseMove = function(e) {
	mouseX = e.pageX/window.innerWidth-0.5;
	mouseY = e.pageY/window.innerHeight-0.5;
};

var onResize = function() {

	wWidth = window.innerWidth;
	wHeight = window.innerHeight;

	wrapPadding = $wrap.outerWidth()/5;

	wrapWidth = $wrap.outerWidth()+wrapPadding*2;
	wrapHeight = $wrap.outerHeight()+wrapPadding*2;

	camera.aspect = wrapWidth / wrapHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( wrapWidth, wrapHeight );

	$webglCanvas.css({
		'left': -wrapPadding,
		'top': -wrapPadding
	});
};

