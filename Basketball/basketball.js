var player;
var money;
var highScore = 0;
var ballType = "orange";
var arrows;
var balls = [
  "orange",
  "blue",
  "green",
  "purple",
  "black",
  "red",
  "silver",
  "teal",
  "aquamarine",
  "yellow",
  "indigo",
  "url(images/blue.png)",
  "url(images/green.png)",
  "url(images/red.png)",
  "url(images/pink.png)",
  "url(images/pinkSoccer.png)",
  "url(images/purple.png)",
  "url(images/egg.png)",
  "url(images/pepper.png)",
  "url(images/pizza.png)",
  "url(images/pineapple.png)",
  "url(images/snowglobe.png)",
  "url(images/watermelon2.png)",
  "url(images/amethyst.png)",
  "url(images/icecube.png)",
  "url(images/bubble.png)",
  "url(images/fireball.png)",
]
var copy = balls.slice(0);
if (!localStorage.highScore) {
  localStorage.setItem("highScore", JSON.stringify({"player": "None", score: 0}));
}
if (!localStorage.getItem("players")) {
  var players = [];
  $("#resume").hide();
} else {
  var players = JSON.parse(localStorage.getItem("players"));
}
$("#new").click(function() {
  $("#main").css("visibility", "hidden");
  $("#newPerson").css("visibility", "visible")
  $("#submit").click(function() {
    player = $("#input").val();
    players.push(player);
    localStorage.setItem("players", JSON.stringify(players))
    localStorage.setItem(player, JSON.stringify({"score": 0, "money": 50, "balls": ["orange"]}));
    console.log(localStorage[player], player)
    console.log(localStorage)
    console.log(localStorage.getItem("players"))
    $("#player").text(player);
    $("#game").css("visibility", "visible");
    $("#newPerson").css("visibility", "hidden");
    game();
  });
});

$("#resume").click(function() {

  $("#main").css("visibility", "hidden");
  for (var i = 0; i < players.length; i++) {
    $("#person").append("<button class='people'>" + players[i] + "</button>")
    $(".people").eq(i).click(function() {
      player = $(this).text();
      balls.forEach(function(item, index) {
        JSON.parse(localStorage[player]).balls.forEach(function(playerBall) {
          if (item == playerBall) {
            balls.splice(index, 1)
          }
        })
      });
      $("#player").text($(this).text());
      $("#game").css("visibility", "visible");
      $(".people").css("visibility", "hidden");
      game();
    });
  }
  $("#person").css("visibility", "visible");
});
$("#random").click(function() {
  $("randomBox").css("visibility", "hidden")
  $("#balls").css("visibility", "visible");
  $("#game").css("visibility", "hidden");
  console.log(JSON.parse(localStorage[player]))
  for (var i = 0; i < JSON.parse(localStorage[player]).balls.length; i++) {
    $("#balls").append("<div class='ball'></div>")
    console.log(JSON.parse(localStorage[player]).balls[i])
    $(".ball").eq(i).css("background", JSON.parse(localStorage[player]).balls[i])
    $(".ball").eq(i).css("background-size", "100% 100%")

    $(".ball").eq(i).click(function() {
      console.log(JSON.parse(localStorage[player]).balls[i - 1])
      $(".ball").remove();
      ballType = $(this).css("background");
      $basketball.css("background", ballType)
      $("#balls").css("visibility", "hidden");
      $("#game").css("visibility", "visible");
      console.log("hi")
      console.log(typeof JSON.parse(localStorage[player]).balls[i - 1])
      console.log((JSON.parse(localStorage[player]).balls[i - 1]))
      console.log(copy[25])
      console.log(copy.indexOf((JSON.parse(localStorage[player]).balls[i - 1])))
      if (copy.indexOf(JSON.parse(localStorage[player]).balls[i - 1]) > 10 && copy.indexOf((JSON.parse(localStorage[player]).balls[i - 1])) < 23) {
        arrows = 3;
      }
      else if (copy.indexOf(JSON.parse(localStorage[player]).balls[i - 1]) > 22) {
        console.log("hi")
        arrows = 5;
        console.log(arrows)
      } else {
          arrows = 1;
      }
    });
  }
});
$("#getRandom").click(function() {
  if (JSON.parse(localStorage[player]).money > 49) {
    $("#randomBox").css("visibility", "visible");
    $("#ball").css("visibility", "visible");
    $("#game").css("visibility", "hidden");
    $("#randomBox").css("opacity", 1);
    $("#ball").css("z-index", "-1");
    var random = Math.floor(Math.random() * (balls.length + 1));
    $("#ball").css("background", balls[random])
    $("#ball").css("background-size", "100% 100%")
    setBallStorage(balls[random])
    setStorage(JSON.parse(localStorage[player]).score, JSON.parse(localStorage[player]).money - 50)
    money -= 50;
    $("#money").text("Money: " + JSON.parse(localStorage[player]).money);
  }
})
$("#randomBox").click(function() {
  $("#randomBox").animate({
    opacity: 0
  }, 5000, function() {
    $("#ball").css("z-index", "1")
    $("#ball").click(function() {
      $("#ball").css("visibility", "hidden")
      $("randomBox").css("visibility", "hidden")
      $("#game").css("visibility", "visible")
    })
  });

})

