window.onload = function() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };

    let lastImageUrl = '';

    async function callApi(callUrl, callOptions) {
        try {
            const response = await fetch(callUrl, callOptions);
            const result = await response.json();
            const currentImageUrl = document.getElementById('imgDog').src;
            if (currentImageUrl) {
                lastImageUrl = currentImageUrl;
            }
            document.getElementById('imgDog').src = result.message;
        } catch (error) {
            console.error(error);
        }
    }

    document.getElementById('refreshButton').addEventListener('click', function() {
        callApi(url, options);
    });

    document.getElementById('revertButton').addEventListener('click', function() {
        if (lastImageUrl) {
            const currentImageUrl = document.getElementById('imgDog').src;
            document.getElementById('imgDog').src = lastImageUrl;
            lastImageUrl = currentImageUrl;
        }
    });

    callApi(url, options);
}
