window.onload = function(){
    const url = 'https://dog.ceo/api/breeds/image/random';
    let btn = document.getElementById("sndCmd");

    const options = {
        method: 'GET'
    };

    btn.onclick = function() {
        callApi(url, { options });
    };
    
    async function callApi(callUrl, callOptions) {
        try {
            const response = await fetch(callUrl, callOptions);
            const result = await response.text();
            const message = JSON.parse(result)
            document.getElementById('sndCmd').src = message.message;
            return message;
        } catch (error) {
            console.error(error);
        }
    }
}