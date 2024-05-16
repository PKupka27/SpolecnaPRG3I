window.onload = async function() {
    await ziskatNahodnyObrzek(); // Získá a uloží první náhodný obrázek při načtení stránky
}

let savedImages = [];
let currentIndex = 0;

async function zavolejApi(urlVolani, volbyVolani) {
    try {
        const odpoved = await fetch(urlVolani, volbyVolani);
        const vysledek = await odpoved.json();
        const imageUrl = vysledek.message;

        return imageUrl;
    } catch (chyba) {
        console.error(chyba);
        return null;
    }
}

async function ziskatNahodnyObrzek() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };
    const imageUrl = await zavolejApi(url, options);

    // Přidat obrázek do pole uložených obrázků
    savedImages.unshift(imageUrl);

    // Zobrazit nový obrázek
    zobrazitObrzek(0);
}

function zobrazitObrzek(index) {
    const imgDog = document.getElementById('imgDog');
    const imgNumber = document.getElementById('imgNumber');

    imgDog.src = savedImages[index];
    currentIndex = index;

    // Zobrazit číslo obrázku
    zobrazitCisloObrázku();
}

function zobrazitCisloObrázku() {
    const imgNumber = document.getElementById('imgNumber');
    imgNumber.textContent = `Obrázek číslo: ${currentIndex + 1}`;
    imgNumber.style.display = 'block';
}

async function zobrazitPredchoziObrzek() {
    if (currentIndex > 0) {
        currentIndex--;
        zobrazitObrzek(currentIndex);
    }
}

async function zobrazitDalsiObrzek() {
    if (currentIndex < savedImages.length - 1) {
        currentIndex++;
        zobrazitObrzek(currentIndex);
    }
}