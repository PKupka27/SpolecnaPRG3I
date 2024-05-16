window.onload = function() {
    ziskatNahodnyObrzek(); // Získá a uloží první náhodný obrázek při načtení stránky
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
    if (currentIndex === savedImages.length) {
        const url = 'https://dog.ceo/api/breeds/image/random';
        const options = {
            method: 'GET'
        };
        const imageUrl = await zavolejApi(url, options);

        savedImages.push(imageUrl);
    }

    zobrazitObrzek(currentIndex);
}

function zobrazitObrzek(index) {
    const imgDog = document.getElementById('imgDog');
    const imgNumber = document.getElementById('imgNumber');

    imgDog.src = savedImages[index];

    if (currentIndex > 0) {
        imgNumber.style.display = 'block';
        imgNumber.textContent = `Obrázek číslo: ${currentIndex + 1}`;
    } else {
        imgNumber.style.display = 'none';
    }
}

function zobrazitPredchoziObrzek() {
    if (currentIndex > 0) {
        currentIndex--;
        zobrazitObrzek(currentIndex);
    }
}

function zobrazitDalsiObrzek() {
    if (currentIndex < savedImages.length - 1) {
        currentIndex++;
        zobrazitObrzek(currentIndex);
    }
}