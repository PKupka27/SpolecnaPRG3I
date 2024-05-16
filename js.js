window.onload = function() {
    ziskatNahodnyObrazek();
}

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
    const previousDog = document.getElementById('previousDog');
    const src = imgDog.src;
    
    if (src) {
        previousDog.src = src;
    }
}