window.onload = async function() {
    await ziskatNahodnyObrzek(); // Získá a zobrazí první náhodný obrázek při načtení stránky
}

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

    zobrazitObrzek(imageUrl);
}

function zobrazitObrzek(imageUrl) {
    const imgDog = document.getElementById('imgDog');
    const imgNumber = document.getElementById('imgNumber');

    if (imageUrl) {
        imgDog.src = imageUrl;
        imgNumber.textContent = ''; // Skryje číslo obrázku
        imgNumber.style.display = 'none';
    } else {
        imgDog.src = ''; // Zobrazí se prázdný obrázek, pokud není žádný obrázek k dispozici
        imgNumber.textContent = ''; // Skryje číslo obrázku, pokud není žádný obrázek k dispozici
        imgNumber.style.display = 'none';
    }
}