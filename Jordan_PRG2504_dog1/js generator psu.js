window.onload = function() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };
    let prevImage = '';

    async function callApi(callUrl, callOptions) {
        try {
            const response = await fetch(callUrl, callOptions);
            const result = await response.text();
            const message = JSON.parse(result)
            prevImage = document.getElementById('imgDog').src;
            document.getElementById('imgDog').src = message.message;
        } catch (error) {
            console.error(error);
        }
    }

    // Funkce pro generování obrázku po kliknutí na tlačítko
    document.getElementById('generateBtn').addEventListener('click', function() {
        callApi(url, options);
    });

    // Funkce pro návrat na předchozí obrázek
    document.getElementById('backBtn').addEventListener('click', function() {
        if (prevImage) {
            document.getElementById('imgDog').src = prevImage;
        }
    });
}