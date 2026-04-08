const audio = document.getElementById('audio-player');
const trackTitle = document.getElementById('track-title');
const saveBtn = document.getElementById('save-local');
const userNameInput = document.getElementById('user-name');

// 1. Lista canzoni e durate
// NOTA: Assicurati che i file nella cartella "musica" abbiano ESATTAMENTE questi nomi
const songs = [
    { name: "Everyday", url: "musica/Everyday.mp3", durata: 262 },
    { name: "Rapp Snitch Knishes", url: "musica/Rapp Snitch Knishes (feat. Mr. Fantastik).mp3", durata: 172 },
    { name: "Flashing Lights", url: "musica/Flashing Lights.mp3", durata: 237 },
    { name: "Father Stretch My Hands Pt. 1", url: "musica/Father Stretch My Hands Pt. 1.mp3", durata: 135 },
    { name: "No Role Modelz", url: "musica/No Role Modelz.mp3", durata: 293 },
    { name: "It Was A Good Day", url: "musica/It Was A Good Day.mp3", durata: 260 },
    { name: "Passionfruit", url: "musica/Drake - Passionfruit.mp3", durata: 299 },
    { name: "Could You Be Loved", url: "musica/Bob Marley - Could You Be Loved (HQ).mp3", durata: 235 },
    { name: "Time Flies", url: "musica/Drake - Time Flies (Lyrics).mp3", durata: 192 },
    { name: "Smells Like Teen Spirit", url: "musica/Nirvana - Smells Like Teen Spirit (Official Music Video).mp3", durata: 278 },
    { name: "Hit The Road Jack", url: "musica/Ray Charles - Hit The Road Jack (Official Lyrics Video).mp3", durata: 122 },
    { name: "CULO", url: "musica/CULO.mp3", durata: 177 },
    { name: "DONNE RICCHE", url: "musica/DONNE RICCHE - TonyPitony | ACOUSTIC VERSION.mp3", durata: 172 },
    { name: "STRISCIA", url: "musica/STRISCIA.mp3", durata: 205 },
    { name: "Stavo pensando a te", url: "musica/Fabri Fibra-Stavo pensando a te.mp3", durata: 266 }
];

// 2. Funzione di Sincronizzazione Universale
function syncRadio() {
    const tempoTotale = songs.reduce((acc, s) => acc + s.durata, 0);
    const ora = new Date();
    
    // Calcolo preciso dei secondi passati dalla mezzanotte
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
    
    // Prova il play automatico (spesso bloccato dai browser senza interazione)
    audio.play().catch(() => {
        trackTitle.innerText = "Clicca Play per la diretta!";
    });
}

// 3. Funzioni di supporto e Memoria Locale
// Mostra la data corrente
document.getElementById('current-date').innerText = new Date().toLocaleDateString('it-IT', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});

// Salvataggio nome utente in local storage
saveBtn.addEventListener('click', () => {
    const name = userNameInput.value;
    localStorage.setItem('radio_user_name', name);
    alert("Nome salvato!");
});

window.onload = () => {
    syncRadio();
    // Recupera il nome salvato se esiste
    const savedName = localStorage.getItem('radio_user_name');
    if (savedName) {
        userNameInput.value = savedName;
    }
};

// Quando una canzone finisce, ricalcola la posizione per la prossima
audio.addEventListener('ended', () => {
    syncRadio();
});