function game() {
  $basketball = $("#basketball")
  var number = 5;
  var sign = "subtract"
  var height = 100;
  var width = 100;
  var left = $(document).width() / 2.26;
  var speed = 11;
  var interval = true;
  var score = 0;
  money = 0;
  var hoopSpeed = 1;
  var x = $(document).width() / 2.3;
  var direction = true;
  var points = true;
  var end = 100;
  var rebound = false;
  var make = false;
  if (arrows === undefined) {
    arrows = 1;
  }
  console.log(localStorage[player], player)
  console.log(localStorage.highScore)
  highScore = JSON.parse(localStorage.highScore).score;
  if (localStorage[player]) {
    $("#score").text("Score: " + JSON.parse(localStorage[player]).score)
    score = JSON.parse(localStorage[player]).score
    $("#money").text("Money: " + JSON.parse(localStorage[player]).money)
    money = JSON.parse(localStorage[player]).money
  }
  else {
    $("#score").text("Score: " + score)
    $("#money").text("Money: " + money)
  }
  $("#money").text("Money: " + money)
  $("#highScore").text("High Score " + JSON.parse(localStorage.highScore).player + ": " + highScore)
  $basketball.css("left", left)
  $("#basketballHoop").css("left", x);
  setInterval(function () {
    if (score - number > 0) {
      hoopSpeed += 1;
      number += 5;
    }
    if (direction) {
      x += hoopSpeed;
      $("#basketballHoop").css("left", x);
    } else {
      x -= hoopSpeed;
      $("#basketballHoop").css("left", x)
    }
    if ($("#basketballHoop").position().left > $(window).width() - 500) {
      direction = false;
    }
    if ($("#basketballHoop").position().left < 300) {
      direction = true;
    }
  }, 10);
  // 38.6875
  $(document).keydown(function(e) {
    if (e.which == 32) {
      if (interval) {
        interval = false;
        var move = setInterval(function() {
          $basketball.css("top", changeSign($basketball.position().top, speed, sign))
          if ($basketball.position().top < 750 && sign == "subtract") {
            speed /= 1.012
            height *= 0.996;
            width *= 0.996;
            left += 0.4;
            $basketball.css("left", left)
            $basketball.css("height", height)
            $basketball.css("width", width)
          } else {
            speed *= 1.019;
            $(".rim").css("z-index", 1)
          }
          if ($basketball.position().top < end) {
            sign = "add"
          }
          if ($basketball.position().top > 800) {
            if (!make) {
              number = 5;
              hoopSpeed = 1;
              score = 0;
              $("#score").text("Score: " + score)

              setStorage(score, money)
              console.log(localStorage)
            }
            sign = "subtract"
            reset();
            clearInterval(move)
            $basketball.css("top", 740);
          }
          if ($basketball.position().top > 260 && $basketball.position().top < 312 && sign == "add") {
            if ($basketball.position().left - $("#basketballHoop").position().left > 38.6 && $basketball.position().left - $("#basketballHoop").position().left < 56.6 && points) {
              points = false;
              if (rebound) {
                score += 1;
                money += 1;
              } else {
                score += 2;
                money += 2;
              }
              if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", JSON.stringify({"player": player, "score": score}))
              }
              $("#money").text("Money: "+ money)
              setStorage(score, money)
              $("#score").text("Score: " + score)
              $("#highScore").text("High Score "+ JSON.parse(localStorage.highScore).player + ": " + highScore)
              make = true;
            }
            if ($basketball.position().left - $("#basketballHoop").position().left > 38.6 - 57 && $basketball.position().left - $("#basketballHoop").position().left < 38.6 &&  points) {
              rebound = true;
              sign = "subtract"
              end = 200;
            }
            if ($basketball.position().left - $("#basketballHoop").position().left > 56.6 && $basketball.position().left - $("#basketballHoop").position().left < 56.6 + 57 &&  points) {
              rebound = true;
              sign = "subtract"
              end = 200;
            }
          }
        }, 10)
      };
    }
    if (e.which == 39) {
      console.log(arrows)
      left += arrows;
      $basketball.css("left", left)
    }
    if (e.which == 37) {
      left -= arrows;
      $basketball.css("left", left)
    }
    if (e.which == 65) {
      debugger;
    }
  });

  function changeSign(first, second, sign) {
    if (sign == "add") {
      return first + second;
    } else {
      return first - second;
    }
  }
  function reset() {
    make = false;
    rebound = false;
    end = 100;
    points = true;
    interval = true;
    sign = "subtract"
    height = 100;
    width = 100;
    left = $(document).width() / 2.26;
    speed = 11;
    $basketball.css("left", left)
    $basketball.css("height", height)
    $basketball.css("width", width)
    $(".rim").css("z-index", -1)
  }
};
function setStorage(score, money, balls) {
  localStorage.setItem(player, JSON.stringify({score: score, money: money, balls: JSON.parse(localStorage[player]).balls}))
}
function setBallStorage(ball) {
  newBalls = JSON.parse(localStorage[player]).balls;
  newBalls.push(ball)
  localStorage.setItem(player, JSON.stringify({score: JSON.parse(localStorage[player]).score, money: JSON.parse(localStorage[player]).money, balls: newBalls}))
}
