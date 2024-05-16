window.onload = async function(){ 
    const api = 'https://dog.ceo/api/breeds/image/random/';
    let numberOfImagesToLoad = 10; // tady nastav hodnotu kolik obrazku se ma nacist
    const options = {
        method: 'GET'
    };
    let currentIndex = 0; 
    let images = []; 

    async function callApi(callUrl, callOptions) {
        try {
            const response = await fetch(callUrl, callOptions);
            const result = await response.json(); 
            return result.message;
        } catch (error) {
            console.error(error);
        }
    }

    async function preloadImages(numberOfImages) {
        const url = `${api}${numberOfImages}`;
        images = await callApi(url, options);
    }

    async function updateImage(index) {
        const imageUrl = images[index];
        document.getElementById('dog').src = imageUrl;
    }

    document.getElementById('predchozi').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; 
        updateImage(currentIndex);
    });

    document.getElementById('dalsi').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length; 
        updateImage(currentIndex);
    });

    
    await preloadImages(numberOfImagesToLoad);
    
    updateImage(currentIndex);
}