const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");

const playBtn = document.getElementById("play-btn");
const volumeIcom = document.getElementById("volume-icon");

const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");

const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");

const fullscreen = document.querySelector(".fullscreen");

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
	// console.log("currenttime", video.currentTime, "duration", video.duration);
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

	console.log(video.currentTime);
}

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// Eventlistner
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);

progressRange.addEventListener("click", setProgresss);
