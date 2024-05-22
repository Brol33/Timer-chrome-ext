var timerDuration;
var startDate;
var ringDate;
var pauseDate;
var timeLeft;

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
  ringDate.setSeconds(ringDate.getSeconds() + DurSeconds);

  startDate = new Date();
  timeLeft = setTimeout(ring, ringDate - startDate)

  //setInterval(updateDisplayTimer, 1000);
}

function updateDisplayTimer() {
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
    justification: "testing"
  });
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

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.action) {
      case "start":
        startTimer(request.duration);
        sendResponse({message:"started timer"});
        break;
      case "pause":
        pause()
        break;
      
    }
  }
);
