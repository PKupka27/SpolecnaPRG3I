let dogImages = [];
let currentIndex = -1;

function getRandomDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const newImageUrl = data.message;

            // Add the new image URL to the array and update the current index
            dogImages.push(newImageUrl);
            currentIndex = dogImages.length - 1;

            // Display the new image
            displayDogImage(newImageUrl);
        })
        .catch(error => console.error('Chyba při načítání obrázku:', error));
}

function showPreviousDog() {
    if (currentIndex > 0) {
        currentIndex--;
        displayDogImage(dogImages[currentIndex]);
    } else {
        console.log('Žádný předchozí obrázek není dostupný.');
    }
}

function displayDogImage(url) {
    const dogImageElement = document.createElement('img');
    dogImageElement.src = url;
    const dogImageContainer = document.getElementById('dogImageContainer');
    dogImageContainer.innerHTML = '';
    dogImageContainer.appendChild(dogImageElement);
}

window.onload = getRandomDog;
