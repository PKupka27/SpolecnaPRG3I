window.onload = function() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };
    let prevImages = []; // Pole pro uchování předchozích obrázků
    let currentIndex = 0; // Index aktuálně zobrazeného obrázku

    async function callApi(callUrl, callOptions) {
        try {
            if (prevImages.length >= 10) {
                prevImages.shift(); // Odebrání prvního obrázku, pokud je jich více než 10
            }
            const response = await fetch(callUrl, callOptions);
            const result = await response.text();
            const message = JSON.parse(result);
            prevImages.push(message.message); // Přidání nového obrázku do pole
            currentIndex = prevImages.length - 1; // Nastavení aktuálního indexu na poslední obrázek
            document.getElementById('imgDog').src = prevImages[currentIndex];
        } catch (error) {
            console.error(error);
        }
    }

    // Funkce pro generování obrázku po kliknutí na tlačítko
    document.getElementById('generateBtn').addEventListener('click', function() {
        callApi(url, options);
    });

    // Funkce pro zobrazení předchozího obrázku
    document.getElementById('backBtn').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = prevImages.length - 1;
        }
        document.getElementById('imgDog').src = prevImages[currentIndex];
    });
}
