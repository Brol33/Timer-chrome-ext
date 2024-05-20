var background = chrome.extension.getBackgroundPage();

document.getElementById("start").addEventListener("click", start)

function start() {
  background.startTimer(1000)
}

function getTimeLeft() {
  
}

console.log(background)