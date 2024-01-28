const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");

let interval = 0;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function startSwitchColor() {
    startBtn.disabled = true;
    interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopSwitchColor() {
    startBtn.disabled = false;
    clearInterval(interval);
}

startBtn.addEventListener("click", startSwitchColor);
stopBtn.addEventListener("click", stopSwitchColor);