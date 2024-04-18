
const apiUrl = 'https://dog.ceo/api/breeds/image/random';


async function callApi(url, options) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.message; // Extract the image URL from the API response
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


async function fetchRandomDog() {
    const options = {
        method: 'GET'
    };

    try {
        const imageUrl = await callApi(apiUrl, options);

        if (imageUrl) {
            const imgElement = document.getElementById('imgDog');
            imgElement.src = imageUrl;
        } else {
            console.error('Failed to fetch image');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


window.onload = fetchRandomDog;
