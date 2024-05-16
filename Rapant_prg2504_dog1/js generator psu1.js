let previousImages = [];
let generatedImages = 0;

async function callApi(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Chyba při volání API:', error);
        return null;
    }
}

async function getRandomDog() {
    if (generatedImages >= 10) {
        alert("Bylo vygenerováno maximální množství obrázků.");
        return;
    }

    const apiUrl = 'https://dog.ceo/api/breeds/image/random';
    const data = await callApi(apiUrl);
    if (data && data.message) {
        const dogImageURL = data.message;
        previousImages.push(dogImageURL);
        displayImage(dogImageURL);
        generatedImages++;
    }
}

function displayImage(url) {
    const dogImageElement = document.createElement('img');
    dogImageElement.src = url;
    document.getElementById('dogImageContainer').innerHTML = '';
    document.getElementById('dogImageContainer').appendChild(dogImageElement);
}

function returnPrevious() {
    if (previousImages.length === 0) {
        alert("Nejsou k dispozici žádné předchozí obrázky.");
        return;
    }
    displayImage(previousImages.pop());
    generatedImages--;
}
