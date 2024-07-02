const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');
const shapeNameDiv = document.getElementById('shapeName');

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

    // Example: You would typically use a face detection library like face-api.js or TensorFlow.js for face detection and landmark detection
    // For demonstration purposes, a random shape is shown based on video dimensions
    const shape = getFaceShape(videoWidth, videoHeight); // Replace this with actual face detection logic
    shapeNameDiv.textContent = `Detected Shape: ${shape}`;
}

function getFaceShape(videoWidth, videoHeight) {
    // Example: Randomly return one of the shapes based on video dimensions
    if (videoWidth > videoHeight) {
        return 'Rectangle';
    } else {
        return 'Square';
    }
}

startButton.addEventListener('click', () => {
    setupCamera();
    startButton.disabled = true;
    video.addEventListener('loadeddata', () => {
        detectFaceShape();
        video.play();
    });
});

