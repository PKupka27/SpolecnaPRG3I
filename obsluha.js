window.onload = function(){ 


const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };

    async function callApi(callUrl, callOptions) {
        try {
            const response = await fetch(callUrl, callOptions);
            const result = await response.text();
            const message = JSON.parse(result)
            document.getElementById('imgDog').src = message.message;
            return persons;
        } catch (error) {
            console.error(error);
        }
    }

}