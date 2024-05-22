
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("start").addEventListener("click", start);
});

function start() {
  console.log("sending message to background start")
  chrome.runtime.sendMessage({action: "start", duration: "3000"}, function(response) {
    console.log(response.message);
  });
};

