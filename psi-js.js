let previousDogImageURL = null;
let currentDogImageURL = null;

function getRandomDog() {
    fetch('https://random.dog/woof.json')
        .then(response => response.json())
        .then(data => {
            previousDogImageURL = currentDogImageURL;
            currentDogImageURL = data.url;
            displayDogImage(currentDogImageURL);
        })
        .catch(error => console.error('Chyba při načítání obrázku psa:', error));
}

function goBack() {
    if (previousDogImageURL) {
        displayDogImage(previousDogImageURL);
        currentDogImageURL = previousDogImageURL;
        previousDogImageURL = null;  // Prevent going back again
    } else {
        console.log('Žádná předchozí fotka');
    }
}

function displayDogImage(url) {
    const dogImageElement = document.createElement('img');
    dogImageElement.src = url;
    const dogImageContainer = document.getElementById('dogImageContainer');
    dogImageContainer.innerHTML = '';
    dogImageContainer.appendChild(dogImageElement);
}