let timers = {
    'Reading': { time: 0, interval: null },
    'Study': { time: 0, interval: null },
    'Exercise': { time: 0, interval: null }
};

function startTask(task) {
    if (timers[task].interval) return; // If timer already running

    timers[task].interval = setInterval(() => {
        timers[task].time += 1;
        document.getElementById(`timer-${task.toLowerCase()}`).innerText = formatTime(timers[task].time);
    }, 1000);
}

function stopTask(task) {
    clearInterval(timers[task].interval);
    timers[task].interval = null;
    saveTime(task);
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function saveTime(task) {
    let today = new Date().toLocaleDateString();
    let log = JSON.parse(localStorage.getItem(today)) || {};
    log[task] = timers[task].time;
    localStorage.setItem(today, JSON.stringify(log));
}
