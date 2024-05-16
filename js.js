window.onload = function() {
    ziskatNahodnyObrazek();
}

let previousImageUrl = '';

async function zavolejApi(urlVolani, volbyVolani) {
    try {
        const odpoved = await fetch(urlVolani, volbyVolani);
        const vysledek = await odpoved.json();
        const zprava = vysledek.message;

        // Uložit aktuální obrázek jako předchozí obrázek
        ulozPredchoziObrazek();

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

function ulozPredchoziObrazek() {
    const imgDog = document.getElementById('imgDog');
    const src = imgDog.src;

    if (src) {
        previousImageUrl = src;
    }
}

function zobrazitPredchoziObrazek() {
    const imgDog = document.getElementById('imgDog');

    if (previousImageUrl) {
        // Vyměnit aktuální obrázek s předchozím obrázkem
        const currentImageUrl = imgDog.src;
        imgDog.src = previousImageUrl;
        previousImageUrl = currentImageUrl;
    }
}