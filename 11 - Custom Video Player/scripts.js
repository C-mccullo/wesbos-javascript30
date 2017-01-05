
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
	// use ternary operator instead of conditional statement!🔥🔥🔥 COOL!!!
	// if (video.paused) {
	// 	video.play()
	// } else {
	// 	video.pause();
	// }
};

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon; 
};

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
	video[this.name] = this.value;
};

function handleProgress() {
	const percent = (video.currentTime / video.duration) *100;
	progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullScreen() {
	if (!video.webkitDisplayingFullscreen) {
		video.webkitRequestFullscreen();
		console.log(video.webkitDisplayingFullscreen);
	} else {
		document.webkitExitFullscreen();
		console.log(video.webkitDisplayingFullscreen);
	}
}

let isFullScreen = false;

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('dblclick', fullScreen);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// flagging variable
let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', ()=> mouseDown = true);
progress.addEventListener('mouseup', ()=> mouseDown = false);

// make the video player go fullscreen on doubleclick event dblclick;