var x = 50;
var y = 500;
var xspeed = 0;
var yspeed = 2;
var power = 4;
var run = false;
setAnglePower(20, 50)
xspeed *= power;
yspeed *= power;


$(document).keydown(function(e) {
	if (e.which == 32) {
		run = true;
	}
	if (e.which == 38) {
		setAnglePower(power + 1)
		console.log(power)
	}
	console.log(e.which)
})

function setAnglePower(spray, angle) {
	power = spray * 0.5;
	yspeed = angle/180;
	xspeed = (1 - yspeed)
}

setInterval(function() {
	if (run) {
		x += xspeed;
		y -= yspeed;
		yspeed -= 0.04
		$("#arrow").css("left", x + "px")
		$("#arrow").css("top", y + "px")
	}
});
