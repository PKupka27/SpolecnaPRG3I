window.onload = function(){
    const url = 'https://dog.ceo/api/breeds/image/random';
    let btnnxt = document.getElementById("sndCmd");
    let btnbck = document.getElementById("zpetCmd");
    let dogImageHistory = [];
    let currentImageIndex = -1;

    const options = {
        method: 'GET'
    };

    btnnxt.onclick = function() {
        callApi(url, { options });
    };

    btnbck.onclick = function() {
        callApiPrev(url, { options });
    };
    
    async function callApi(callUrl, callOptions) {
        try {
            const response = await fetch(callUrl, callOptions);
            const result = await response.text();
            const message = JSON.parse(result)
            dogImageHistory.push(message.message);
            currentImageIndex = dogImageHistory.length - 1;
            document.getElementById('dogImage').src = message.message;
            return message;
        } catch (error) {
            console.error(error);
        }
    }

    function callApiPrev(callUrl, callOptions) {
        if (previousDogImage !== null) {
            document.getElementById('dogImage').src = previousDogImage;
        } else {
            console.log('No previous image available.');
        }
    }
}