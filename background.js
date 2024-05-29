var timerDuration;
var startDate;
var ringDate;
var pauseDate;
var timerId;
var timeLeft;
var intervalId;

function setTimer(durationMs) {
  timerDuration = durationMs;
}

function startTimer(durationMs) {
  // when start is clicked multiple times, it starts multiple timers. fix this
  ringDate = new Date();
  var DurSeconds = parseInt((durationMs / 1000) % 60);
  var DurMinutes = parseInt((durationMs / (1000 * 60)) % 60);
  var DurHours = parseInt(durationMs / (1000 * 60 * 60));

  ringDate.setHours(ringDate.getHours() + DurHours);
  ringDate.setMinutes(ringDate.getMinutes() + DurMinutes);
  ringDate.setSeconds(ringDate.getSeconds() + DurSeconds);

  startDate = new Date();
  timerId = setTimeout(ring, ringDate - startDate)
  intervalId = setInterval(function() {
    let currentTimeLeft = ringDate.getTime() - Date.now()
    updateDisplayTimer(currentTimeLeft);
    if (currentTimeLeft < 0) {
      clearInterval(intervalId)
    } 
  }, 1000);
}

function updateDisplayTimer(currentTime) {
  let totalSeconds = Math.ceil(currentTime / 1000);
  let seconds = totalSeconds % 60;
  let minutes = Math.floor(totalSeconds / 60) % 60;
  let hours = Math.floor(totalSeconds / 3600) % 60;
  console.log(seconds)
  console.log(minutes)
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;

  console.log("sending updatedisplay");
  chrome.runtime.sendMessage({ action: "updateDisplay", time: `${hours}:${minutes}:${seconds}` });
}

function getTimeLeft() {
  
}

function pause() {
  pauseDate = new Date();
  clearTimeout(timerId);
  clearInterval(intervalId);
  timerId = null;
  intervalId = null;
}

function reset() {

}

function resume() {
  timerDuration = ringDate.getTime() - pauseDate.getTime();
  console.log(timerDuration);
  console.log("resume");
  startTimer(timerDuration);
}

function backgroundFunction () {
  return "hello from the background!"
}

async function ring(source = "Alarm01.wav", volume = 1) {
  await createOffScreen();
  await chrome.runtime.sendMessage({ play: {source, volume}})
}

async function createOffScreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ['AUDIO_PLAYBACK'],
    justification: "ringAlarm"
  });
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.action) {
      case "start":
        startTimer(request.duration);
        sendResponse({message:"started timer"});
        break;
      case "resume":
        resume();
        break;
      case "pause":
        pause();
        break;
      case "reset":
        reset();
        break;
      
      
    }
  }
);
