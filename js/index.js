var alarm = new Audio("https://www.myinstants.com/media/sounds/alarm.mp3");
var targetSeconds, breakSeconds;
var timerMinutes = 0;
var timerSeconds = 0;
var t;
var togglekey = false;

// setting the time duration click events.
$(".break-value").text("5");
$(".session-value").text("25");
$(".break-add").click(function() {
  if ($(".break-value").text() == '99') {
    $(".break-value").text('99');
  } else $(".break-value").text(parseInt($(".break-value").text()) + 1);
});
$(".break-minus").click(function() {
  if ($(".break-value").text() == '1') {
    $(".break-value").text('1');
  } else $(".break-value").text(parseInt($(".break-value").text()) - 1);
});
$(".session-add").click(function() {
  if ($(".session-value").text() == '99') {
    $(".session-value").text('99');
  } else {
    $(".session-value").text(parseInt($(".session-value").text()) + 1);
    $("#timer").text($(".session-value").text());
  }
});
$(".session-minus").click(function() {
  if ($(".session-value").text() == '1') {
    $(".session-value").text('1');
  } else {
    $(".session-value").text(parseInt($(".session-value").text()) - 1);
    $("#timer").text($(".session-value").text());
  }
})
$("#timer").text($(".session-value").text());

// timer function using the setTimeout to make everything work.
function timer() {

  timerMinutes = Math.floor(targetSeconds / 60);
  timerSeconds = targetSeconds % 60;

  if (timerSeconds <= 9) timerSeconds = "0" + timerSeconds;
  targetSeconds--;

  $("#timer").html(timerMinutes + ":" + timerSeconds);
  //alternating the session and break timers.
  if (targetSeconds !== -1) {
    t = setTimeout(timer, 1000);
  } else if (!togglekey) {
    alarm.play();
    togglekey = true;
    $("#label").text("Break");
    targetSeconds = $(".break-value").text() * 60;
    t = setTimeout(timer, 1000);
  } else {
    alarm.play();
    targetSeconds = $(".session-value").text() * 60;
    $("#label").text("Session");
    togglekey = false;

    resume();

  }
}

// calling the timer to stop.
function pause() {
  clearTimeout(t);
  $(".bottom-header").removeClass("disabledbutton");
}

//calling the timer to start.
function resume() {

  targetSeconds = $(".session-value").text() * 60;
  x = targetSeconds;
  breakSeconds = $(".break-value").text() * 60;
  t = setTimeout(timer, 1000);

  $(".bottom-header").addClass("disabledbutton");
}

// toggling the resume and pause functions.
$("#clock").on("click", function() {
  $(this).toggleClass('toggled');
  if ($(this).hasClass('toggled')) {
    resume();
  } else {
    pause();
  }
});