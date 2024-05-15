var timerDuration;
var startDate;
var dueDate;
var pauseDate;

// duration in milliseconds
function setTimer(duration) {
  timerDuration = duration;
}

// Starts timer, duration in milliseconds
function start(duration) {
  startDate = new Date();
  setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft = timerDuration - (Date.now() - startDate.getTime());
  setTimeout(ring, timeLeft)
}

function ring() {
  
}

function getTimeLeft() {
  return timerDuration
}

function pause() {

}

function reset() {
  
}