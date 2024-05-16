var numberOfImages = 5;  // Definovaný počet fotek
var dogImages = [];
var currentIndex = 0;

function loadDogImages(count) {
    for (let i = 0; i < count; i++) {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => {
                dogImages[i] = data.message;
                if (i === 0) {
                    displayDogImage(dogImages[0]);
                }
            })
            .catch(error => console.error('Chyba při načítání obrázku:', error));
    }
}

function showPreviousDog() {
    if (currentIndex > 0) {
        currentIndex--;
        displayDogImage(dogImages[currentIndex]);
    } else {
        console.log('Žádný předchozí obrázek není dostupný.');
    }
}

function showNextDog() {
    if (currentIndex < dogImages.length - 1) {
        currentIndex++;
        displayDogImage(dogImages[currentIndex]);
    } else {
        console.log('Žádný další obrázek není dostupný.');
    }
}

function displayDogImage(url) {
    var dogImageElement = document.createElement('img');
    dogImageElement.src = url;
    var dogImageContainer = document.getElementById('dogImageContainer');
    dogImageContainer.innerHTML = '';
    dogImageContainer.appendChild(dogImageElement);
}

window.onload = function() {
    loadDogImages(numberOfImages);
};
