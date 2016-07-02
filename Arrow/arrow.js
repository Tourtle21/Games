var x = 50;
var y = 500;
var xspeed = 0;
var yspeed = 2;
var power = 4;
var run = false;
var amountPlayers;
xspeed *= power;
yspeed *= power;

$("#setAmount").click(function() {
	amountPlayers = $("#amountPlayers").val();
	if (!isNaN(amountPlayers)) {
		amountPlayers = Number(amountPlayers)
		game();
	}
});
function game() {
	var arrow = "<div class='arrow'></div>"
	for (var i = 0; i < amountPlayers; i++) {
		$("#game").append(arrow);
		if (i == (amountPlayers-1)) {
			$(".arrow").eq(i).css("left", ((window.innerWidth / (amountPlayers / i)) * (1 + (1/(amountPlayers-1)))) - 20)
		}
		else if (i == 0) {
			$(".arrow").eq(i).css("left", ((window.innerWidth / (amountPlayers / i)) * (1 + (1/(amountPlayers-1)))) + 10)
		}
		else {
			$(".arrow").eq(i).css("left", (window.innerWidth / (amountPlayers / i)) * (1 + (1/(amountPlayers-1))))
		}
	}
	var mountain = "<div id='mountain'></div>"
	$("#container").append(mountain);
	mountain.css("left", "100")
	mountain.css()
	function setKeyHandler() {
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
	}

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
}
