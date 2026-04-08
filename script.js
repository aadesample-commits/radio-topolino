const audio = document.getElementById('audio-player');
const trackTitle = document.getElementById('track-title');
const saveBtn = document.getElementById('save-local');
const userNameInput = document.getElementById('user-name');

// 1. Lista canzoni e durate (MODIFICA QUI CON I TUOI FILE)
const songs = [
    { name: "Canzone 1", url: "musica/Everyday.mp3", durata: 262 },
    { name: "Canzone 2", url: "musica/Rapp Snitch Knishes (feat. Mr. Fantastik).mp3", durata: 172 },
    { name: "Canzone 3", url: "musica/Flashing Lights.mp3", durata: 237 },
    { name: "Canzone 4", url: "musica/Father Stretch My Hands Pt. 1.mp3", durata: 135 },
    { name: "Canzone 5", url: "musica/No Role Modelz.mp3", durata: 293 },
    { name: "Canzone 6", url: "musica/It Was A Good Day.mp3", durata: 260 },
    { name: "Canzone 7", url: "musica/Drake - Passionfruit.mp3", durata: 299 },
    { name: "Canzone 8", url: "musica/Bob Marley - Could You Be Loved (HQ).mp3", durata: 235 },
    { name: "Canzone 9", url: "musica/Drake - Time Flies (Lyrics).mp3", durata: 192 },
    { name: "Canzone 10", url: "musica/Nirvana - Smells Like Teen Spirit (Official Music Video).mp3", durata: 278 },
    { name: "Canzone 11", url: "musica/Ray Charles - Hit The Road Jack (Official Lyrics Video).mp3", durata: 122 },
    { name: "Canzone 12", url: "musica/CULO.mp3", durata: 177 },
    { name: "Canzone 13", url: "musica/DONNE RICCHE - TonyPitony | ACOUSTIC VERSION.mp3", durata: 172 },
    { name: "Canzone 14", url: "musica/STRISCIA.mp3", durata: 205 },
    { name: "Canzone 15", url: "musica/Fabri Fibra-Stavo pensando a te.mp3", durata: 266 },







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
