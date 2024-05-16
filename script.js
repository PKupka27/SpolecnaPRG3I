window.onload = function() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };
    const imageCount = Math.floor(Math.random() * 10) + 1; 
    let imageUrls = [];
    let currentIndex = 0;

    async function loadImages(count) {
        for (let i = 0; i < count; i++) {
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                imageUrls.push(result.message);
            } catch (error) {
                console.error(error);
            }
        }
        if (imageUrls.length > 0) {
            document.getElementById('imgDog').src = imageUrls[0];
        }
    }

    document.getElementById('nextButton').addEventListener('click', function() {
        if (currentIndex < imageUrls.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; //zpět na první
        }
        document.getElementById('imgDog').src = imageUrls[currentIndex];
    });

    document.getElementById('prevButton').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = imageUrls.length - 1; // zpět na poslední
        }
        document.getElementById('imgDog').src = imageUrls[currentIndex];
    });

    loadImages(imageCount);
}
