document.getElementById('cryptoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cryptoInput = document.getElementById('cryptoInput').value.toUpperCase();
    getCryptoPrice(cryptoInput);
});

function getCryptoPrice(cryptoCode) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCode}&vs_currencies=usd`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data[cryptoCode.toLowerCase()]) {
                const price = data[cryptoCode.toLowerCase()].usd;
                document.getElementById('cryptoResult').innerHTML = `<p>The current price of ${cryptoCode} is $${price}</p>`;
            } else {
                document.getElementById('cryptoResult').innerHTML = `<p>Cryptocurrency not found. Please try again.</p>`;
            }
        })
        .catch(error => {
            document.getElementById('cryptoResult').innerHTML = `<p>There was an error fetching the data. Please try again later.</p>`;
        });
}
