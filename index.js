const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

//Song Titles
const songs = ["Ambarsariya Suit", "Qafirana LoFi", "Airee Sakhi" , "Afeemi Afeemi" , "Baari" , "Faded"];

//For keeping the track of the songs

let songIndex = 0;

//Loading the song in DOM
loadSong(songs[songIndex]);

//Updating the Song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `Music/${song}.mp3`;
}

/*Functions for the Event Listeners  */

//For playing and pausing the song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

//For changing the song next/prev

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//For updating the song progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

//To seek the song
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
/* Event Listeners */

//For Playing/Pausing
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//For the previous and next button

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//For audio progress updation

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);


audio.addEventListener('ended' , nextSong);