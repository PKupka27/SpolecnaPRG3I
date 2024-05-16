window.onload = function() {
    ziskatNahodnyObrazek();
}

let previousImages = [];

async function zavolejApi(urlVolani, volbyVolani) {
    try {
        const odpoved = await fetch(urlVolani, volbyVolani);
        const vysledek = await odpoved.json();
        const imageUrl = vysledek.message;

        // Uložit nový obrázek do pole předchozích obrázků
        if (previousImages.length >= 10) {
            previousImages.shift(); // Odstranit první obrázek, pokud už jsou uloženy 10
        }
        previousImages.push(imageUrl);

        // Nastavit nový obrázek
        document.getElementById('imgDog').src = imageUrl;
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

    if (previousImages.length > 0) {
        // Zobrazit poslední uložený obrázek
        const lastImage = previousImages.pop();
        imgDog.src = lastImage;
    }
}