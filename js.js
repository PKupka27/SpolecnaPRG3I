window.onload = function() {
    ziskatNahodnyObrazek();
}

let previousImageUrl = '';

async function zavolejApi(urlVolani, volbyVolani) {
    try {
        const odpoved = await fetch(urlVolani, volbyVolani);
        const vysledek = await odpoved.json();
        const zprava = vysledek.message;

        // Pokud nový obrázek není stejný jako předchozí, uložit ho jako předchozí
        if (zprava !== previousImageUrl) {
            previousImageUrl = document.getElementById('imgDog').src;
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