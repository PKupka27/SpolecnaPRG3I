window.onload = function() { 

    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };
    const imageHistory = [];
    let currentIndex = -1;

    async function callApi(callUrl, callOptions) {
        try {
            const response = await fetch(callUrl, callOptions);
            const result = await response.text();
            const message = JSON.parse(result);
            if (currentIndex === imageHistory.length - 1) {
                imageHistory.push(message.message);
            } else {
                imageHistory.splice(currentIndex + 1);
                imageHistory.push(message.message);
            }
            currentIndex++;
            document.getElementById('imgDog').src = message.message;
        } catch (error) {
            console.error(error);
        }
    }

    function generateRandomDogImage() {
        callApi(url, options);
    }

    function goBack() {
        if (currentIndex > 0) {
            currentIndex--;
            document.getElementById('imgDog').src = imageHistory[currentIndex];
        }
    }

    document.getElementById('generateBtn').addEventListener('click', generateRandomDogImage);
    document.getElementById('backBtn').addEventListener('click', goBack);
}