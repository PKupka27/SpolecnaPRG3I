window.onload = function(){ 

    const url = 'https://dog.ceo/api/breeds/image/random';
    const numberOfImages = 5; 
    let currentImageIndex = 0;
    let dogImages = [];

    async function fetchDogImages() {
        try {
            for (let i = 0; i < numberOfImages; i++) {
                const response = await fetch(url);
                const data = await response.json();
                dogImages.push(data.message);
            }
            displayCurrentImage();
        } catch (error) {
            console.error(error);
        }
    }

    function displayCurrentImage() {
        document.getElementById('imgDog').src = dogImages[currentImageIndex];
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = dogImages.length - 1;
        }
        displayCurrentImage();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentImageIndex < dogImages.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }
        displayCurrentImage();
    });

    fetchDogImages();
}
