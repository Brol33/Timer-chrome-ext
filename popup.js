
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

chrome.runtime.onMessage.addListener(
  // change switch to if, if theres only 1 case
  function(message, sender, sendResponse) {
    switch (message.action) {
      case "updateDisplay":
        console.log("received updateDisplay");
        console.log(message.time);
        updateDisplay(message.time);
        break;
    }
  }
)

//display resume when start is pressed and vice versa
function start() {  
  chrome.runtime.sendMessage({ action: "start" }, function(response) {
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
  toggleElementVisibility("timerDisplay", false);
  toggleElementsVisibility(["start", "resume", "pause", "reset", "setting"], false);
  toggleElementsVisibility(["newTime", "save"], true);
}

function save() {
  let newDuration = document.getElementById("newTime").value;
  chrome.runtime.sendMessage({ action: "changeTimer", duration: newDuration });
  toggleElementVisibility("timerDisplay", true);
  toggleElementsVisibility(["start", "resume", "pause", "reset", "setting"], true);
  toggleElementsVisibility(["save", "newTime"], false);
}

function toggleElementVisibility(elementId, visible) {
  document.getElementById(elementId).style.display = visible ? "inline" : "none";
}

function toggleElementsVisibility(elementIds, visible) {
  elementIds.array.forEach(id => toggleElementVisibility(id, visible));
}

