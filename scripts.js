let timer;
let seconds = 0;

document.getElementById('detailsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('wodSection').style.display = 'block';
    document.getElementById('detailsForm').style.display = 'none';
});

document.getElementById('startStopButton').addEventListener('click', function() {
    if (this.textContent === 'Iniciar') {
        startTimer();
        this.textContent = 'Detener';
    } else {
        stopTimer();
        this.textContent = 'Iniciar';
    }
});

document.getElementById('resetButton').addEventListener('click', resetTimer);

document.querySelectorAll('.check').forEach(checkbox => {
    checkbox.addEventListener('change', checkCompletion);
});

document.getElementById('captureResults').addEventListener('click', captureResults);

function startTimer() {
    timer = setInterval(function() {
        seconds++;
        document.getElementById('time').textContent = formatTime(seconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    document.getElementById('time').textContent = '00:00';
    document.getElementById('startStopButton').textContent = 'Iniciar';
}

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function checkCompletion() {
    const allChecked = Array.from(document.querySelectorAll('.check')).every(checkbox => checkbox.checked);
    if (allChecked) {
        stopTimer();
        document.getElementById('startStopButton').textContent = 'Iniciar';
    }
}

function captureResults() {
    const athleteName = document.getElementById('athleteName').value;
    const judgeName = document.getElementById('judgeName').value;
    const completedReps = Array.from(document.querySelectorAll('.check')).filter(checkbox => checkbox.checked).length;

    alert(`Atleta: ${athleteName}\nJuez: ${judgeName}\nRepeticiones completadas: ${completedReps}\nTiempo: ${formatTime(seconds)}`);
    html2canvas(document.body).then(function(canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `resultados_${athleteName}.png`;
        link.click();
    });
}
