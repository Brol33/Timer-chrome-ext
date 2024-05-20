var timerDuration;
var startDate;
var ringDate;
var pauseDate;
var timeLeft;
var alarmSound = new Audio("Alarm01.wav");

function setTimer(durationMs) {
  timerDuration = durationMs;
}

function startTimer(durationMs) {
  ringDate = new Date();
  var DurSeconds = parseInt((durationMs / 1000) % 60);
  var DurMinutes = parseInt((durationMs / (1000 * 60)) % 60);
  var DurHours = parseInt(durationMs / (1000 * 60 * 60));

  ringDate.setHours(ringDate.getHours() + DurHours);
  ringDate.setMinutes(ringDate.getMinutes() + DurMinutes);
  ringDate.setSeconds(ring.getSeconds() + DurSeconds);

  startDate = new Date();
  timeLeft = setTimeout(ring, ringDate - startDate)

  //setInterval(updateDisplayTimer, 1000);
}

function updateDisplayTimer() {
}

function ring() {
  alarmSound.play();
}

function getTimeLeft() {
  return timerDuration
}

function pause() {

}

function reset() {
  
}

function backgroundFunction () {
  return "hello from the background!"
}