window.onload = function(){
    const url = 'https://dog.ceo/api/breeds/image/random';
    let btnnxt = document.getElementById("sndCmd");
    let btnbck = document.getElementById("zpetCmd");

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
            document.getElementById('dogImage').src = message.message;
            return message;
        } catch (error) {
            console.error(error);
        }
    }

    async function callApiPrev(callUrl, callOptions) {
        try {
            const response = await fetch(callUrl, callOptions);
            const result = await response.text();
            const message = JSON.parse(result)
            document.getElementById('dogImage').src = message.message;
            return message;
        } catch (error) {
            console.error(error);
        }
    }
}