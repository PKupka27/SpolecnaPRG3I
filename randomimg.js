document.getElementById('btnGetDog').addEventListener('click', function () {
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

    callApi(url, options);
});