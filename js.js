window.onload = function() {
    ziskatNahodnyObrazek();
}

let previousImageUrl = '';
let currentImageUrl = '';

async function zavolejApi(urlVolani, volbyVolani) {
    try {
        const odpoved = await fetch(urlVolani, volbyVolani);
        const vysledek = await odpoved.json();
        const zprava = vysledek.message;

        // Nastavit nový obrázek a uložit aktuální obrázek jako předchozí
        ulozPredchoziObrazek(zprava);

        // Nastavit nový obrázek
        document.getElementById('imgDog').src = zprava;
        currentImageUrl = zprava;
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

function ulozPredchoziObrazek(newImageUrl) {
    const imgDog = document.getElementById('imgDog');
    const src = imgDog.src;

    if (src && src !== newImageUrl) {
        previousImageUrl = src;
    }
}

function zobrazitPredchoziObrazek() {
    const imgDog = document.getElementById('imgDog');

    if (previousImageUrl && previousImageUrl !== currentImageUrl) {
        // Zobrazit předchozí obrázek
        imgDog.src = previousImageUrl;

        // Vynulovat předchozí obrázek po zobrazení
        previousImageUrl = '';
    }
}