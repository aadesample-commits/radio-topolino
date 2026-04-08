const audio = document.getElementById('audio-player');
const trackTitle = document.getElementById('track-title');
const saveBtn = document.getElementById('save-local');
const userNameInput = document.getElementById('user-name');

// 1. Lista canzoni e durate (MODIFICA QUI CON I TUOI FILE)
const songs = [
    { name: "Canzone 1", url: "musica/nome_file_1.mp3", durata: 180 },
    { name: "Canzone 2", url: "musica/nome_file_2.mp3", durata: 210 }
];

// 2. Funzione di Sincronizzazione
function syncRadio() {
    const tempoTotale = songs.reduce((acc, s) => acc + s.durata, 0);
    const ora = new Date();
    // Secondi passati dalla mezzanotte
    const secondiOggi = (ora.getHours() * 3600) + (ora.getMinutes() * 60) + ora.getSeconds();
    let tempoRelativo = secondiOggi % tempoTotale;
    
    let accumulato = 0;
    for (let i = 0; i < songs.length; i++) {
        if (tempoRelativo < accumulato + songs[i].durata) {
            const secondoInizio = tempoRelativo - accumulato;
            avviaDiretta(i, secondoInizio);
            break;
        }
        accumulato += songs[i].durata;
    }
}

function avviaDiretta(index, startTime) {
    const song = songs[index];
    audio.src = song.url;
    audio.currentTime = startTime;
    trackTitle.innerText = "LIVE: " + song.name;
    audio.play().catch(() => {
        trackTitle.innerText = "Clicca Play per la diretta!";
    });
}

// 3. Data e Local Storage
document.getElementById('current-date').innerText = new Date().toLocaleDateString('it-IT', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem('radio_user_name', userNameInput.value);
});

window.onload = () => {
    syncRadio();
    userNameInput.value = localStorage.getItem('radio_user_name') || "";
};

// Ricontrolla la posizione ogni volta che un brano finisce
audio.addEventListener('ended', syncRadio);
