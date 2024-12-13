import Timer from './timer.js'

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beat');
const addBeats = document.querySelector('.add-beat');
const measureCount = document.querySelector('.measure-count');

const click1 = new Audio('Assets/strongbeat.mp3');
const click2 = new Audio('Assets/weakbeat.mp3');

let bpm = 120;
let beatsPerMeasure = 0;
let count = 0;
let isRunning = false;
let tempoTextString = 'Allegro'

decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 15) { return }
    bpm--;
    updateMetronome()
});

increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 225) { return }
    bpm++;
    updateMetronome()
});

tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    updateMetronome()
});

subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 0) { return }
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    if (count >= beatsPerMeasure) {
        count = 0;
    } else { return }
});

addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 16) { return }
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    if (count >= beatsPerMeasure) {
        count = 0;
    } else { return }
});

startStopBtn.addEventListener('click', () => {
    count = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP'
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START'
    }
})

function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;

    if (bpm <= 24) { tempoTextString = "Larghissimo" };
    if (bpm > 24 && bpm <= 40) { tempoTextString = "Grave" };
    if (bpm > 40 && bpm <= 45) { tempoTextString = "Lento" };
    if (bpm > 45 && bpm <= 55) { tempoTextString = "Largo" };
    if (bpm > 55 && bpm <= 65) { tempoTextString = "Adagio" };
    if (bpm > 65 && bpm <= 70) { tempoTextString = "Adagietto" };
    if (bpm > 70 && bpm <= 80) { tempoTextString = "Andante" };
    if (bpm > 80 && bpm <= 97) { tempoTextString = "Moderato" };
    if (bpm > 97 && bpm <= 109) { tempoTextString = "Allegretto" };
    if (bpm > 109 && bpm <= 115) { tempoTextString = "Moderato" };
    if (bpm > 115 && bpm <= 132) { tempoTextString = "Allegro" };
    if (bpm > 132 && bpm <= 156) { tempoTextString = "Allegro vivace" };
    if (bpm > 156 && bpm <= 168) { tempoTextString = "Vivace" };
    if (bpm > 168 && bpm <= 200) { tempoTextString = "Presto" };
    if (bpm > 200) { tempoTextString = "Prestissimo" };

    tempoText.textContent = tempoTextString;
}

function playClick() {
    console.log(count);
    if (count === beatsPerMeasure) {
        count = 0;
    }
    if (count === 0) {
        click1.play();
        click1.currentTime = 0;
    } else {
        click2.play();
        click2.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });

