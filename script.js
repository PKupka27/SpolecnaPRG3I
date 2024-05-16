const apiUrl = 'https://dog.ceo/api/breeds/image/random';
const options = {
    method: 'GET'
};

let imageHistory = [];
let currentImageIndex = -1;

async function callApi(url, options) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function fetchRandomDog() {
    try {
        const imageUrl = await callApi(apiUrl, options);

        if (imageUrl) {
            
            imageHistory.push(imageUrl);
            currentImageIndex = imageHistory.length - 1;

            const imgElement = document.getElementById('imgDog');
            imgElement.src = imageUrl;
        } else {
            console.error('Failed to fetch image');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function goBack() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        const imgElement = document.getElementById('imgDog');
        imgElement.src = imageHistory[currentImageIndex];
    } else {
        console.log('No more previous images');
    }
}
