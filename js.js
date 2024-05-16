window.onload = function() {
    ziskatNahodnyObrazek();
}

let previousImageUrl = '';

async function zavolejApi(urlVolani, volbyVolani) {
    try {
        const odpoved = await fetch(urlVolani, volbyVolani);
        const vysledek = await odpoved.json();
        const zprava = vysledek.message;

        // Nastavit nový obrázek a uložit aktuální obrázek jako předchozí
        const currentImageUrl = document.getElementById('imgDog').src;
        if (currentImageUrl) {
            previousImageUrl = currentImageUrl;
        }

        // Nastavit nový obrázek
        document.getElementById('imgDog').src = zprava;
    } catch (chyba) {
        console.error(chyba);
    }
}

function ziskatNahodnyObrazek() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };
    
    zavolejApi(url, options);
}

function zobrazitPredchoziObrazek() {
    const imgDog = document.getElementById('imgDog');

    if (previousImageUrl) {
        // Zobrazit předchozí obrázek
        imgDog.src = previousImageUrl;

        // Vynulovat předchozí obrázek po zobrazení
        previousImageUrl = '';
    }
}