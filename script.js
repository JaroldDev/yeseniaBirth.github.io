const body = document.querySelector('body');
const imgElement = document.getElementById('birthday-image');
const audioElement = new Audio();
const playPauseBtn = document.getElementById('play-pause-btn');
const muteBtn = document.getElementById('mute-btn');
const seekSlider = document.getElementById('seek-slider');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
//agregar imagenes
const images = [
  'imgs/foto1.jpg',
  'imgs/foto2.jpg',
  'imgs/foto3.jpg',
  'imgs/foto4.jpg',
  "imgs/foto5.jpg",
  'imgs/foto6.jpg',
  'imgs/foto7.jpg',
  'imgs/foto8.jpg',
  'imgs/foto9.jpg',
  'imgs/foto10.jpg',
  'imgs/foto11.jpg',
  'imgs/foto12.jpg',
  'imgs/foto13.jpg',
  'imgs/foto14.jpg',
  'imgs/foto15.jpg',
  'imgs/foto16.jpg',
  'imgs/foto17.jpeg',
  'imgs/foto18.jpeg',
  'imgs/foto19.jpeg',
];
//agregar canciones
const songs = [
  'audio/audio1.mp3',
  'audio/song2.mp3',
  'audio/song3.mp3'
];

audioElement.src = songs[currentIndex];
audioElement.loop = true;

function toggleDarkMode() {
  body.classList.toggle('dark-mode');
}

function changeImage() {
  imgElement.style.opacity = 0; // Hacer que la imagen se desvanezca gradualmente
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    imgElement.src = images[currentIndex];
    imgElement.style.opacity = 1; // Hacer que la nueva imagen aparezca gradualmente
  }, 300); // Esperar medio segundo antes de cambiar la imagen
}

function playPauseAudio() {
  if (audioElement.paused) {
    audioElement.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    audioElement.pause();
    playPauseBtn.textContent = 'Play';
  }
}

function muteAudio() {
  audioElement.muted = !audioElement.muted;
  muteBtn.textContent = audioElement.muted ? 'Unmute' : 'Mute';
}

function changeSong(direction) {
  if (direction === 'next') {
    currentIndex = (currentIndex + 1) % songs.length;
  } else if (direction === 'prev') {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  }
  audioElement.src = songs[currentIndex];
  audioElement.play();
  playPauseBtn.textContent = 'Pause';
}

function updateSeekSlider() {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  seekSlider.value = progress;

  const currentMinutes = Math.floor(audioElement.currentTime / 60);
  const currentSeconds = Math.floor(audioElement.currentTime - currentMinutes * 60);
  const durationMinutes = Math.floor(audioElement.duration / 60);
  const durationSeconds = Math.floor(audioElement.duration - durationMinutes * 60);

  currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
}

function seekAudio() {
  const seekTo = audioElement.duration * (seekSlider.value / 100);
  audioElement.currentTime = seekTo;
}

function setVolume() {
  audioElement.volume = volumeSlider.value / 100;
}

document.addEventListener('DOMContentLoaded', () => {
  audioElement.play();
  playPauseBtn.textContent = 'Pause';
});

audioElement.addEventListener('timeupdate', updateSeekSlider);
audioElement.addEventListener('loadedmetadata', updateSeekSlider);
seekSlider.addEventListener('input', seekAudio);
volumeSlider.addEventListener('input', setVolume);
playPauseBtn.addEventListener('click', playPauseAudio);
muteBtn.addEventListener('click', muteAudio);
prevBtn.addEventListener('click', () => changeSong('prev'));
nextBtn.addEventListener('click', () => changeSong('next'));

setInterval(changeImage, 5000);
