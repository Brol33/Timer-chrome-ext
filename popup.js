
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("start").addEventListener("click", start);
  document.getElementById("resume").addEventListener("click", start);
  document.getElementById("pause").addEventListener("click", start);
  document.getElementById("reset").addEventListener("click", start);
});

function start() {
  console.log("sending message to background start")
  chrome.runtime.sendMessage({ action: "start", duration: "3000" }, function(response) {
    console.log(response.message);
  });
};

function pause() {
  chrome.runtime.sendMessage({ action: "pause" });
}

function reset() {
  chrome.runtime.sendMessage({ action: "reset" });
}

function updateDisplay(remainingTime) {
  let seconds = Math.ceil(remainingTime / 1000);
  let minutes = Math.floor(remainingTime / (1000 * 60));
  let hours = Math.floor(remainingTime / (1000 * 60 * 60));
  console.log("time")
  console.log(remainingTime)
  console.log(seconds)
  console.log(minutes)
  console.log(hours)
  console.log("time")
  if (seconds < 10) {
    
  }
  document.getElementById("timerDisplay").textContent = 
}

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message.action === "updateDisplay") {
      console.log("received updateDisplay");
      console.log(message.time);
      updateDisplay(message.time);
    }
  }
)
