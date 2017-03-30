let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const customForm = document.customForm;
// 🔥🔥🔥 if HTML element has a name attribute of "elementName, 
// it can be access using document.elementName 🔥🔥🔥

function timer(seconds) {
	// clear all existing intervals when timer function is run again
	clearInterval(countdown);

	const now = Date.now();
	const end = now + seconds * 1000; // because now will be in milliseconds

	displayTimeLeft(seconds);
	displayEndTime(end);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((end - Date.now()) / 1000);
		// NOTE: returning when secondsLeft is equal or less than zero will not stop the interval from running
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
};

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
	// document.title = HTML title tag
	document.title = display;
	timerDisplay.textContent = display;
};

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();

	endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));

customForm.addEventListener("submit", function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
});