const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });
    video.srcObject = stream;
    await new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function detectFaceShape() {
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    // Example: Draw a shape around the detected face
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.rect(videoWidth / 4, videoHeight / 4, videoWidth / 2, videoHeight / 2);
    ctx.stroke();
}

startButton.addEventListener('click', () => {
    setupCamera();
    startButton.disabled = true;
    video.addEventListener('loadeddata', () => {
        detectFaceShape();
        video.play();
    });
});
