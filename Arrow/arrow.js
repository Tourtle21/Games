var x = 50;
var y = 500;
var xspeed = 0;
var yspeed = 2;
var power = 4;
setAnglePower(20, 50)
xspeed *= power;
yspeed *= power;
setInterval(function() {
	x += xspeed;
	y -= yspeed;
	yspeed -= 0.04
	$("#arrow").css("left", x + "px")
	$("#arrow").css("top", y + "px")
});

$(document).keydown(function(e) {
	if (e.which == 32) {
		console.log("space")
	}
})

function setAnglePower(spray, angle) {
	power = spray * 0.5;
	yspeed = angle/180;
	xspeed = (1 - yspeed)
	console.log(power)
}