const audio = document.getElementById('audio-player');
const fileInput = document.getElementById('file-input');
const playlistUI = document.getElementById('playlist');
const trackTitle = document.getElementById('track-title');
const saveBtn = document.getElementById('save-local');
const userNameInput = document.getElementById('user-name');

let songs = [];
let currentIndex = 0;

// 1. Gestione Date
const dateDisplay = document.getElementById('current-date');
const oggi = new Date();
dateDisplay.innerText = oggi.toLocaleDateString('it-IT', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});

// 2. Caricamento e Playlist
fileInput.addEventListener('change', (e) => {
    songs = Array.from(e.target.files);
    renderPlaylist();
    if (songs.length > 0) playSong(0);
});

function renderPlaylist() {
    playlistUI.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = song.name;
        li.onclick = () => playSong(index);
        playlistUI.appendChild(li);
    });
}

function playSong(index) {
    currentIndex = index;
    const song = songs[currentIndex];
    const url = URL.createObjectURL(song);
    
    audio.src = url;
    trackTitle.innerText = song.name;
    audio.play();
}

// 3. Riproduzione Automatica
audio.addEventListener('ended', () => {
    currentIndex++;
    if (currentIndex < songs.length) {
        playSong(currentIndex);
    }
});

// 4. Local Storage per il nome
saveBtn.addEventListener('click', () => {
    const nome = userNameInput.value;
    if (nome) {
        localStorage.setItem('radio_user_name', nome);
        alert(`Nome salvato: ${nome}`);
    }
});

window.onload = () => {
    const savedName = localStorage.getItem('radio_user_name');
    if (savedName) userNameInput.value = savedName;
};