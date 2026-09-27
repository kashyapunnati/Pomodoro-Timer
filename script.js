let timerInterval = null;
let isRunning = false;

let currentMode = "work";
let remainingSeconds = 25 * 60;

let completedSessions = 0;

const timer = document.getElementById("timer");
const timerMode = document.getElementById("timerMode");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const workDuration = document.getElementById("workDuration");
const breakDuration = document.getElementById("breakDuration");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");

const sessionCount = document.getElementById("sessionCount");

const savedWorkDuration = localStorage.getItem("workDuration");
const savedBreakDuration = localStorage.getItem("breakDuration");
const savedSessions = localStorage.getItem("completedSessions");

if (savedWorkDuration) {
    workDuration.value = savedWorkDuration;
}

if (savedBreakDuration) {
    breakDuration.value = savedBreakDuration;
}

if (savedSessions) {
    completedSessions = Number(savedSessions);
}

remainingSeconds = Number(workDuration.value) * 60;

updateTimerDisplay();
updateSessionCount();

startBtn.addEventListener("click", function () {

    if (isRunning) {
        return;
    }

    isRunning = true;

    timerInterval = setInterval(function () {

        remainingSeconds--;

        updateTimerDisplay();

        if (remainingSeconds <= 0) {
            switchMode();
        }

    }, 1000);
});

pauseBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;
    isRunning = false;
});

resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;
    isRunning = false;

    currentMode = "work";

    remainingSeconds = Number(workDuration.value) * 60;

    updateTimerMode();
    updateTimerDisplay();
});

saveSettingsBtn.addEventListener("click", function () {

    const work = Number(workDuration.value);
    const breakTime = Number(breakDuration.value);

    if (work <= 0 || breakTime <= 0) {
        alert("Please enter valid durations.");
        return;
    }

    localStorage.setItem("workDuration", work);
    localStorage.setItem("breakDuration", breakTime);

    clearInterval(timerInterval);

    timerInterval = null;
    isRunning = false;

    currentMode = "work";
    remainingSeconds = work * 60;

    updateTimerMode();
    updateTimerDisplay();

    alert("Settings saved successfully!");
});

function switchMode() {

    clearInterval(timerInterval);

    timerInterval = null;
    isRunning = false;

    notifyUser();

    if (currentMode === "work") {

        completedSessions++;

        localStorage.setItem(
            "completedSessions",
            completedSessions
        );

        updateSessionCount();

        currentMode = "break";

        remainingSeconds =
            Number(breakDuration.value) * 60;

    } else {

        currentMode = "work";

        remainingSeconds =
            Number(workDuration.value) * 60;
    }

    updateTimerMode();
    updateTimerDisplay();

    isRunning = true;

    timerInterval = setInterval(function () {

        remainingSeconds--;

        updateTimerDisplay();

        if (remainingSeconds <= 0) {
            switchMode();
        }

    }, 1000);
}

function updateTimerDisplay() {

    const minutes = Math.floor(
        remainingSeconds / 60
    );

    const seconds = remainingSeconds % 60;

    timer.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}

function updateTimerMode() {

    if (currentMode === "work") {
        timerMode.textContent = "Work Session";
    } else {
        timerMode.textContent = "Break Session";
    }
}

function updateSessionCount() {

    sessionCount.textContent = completedSessions;
}

function notifyUser() {

    if ("Notification" in window) {

        if (Notification.permission === "granted") {

            new Notification(
                currentMode === "work"
                    ? "Break completed!"
                    : "Work session completed!"
            );

        } else if (Notification.permission !== "denied") {

            Notification.requestPermission();
        }
    }

    alert(
        currentMode === "work"
            ? "Break completed! Time to work."
            : "Work session completed! Time for a break."
    );
}

if ("Notification" in window) {

    if (Notification.permission === "default") {
        Notification.requestPermission();
    }
}