/* script.js */
function parseTime(timeStr) {
    const [minutes, seconds] = timeStr.split(":" ).map(Number);
    return minutes * 60 + seconds;
}

let workoutTime = parseTime(document.getElementById("workout-time").value);
let restTime = parseTime(document.getElementById("rest-time").value);
let cycleRestTime = parseTime(document.getElementById("cycle-rest-time").value);
let roundsPerCycle = parseInt(document.getElementById("rounds-per-cycle").value);
let cycleCount = parseInt(document.getElementById("cycles").value);

let currentRound = 1;
let currentCycle = 1;
let isWorkout = true;
let timer;
let timeRemaining = workoutTime;

const beep = new Audio('https://www.soundjay.com/button/beep-07.wav');

const timeDisplay = document.getElementById("time-display");
const roundDisplay = document.getElementById("round-display");
const cycleDisplay = document.getElementById("cycle-display");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const settingsButton = document.getElementById("settings-button");
const overlay = document.getElementById("overlay");

document.body.style.backgroundColor = "#9ACD32";

timer = null;

function startTimer() {
    if (!timer) {
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    stopTimer();
    currentRound = 1;
    currentCycle = 1;
    isWorkout = true;
    timeRemaining = workoutTime;
    document.body.style.backgroundColor = "#9ACD32";
    updateDisplay();
}

function updateTimer() {
    if (timeRemaining > 1) {
        timeRemaining--;
    } else {
        beep.play();
        if (isWorkout) {
            if (currentRound < roundsPerCycle) {
                isWorkout = false;
                timeRemaining = restTime;
                document.body.style.backgroundColor = "#FF6347";
            } else {
                if (currentCycle < cycleCount) {
                    currentCycle++;
                    currentRound = 1;
                    timeRemaining = cycleRestTime;
                    isWorkout = false;
                    document.body.style.backgroundColor = "#FF6347";
                } else {
                    resetTimer();
                    return;
                }
            }
        } else {
            isWorkout = true;
            currentRound++;
            timeRemaining = workoutTime;
            document.body.style.backgroundColor = "#9ACD32";
        }
        beep.play();
    }
    updateDisplay();
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(timeRemaining);
    roundDisplay.textContent = `ラウンド: ${currentRound}/${roundsPerCycle}`;
    cycleDisplay.textContent = `サイクル: ${currentCycle}/${cycleCount}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

settingsButton.addEventListener("click", () => {
    overlay.style.display = "block";
});

document.getElementById("save-settings").addEventListener("click", () => {
    workoutTime = parseTime(document.getElementById("workout-time").value);
    restTime = parseTime(document.getElementById("rest-time").value);
    cycleRestTime = parseTime(document.getElementById("cycle-rest-time").value);
    roundsPerCycle = parseInt(document.getElementById("rounds-per-cycle").value);
    cycleCount = parseInt(document.getElementById("cycles").value);
    resetTimer();
    overlay.style.display = "none";
});

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();