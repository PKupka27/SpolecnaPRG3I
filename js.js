window.onload = async function() {
    await ziskatNahodneObrasky(); // Získá a uloží prvních 10 náhodných obrázků při načtení stránky
}

let savedImages = [];
let currentIndex = -1; // Index aktuálně zobrazeného obrázku

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

async function ziskatNahodneObrasky() {
    const pocetObrasku = 10;

    for (let i = 0; i < pocetObrasku; i++) {
        const url = 'https://dog.ceo/api/breeds/image/random';
        const options = {
            method: 'GET'
        };
        const imageUrl = await zavolejApi(url, options);

        savedImages.push(imageUrl);
    }

    // Zobrazit první obrázek
    currentIndex = 0;
    zobrazitObrzek();
}

function zobrazitObrzek() {
    const imgDog = document.getElementById('imgDog');
    const imgNumber = document.getElementById('imgNumber');

    if (savedImages.length > 0) {
        imgDog.src = savedImages[currentIndex];
        imgNumber.textContent = `Obrázek číslo: ${currentIndex + 1}`;
        imgNumber.style.display = 'block';
    } else {
        imgDog.src = ''; // Zobrazí se prázdný obrázek, pokud není žádný obrázek k dispozici
        imgNumber.textContent = ''; // Skryje číslo obrázku, pokud není žádný obrázek k dispozici
        imgNumber.style.display = 'none';
    }
}

async function zobrazitPredchoziObrzek() {
    if (currentIndex > 0) {
        currentIndex--;
        zobrazitObrzek();
    }
}

async function zobrazitDalsiObrzek() {
    if (currentIndex < savedImages.length - 1) {
        currentIndex++;
        zobrazitObrzek();
    }
}