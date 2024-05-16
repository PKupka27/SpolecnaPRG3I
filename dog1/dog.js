window.onload = function(){ 

    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
    method: 'GET'
};

let previousImageUrl = null; 

async function callApi(callUrl, callOptions) {
    try {
        const response = await fetch(callUrl, callOptions);
        const result = await response.text();
        const message = JSON.parse(result);

        
        previousImageUrl = document.getElementById('dog').src;

        document.getElementById('dog').src = message.message;
        return null;
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('button').addEventListener('click', async function() {
    await callApi(url, options);
});


document.getElementById('backButton').addEventListener('click', function() {
    if (previousImageUrl) {
        document.getElementById('dog').src = previousImageUrl;
    }
});

    
}