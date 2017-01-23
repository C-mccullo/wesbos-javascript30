const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })
	  .then(localMediaStream => {
	    console.log(localMediaStream);
	    video.src = window.URL.createObjectURL(localMediaStream);
	    video.play();
	  }).catch(err => {
	  	console.error(`DENIED!`, err);
	  });
} 

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageData(0, 0, width, height);
		//console.log(pixels);
		// Extract the pixels Array
		// pixels = redEffect(pixels);
		pixels = rgbSplit(pixels);
		ctx.globalAlpha = 0.4;

		// put the pixels array back
		ctx.putImageData(pixels, 0, 0);
		//debugger;
	}, 16);

}
// will extract the RGBA values from the photo simage object 
function redEffect(pixels) {
	for( let i =0; i < pixels.data.length; i += 4 ) {
		pixels.data[i + 0] = pixels.data[i + 0] + 175; // red value
		pixels[i + 1] = pixels.data[i + 1] - 50; // green value
		pixels[i + 2] = pixels.data[i + 2] * 0.5;// blue value
	}
	return pixels;
}

function rgbSplit(pixels) {
	for( let i =0; i < pixels.data.length; i += 4 ) {
		pixels.data[i - 200] = pixels.data[i + 0]; // red value
		pixels[i + 500] = pixels.data[i + 1]; // green value
		pixels[i - 550] = pixels.data[i + 2];// blue value
	}
	return pixels;
}

function greenScreen(pixels) {
	const levels = {};
	[...document.querySelector('.rgb input')].forEach((input) => {
		levels.[input.name] = input.value;
	});

	for (i = 0; i < pixels.data.length; i = i + 4) {
		red = pixels.data[i + 0];
		green = pixels.data[i + 1];
		blue = pixels.data[i + 2];
		alpha = pixels.data[i + 3];

		if ( red >= levels.rmin 
			&& green >= levels.gmin
			&& blue >= levels.bmin
			&& red <= levels.rmax
			&& green <= levels.gmax
			&& blue <= levels.bmax) {
			// take out the green!
			pixels.data[i + 3] = 0;
		}
	}
	return pixels;
}

function takePhoto() {
	snap.currentTime = 0;
	snap.play();
	// extract the data from the html canvas
	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'getsumHair');
	link.innerHTML = (`<img src="${data}" alt="get some hair!!" />`);
	strip.insertBefore(link, strip.firsChild);
}

getVideo();

video.addEventListener('canplay', paintToCanvas);

