window.onload = function(){
    let btnnxt = document.getElementById("sndCmd");
    let btnbck = document.getElementById("zpetCmd");
    let btnMulti = document.getElementById("sendFragmentCmd");
    let dogImageHistory = [];
    let currentImageIndex = -1;

    const options = {
        method: 'GET'
    };

    btnnxt.onclick = function() {
        if (currentImageIndex < dogImageHistory.length - 1) {
            currentImageIndex++;
            document.getElementById('dogImage').src = dogImageHistory[currentImageIndex];
        }
    };

    btnMulti.onclick = function() {
        const count = document.getElementById("pesindex").value;
        if (count > 0) {
            callMultiApi(count);
        }
    };

    async function callMultiApi(count) {
        try {
            const url = `https://dog.ceo/api/breeds/image/random/${count}`;
            const response = await fetch(url, options);
            const result = await response.json();
            dogImageHistory = result.message;
            currentImageIndex = 0;
            document.getElementById('dogImage').src = dogImageHistory[currentImageIndex];
        } catch (error) {
            console.error(error);
        }
    }
}