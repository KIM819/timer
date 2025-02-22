document.addEventListener("DOMContentLoaded", function () {
    let workoutTime = 30; // 初期ワークアウト時間（秒）
    let restTime = 10; // 初期休憩時間（秒）
    let cycleRestTime = 60; // 初期サイクル間休憩時間（秒）
    let totalRounds = 5; // 1サイクルのラウンド数
    let totalCycles = 3; // 総サイクル数

    let remainingRounds = totalRounds;
    let remainingCycles = totalCycles;
    let isRunning = false;
    let timer;
    let totalRemainingTime = (workoutTime * totalRounds + restTime * (totalRounds - 1)) * totalCycles + (totalCycles - 1) * cycleRestTime;

    const timerDisplay = document.querySelector("#timer-display");
    const totalCountdown = document.querySelector("#total-countdown");
    const phaseTitle = document.querySelector("#current-phase");
    const remainingRoundsDisplay = document.querySelector("#remaining-rounds");
    const remainingCyclesDisplay = document.querySelector("#remaining-cycles");

    const startButton = document.querySelector("#start-btn");
    const stopButton = document.querySelector("#stop-btn");
    const resetButton = document.querySelector("#reset-btn");
    const settingsButton = document.querySelector("#settings-btn");
    const saveSettingsButton = document.querySelector("#save-settings");
    const closeSettingsButton = document.querySelector("#close-settings");
    const settingsModal = document.querySelector("#settings-modal");

    let currentPhase = "workout";
    let timeLeft = workoutTime;

    function updateDisplay() {
        if (timeLeft > 0) {
            let minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            let seconds = String(timeLeft % 60).padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
        }

        let totalMinutes = String(Math.floor(totalRemainingTime / 60)).padStart(2, '0');
        let totalSeconds = String(totalRemainingTime % 60).padStart(2, '0');
        totalCountdown.textContent = `全体残り時間: ${totalMinutes}:${totalSeconds}`;

        remainingRoundsDisplay.textContent = `ラウンド: ${remainingRounds}`;
        remainingCyclesDisplay.textContent = `サイクル: ${remainingCycles}`;
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;

        updateDisplay(); // **即座に現在の時間を表示**

        timer = setInterval(() => {
            if (timeLeft === 1) { // **0秒の表示を防ぐ**
                totalRemainingTime--;
                switchPhase();
            } else {
                timeLeft--;
                totalRemainingTime--;
            }
            updateDisplay();
        }, 1000);
    }

    function switchPhase() {
        if (currentPhase === "workout") {
            remainingRounds--;

            if (remainingRounds > 0) {
                // 通常のラウンドの休憩に入る
                currentPhase = "rest";
                timeLeft = restTime;
                phaseTitle.textContent = "休憩";
                document.body.className = "rest";
            } else {
                // **サイクルの最後の休憩をスキップし、サイクル休憩へ移行**
                remainingCycles--;
                if (remainingCycles <= 0) {
                    endWorkout(); // **すべて終了時に「終了」と表示**
                    return;
                }
                remainingRounds = totalRounds;
                currentPhase = "cycle-rest";
                timeLeft = cycleRestTime;
                phaseTitle.textContent = "サイクル休憩";
                document.body.className = "cycle-rest";
            }
        } else {
            // 休憩後はワークアウトへ
            currentPhase = "workout";
            timeLeft = workoutTime;
            phaseTitle.textContent = "ワークアウト";
            document.body.className = "workout";
        }
    }

    function endWorkout() {
        clearInterval(timer);
        isRunning = false;
        timeLeft = 0;
        totalRemainingTime = 0;
        phaseTitle.textContent = "終了";
        timerDisplay.textContent = "00:00";
        totalCountdown.textContent = "全体残り時間: 00:00";
        document.body.className = "finished";
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        remainingRounds = totalRounds;
        remainingCycles = totalCycles;
        timeLeft = workoutTime;
        totalRemainingTime = (workoutTime * totalRounds + restTime * (totalRounds - 1)) * totalCycles + (totalCycles - 1) * cycleRestTime;
        currentPhase = "workout";
        phaseTitle.textContent = "ワークアウト";
        document.body.className = "workout";
        updateDisplay();
    }

    function applySettings() {
        let workoutInput = document.querySelector("#workout-time").value.split(":");
        let restInput = document.querySelector("#rest-time").value.split(":");
        let cycleRestInput = document.querySelector("#cycle-rest-time").value.split(":");

        workoutTime = parseInt(workoutInput[0]) * 60 + parseInt(workoutInput[1]);
        restTime = parseInt(restInput[0]) * 60 + parseInt(restInput[1]);
        cycleRestTime = parseInt(cycleRestInput[0]) * 60 + parseInt(cycleRestInput[1]);
        totalRounds = parseInt(document.querySelector("#rounds").value);
        totalCycles = parseInt(document.querySelector("#cycles").value);

        resetTimer();
    }

    startButton.addEventListener("click", startTimer);
    stopButton.addEventListener("click", () => { clearInterval(timer); isRunning = false; });
    resetButton.addEventListener("click", resetTimer);

    settingsButton.addEventListener("click", () => {
        settingsModal.style.display = "block";
    });

    closeSettingsButton.addEventListener("click", () => {
        settingsModal.style.display = "none";
    });

    saveSettingsButton.addEventListener("click", () => {
        applySettings();
        settingsModal.style.display = "none";
    });

    updateDisplay();
});

body.cycle-rest {
    background-color: #6699ff;
}
