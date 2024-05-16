const url = 'https://dog.ceo/api/breeds/image/random';
const options = {
    method: 'GET'
};
const numberOfImages = 10; 
const imageHistory = [];
let currentIndex = 0;

async function loadImages(count) {
    try {
        for (let i = 0; i < count; i++) {
            const response = await fetch(url, options);
            const result = await response.json();
            imageHistory.push(result.message);
        }
        document.getElementById('imgDog').src = imageHistory[currentIndex];
    } catch (error) {
        console.error(error);
    }
}


function nextImage() {
    if (currentIndex < imageHistory.length - 1) {
        currentIndex++;
        document.getElementById('imgDog').src = imageHistory[currentIndex];
    }
}


function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        document.getElementById('imgDog').src = imageHistory[currentIndex];
    }
}


function initializeEventListeners() {
    document.getElementById('nextBtn').addEventListener('click', nextImage);
    document.getElementById('prevBtn').addEventListener('click', prevImage);
}


window.onload = function() {
    loadImages(numberOfImages);
    initializeEventListeners();
}