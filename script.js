window.onload = function() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };

    async function callApi(callUrl, callOptions) {
        try {
            const response = await fetch(callUrl, callOptions);
            const result = await response.json();
            document.getElementById('imgDog').src = result.message;
        } catch (error) {
            console.error(error);
        }
    }

    document.getElementById('refreshButton').addEventListener('click', function() {
        window.location.reload();
    });

    // Call the API function with the defined URL and options
    callApi(url, options);
}
