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

	$('.talk-contain #expand').click(function(){
		if ($(this).siblings(".details").hasClass('hide')) {
			$(this).siblings(".details").removeClass('hide');
			$( "#expand p" ).html( '-' );
		} else {
			$(this).siblings(".details").addClass('hide');
			$( "#expand p" ).html( '+' );
		}
	});

// $('.talk-contain #expand').click(function(){
// 		$(this).siblings(".details").toggleClass( "hide");
// 	});






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
var wrapPadding = 50;

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

	// createInitial();

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
  // ctx.fillStyle = 'white';
  // ctx.fillRect(0, 0, 200, 200);

  var planeGeo = new THREE.PlaneGeometry(230, 230, 20, 20);
  plane = new THREE.Mesh(planeGeo, material);

  object.add(plane);

  plane.rotation.z = 180*DEG_TO_RAD;
  plane.position.y = 60;


  texture.needsUpdate = true;

  // console.log('loaded', imageloaded);
};

var initCanvas = function() {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');

// document.body.appendChild((canvas));

  canvas.style.position = 'absolute';

  canvas.width = cWidth;
  canvas.height = cHeight;

  drawCanvas();
};

var drawCanvas = function(t) {
  // ctx.clearRect(0, 0, cWidth, cHeight);
  // if (!t) {
  //   t = 0;
  // }

  // // console.log('t',t);
  // ctx.strokeStyle = 'white';
  // // ctx.fillRect(0, 0, 200, 200);
  // var steps = 30;
  // var stepSize = 360/steps;

  // ctx.clearRect(0, 0, cWidth, cHeight);

  // for (var i = 0; i < steps; i++) {
  //   ctx.save();
  //   ctx.translate(cWidth/2, cHeight/2);
  //   ctx.rotate((stepSize * i+t*10)*DEG_TO_RAD);
  //   ctx.beginPath();
  //   ctx.moveTo(0,0);
  //   ctx.lineTo(cWidth,2);
  //   ctx.stroke();
  //   ctx.restore();
  // }
  // // console.log('s', t*1000);
  // // ctx.rotate(t*1000);
  // if (texture) {
  //   texture.needsUpdate = true;
  // }
  // console.log('c', imageloaded);
    if (imageloaded) {
      // console.log('loadeder');
      // ctx.clearRect(0, 0, cWidth, cHeight);
      // ctx.drawImage(image, 0, 0, cWidth, cHeight);

      if (texture) {
        texture.needsUpdate = true;
      }
    }


};

var init3d = function() {

  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setSize(wrapWidth, wrapHeight);
  renderer.setClearColor(0xff0000, 0.0);

  $wrap.append(renderer.domElement);
  $webglCanvas = $(renderer.domElement);
  // document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(10000, wrapWidth/wrapHeight, 0.1, 10000);
  camera.position.z = 65;
  camera.lookAt(new THREE.Vector3(0, 0 ,0));

  // controls = new THREE.OrbitControls( camera, renderer.domElement );

  // var bg = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000, 1, 1), new THREE.MeshBasicMaterial({transparent:true, opacity:.1, color:0x000000}));
  //   bg.position.z = -80;
  //   scene.add(bg);

  // //SPOTLIGHT
  // light = new THREE.SpotLight( 0xffffff, 10 );
  // light.position.set( 0, 10, 50, 13 );


  //light.castShadow = true;

  // light.shadowMapWidth = 1024;
  // light.shadowMapHeight = 1024;

  // light.shadowCameraNear = 10;
  // light.shadowCameraFar = 10000;
  // light.shadowCameraFov = 30;

  // scene.add( light );
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
      // depthTest: false,
      transparent: true
      // blending: THREE.AdditiveBlending
  });

  material.needsUpdate = true;
};

var createInitial = function() {

  var planeGeo = new THREE.PlaneGeometry(150, 150, 50, 50);
  plane = new THREE.Mesh(planeGeo, material);

  object.add(plane);

  plane.rotation.z = 180*DEG_TO_RAD;
};



var render = function() {
  var time = clock.getElapsedTime();
  // console.log('time', time);
  // drawCanvas(time);

  material.uniforms.mouse.value = [targetMouseX, targetMouseY];
  material.uniforms.time.value = time;

  targetMouseX += (mouseX - targetMouseX) * 0.1;
  targetMouseY += (mouseY - targetMouseY) * 0.1;

  // object.rotation.z += targetMouseX*0.01;
  // object.rotation.x = targetMouseY*0.1;

  // setPositions(time);

  // for (var i = 0; i < lines.length; i++) {
  //   var line = lines[i];
  //   line.material.uniforms.time.value = (Date.now()-line.material.uniforms.startTime.value)/1000;

  //   line.material.uniforms.mx.value = mouseX;
  //   line.material.uniforms.my.value = mouseY;
  //   // console.log('tine', Date.now()-line.material.uniforms.startTime.value);
  // }
  // console.log('render');

  // material.needsUpdate = true;

	renderer.render(scene, camera);

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

