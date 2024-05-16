let dogImages = [];            //dogImages je pole, které uchovává URL všech načtených fotek psů.
let currentImageIndex = -1;        //currentImageIndex sleduje aktuálně zobrazenou fotku.

function getRandomDog() {       //Funkce getRandomDog přidá novou URL do pole dogImages a aktualizuje currentImageIndex.
    fetch('https://random.dog/woof.json')
        .then(response => response.json())
        .then(data => {
            const dogImageURL = data.url;
            dogImages.push(dogImageURL);
            currentImageIndex = dogImages.length - 1;
            displayDogImage(dogImageURL);                   //Funkce displayDogImage zobrazí obrázek na základě zadané URL.
        })
        .catch(error => console.error('Chyba při načítání obrázku psa:', error));
}

function previousImage() {               //Funkce previousImage a nextImage umožňují přepínání mezi uloženými obrázky.
    if (currentImageIndex > 0) {
        currentImageIndex--;
        const previousDogImageURL = dogImages[currentImageIndex];
        displayDogImage(previousDogImageURL);
    } else {
        console.log('Žádná předchozí fotka');
    }
}

function nextImage() {
    if (currentImageIndex < dogImages.length - 1) {
        currentImageIndex++;
        const nextDogImageURL = dogImages[currentImageIndex];
        displayDogImage(nextDogImageURL);
    } else {
        console.log('Žádná další fotka');
    }
}

function displayDogImage(url) {
    const dogImageElement = document.createElement('img');
    dogImageElement.src = url;
    const dogImageContainer = document.getElementById('dogImageContainer');
    dogImageContainer.innerHTML = '';
    dogImageContainer.appendChild(dogImageElement);
}