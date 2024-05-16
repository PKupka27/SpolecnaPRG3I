let imageIndex = 0;
let imageUrls = [];

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

async function loadImages() {
    const apiUrl = 'https://dog.ceo/api/breeds/image/random/5'; // Načte 5 obrázků
    const data = await callApi(apiUrl);
    if (data && data.message) {
        imageUrls = data.message;
        displayImage(imageIndex);
    }
}

function displayImage(index) {
    const imageUrl = imageUrls[index];
    const dogImageContainer = document.getElementById('dogImageContainer');
    dogImageContainer.innerHTML = '';
    const dogImageElement = document.createElement('img');
    dogImageElement.src = imageUrl;
    dogImageContainer.appendChild(dogImageElement);
}

function showPrevious() {
    imageIndex = (imageIndex - 1 + imageUrls.length) % imageUrls.length;
    displayImage(imageIndex);
}

function showNext() {
    imageIndex = (imageIndex + 1) % imageUrls.length;
    displayImage(imageIndex);
}
