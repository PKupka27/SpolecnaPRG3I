window.onload = function() {
    ziskatNahodnyObrzek(); // Získá a uloží první náhodný obrázek při načtení stránky
}

let savedImages = [];

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

    // Přidat obrázek na první pozici v poli uložených obrázků
    savedImages.unshift(imageUrl);

    // Zobrazit první uložený obrázek
    zobrazitObrzek(0);
}

function zobrazitObrzek(index) {
    const imgDog = document.getElementById('imgDog');
    const imgNumber = document.getElementById('imgNumber');

    if (savedImages[index]) {
        imgDog.src = savedImages[index];
        imgNumber.textContent = `Obrázek číslo: ${index + 1}`;
    }
}

function zobrazitPredchoziObrzek() {
    const imgNumber = document.getElementById('imgNumber');
    const currentIndex = parseInt(imgNumber.textContent.split(': ')[1]) - 1;
    if (currentIndex > 0) {
        zobrazitObrzek(currentIndex - 1);
    }
}

function zobrazitDalsiObrzek() {
    const imgNumber = document.getElementById('imgNumber');
    const currentIndex = parseInt(imgNumber.textContent.split(': ')[1]) - 1;
    if (currentIndex < savedImages.length - 1) {
        zobrazitObrzek(currentIndex + 1);
    }
}