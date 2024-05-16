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

    // Pokud se vrátíme zpět o několik obrázků, tak až znovu stiskneme Next, tak už se načtou ale nové obrázky!

    function callApiPrev() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            document.getElementById('dogImage').src = dogImageHistory[currentImageIndex];
        } else {
            console.log('Žádný předchozí img.');
        }
    }
}