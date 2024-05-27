
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("start").addEventListener("click", start);
  document.getElementById("resume").addEventListener("click", resume);
  document.getElementById("pause").addEventListener("click", pause);
  document.getElementById("reset").addEventListener("click", reset);
  document.getElementById("setting").addEventListener("click", start);
});

function start() {  console.log("sending message to background start")
  chrome.runtime.sendMessage({ action: "start", duration: "6000" }, function(response) {
    console.log(response.message);
  });
};

function resume() {
  chrome.runtime.sendMessage({ action: "resume" });
}

function pause() {
  chrome.runtime.sendMessage({ action: "pause" });
}

function reset() {
  chrome.runtime.sendMessage({ action: "reset" });
}

function updateDisplay(remainingTime) {
  document.getElementById("timerDisplay").textContent = remainingTime;
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
