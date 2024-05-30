
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("start").addEventListener("click", start);
  document.getElementById("resume").addEventListener("click", resume);
  document.getElementById("pause").addEventListener("click", pause);
  document.getElementById("reset").addEventListener("click", reset);
  document.getElementById("setting").addEventListener("click", goToSettings);
  document.getElementById("save").addEventListener("click", save);
  document.getElementById("newTime").addEventListener("keyup", function(event) {
    event.preventDefault();
    console.log(event.key);
    if (event.key === "Enter") {
      document.getElementById("save").click();
    }
  });
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

function goToSettings() {
  document.getElementById("timerDisplay").style.display = "none";
  document.getElementById("start").style.display = "none";
  document.getElementById("resume").style.display = "none";
  document.getElementById("pause").style.display = "none";
  document.getElementById("reset").style.display = "none";
  document.getElementById("setting").style.display = "none";
  document.getElementById("save").style.display = "inline";
  document.getElementById("newTime").style.display = "inline";
}

function save() {
  let newDuration = document.getElementById("newTime").value;
  // send newduration to background.js and change timer
  console.log(newDuration);
  document.getElementById("timerDisplay").style.display = "inline";
  document.getElementById("start").style.display = "inline";
  document.getElementById("resume").style.display = "inline";
  document.getElementById("pause").style.display = "inline";
  document.getElementById("reset").style.display = "inline";
  document.getElementById("setting").style.display = "inline";
  document.getElementById("save").style.display = "none";
  document.getElementById("newTime").style.display = "none";
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
