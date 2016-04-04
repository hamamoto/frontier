

$(document).ready(function(){

	  // apply spans
	  $("h2").lettering();

      // hack to get animations to run again
      $(".redraw").click(function() {	
      	var el = $(this),  
      	prev = el.prev(),
      	newone = prev.clone();
      	el.before(newone);
      	$("." + prev.attr("class") + ":first").remove();
      }); 

      var text = $("#jquerybuddy"),
      numLetters = text.find("span").length;

      function randomBlurize() {
      	text.find("span:nth-child(" + (Math.floor(Math.random()*numLetters)+1) + ")")
      	.animate({
      		'textShadowBlur': Math.floor(Math.random()*25)+4,
      		'textShadowColor': 'rgba(0,0,0,' + (Math.floor(Math.random()*200)+55) + ')'
      	});
		// Call itself recurssively
		setTimeout(randomBlurize, 100);
	  } // Call once
	  randomBlurize();



	  var canvas = document.getElementById("imgCanvas");
	  var context = canvas.getContext("2d");

// $('body').css("background",transparent);

function createImageOnCanvas(imageId) {
    //canvas.style.display = "block";
    //document.getElementById("images").style.overflowY = "hidden";
    //var img = new Image(300, 300);
    //img.src = document.getElementById(imageId).src;
    //context.drawImage(img, (0), (0)); //onload....
}

function draw(e) {
	// var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

	var pos = getMousePos(canvas, e);
	posx = pos.x;
	posy = pos.y;
	context.fillStyle = "#3300ff";
	context.fillRect(posx, posy, 12, 12);
}
window.addEventListener('mousemove', draw, false);

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

});