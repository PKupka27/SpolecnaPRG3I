window.onload = function() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };
    let prevImages = ""; // Uchování předchozích obrázků
    let maxImages = 10; // Maximální počet obrázků
    let generatedImages = 0; // Počet již vygenerovaných obrázků

    async function callApi(callUrl, callOptions) {
        try {
            if (generatedImages < maxImages) {
                const response = await fetch(callUrl, callOptions);
                const result = await response.text();
                const message = JSON.parse(result);
                prevImages.push(document.getElementById('imgDog').src);
                document.getElementById('imgDog').src = message.message;
                generatedImages++;
                if (generatedImages === maxImages) {
                    document.getElementById('generateBtn').disabled = true; // Zablokování tlačítka po dosažení maximálního počtu obrázků
                }
            } else {
                alert('Bylo dosaženo maximálního počtu obrázků (10).');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Funkce pro generování obrázku po kliknutí na tlačítko
    document.getElementById('generateBtn').addEventListener('click', function() {
        callApi(url, options);
    });

    // Funkce pro návrat na předchozí obrázek
    document.getElementById('backBtn').addEventListener('click', function() {
        if (prevImages.length > 0) {
            document.getElementById('imgDog').src = prevImages.pop();
            generatedImages--;
            document.getElementById('generateBtn').disabled = false; // Odblokování tlačítka pro generování dalšího obrázku
        }
    });
}
