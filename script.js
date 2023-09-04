const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const player = document.querySelector(".player");

const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");

const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");

const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");

const fullScreenBtn = document.querySelector(".fullscreen");
const speed = document.querySelector(".player-speed");

let fullscreen = false;
// Play & Pause ----------------------------------- //

function showPlayIcon() {
	playBtn.classList.replace("fa-pause", "fa-play");
	playBtn.setAttribute("title", "Play");
}
function togglePlay() {
	if (video.paused) {
		video.play();
		playBtn.classList.replace("fa-play", "fa-pause");
		playBtn.setAttribute("title", "Pause");
	} else {
		video.pause();
		showPlayIcon();
	}
}
video.addEventListener("ended", showPlayIcon);

// Progress Bar ---------------------------------- //

// calculate display time
function displayTime(time) {
	const minutes = Math.floor(time / 60);
	let seconds = Math.floor(time % 60);
	seconds = seconds < 10 ? `0${seconds}` : seconds;
	return `${minutes}:${seconds}`;
}
function updateProgress() {
	progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;

	currentTime.textContent = `${displayTime(video.currentTime)} / `;
	duration.textContent = `${displayTime(video.duration)}`;
}
// click to seek video
function setProgresss(e) {
	/**
	 * offsetX is the position where we clicked on the progress bar
	 *
	 * offsetWidth is the total length of the parent i.e progress range.
	 */
	const newtime = e.offsetX / progressRange.offsetWidth;
	// set the width to the new time
	progressBar.style.width = `${newtime * 100}%`;
	// set the current time of the video
	video.currentTime = newtime * video.duration;
}

// Volume Controls --------------------------- //
let lastVolume = 1;

function changeVolume(e) {
	let volume = e.offsetX / volumeRange.offsetWidth;

	// rounding up volume up and down value
	if (volume < 0.1) volume = 0;
	if (volume > 0.9) volume = 1;

	volumeBar.style.width = `${volume * 100}%`;
	video.volume = volume;

	// chnage icon depending on volume
	volumeIcon.className = "";
	if (volume > 0.7) {
		volumeIcon.classList.add("fas", "fa-volume-up");
	} else if (volume < 0.7 && volume > 0) {
		volumeIcon.classList.add("fas", "fa-volume-down");
	} else if (volume === 0) volumeIcon.classList.add("fas", "fa-volume-off");
	lastVolume = volume;
}
// mute / unmute
function toggleMute() {
	volumeIcon.className = "";
	if (video.volume) {
		lastVolume = video.volume;
		video.volume = 0;
		volumeBar.style.width = 0;
		volumeIcon.classList.add("fas", "fa-volume-mute");
	} else {
		video.volume = lastVolume;
		volumeBar.style.width = `${lastVolume * 100}%`;
		volumeIcon.classList.add("fas", "fa-volume-up");
	}
}
// Change Playback Speed -------------------- //
function changeSpeed() {
	// console.log(video.playbackRate, speed.value);
	video.playbackRate = speed.value;
}
// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE11 */
		elem.msRequestFullscreen();
	}
	video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		/* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		/* IE11 */
		document.msExitFullscreen();
	}
	video.classList.remove("video-fullscreen");
}
function toggleFullScreen() {
	if (!fullscreen) {
		openFullscreen(player);
	} else {
		closeFullscreen();
	}
	fullscreen = !fullscreen;
}

// Eventlistner
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);

progressRange.addEventListener("click", setProgresss);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);

speed.addEventListener("click", changeSpeed);
fullScreenBtn.addEventListener("click", toggleFullScreen);
