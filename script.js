let predchoziObrzekIndex = 0;
let nahodneObrzky = [];

window.onload = async function() {
    await ziskejNahodneObrzky(10); // <------- Proměnná
    zobrazObrzek(predchoziObrzekIndex);
}

async function zavolejApi(urlVolani, volbyVolani) {
    try {
        const odpoved = await fetch(urlVolani, volbyVolani);
        const vysledek = await odpoved.json();
        return vysledek;
    } catch (chyba) {
        console.error(chyba);
    }
}

async function ziskejNahodneObrzky(pocet) {
    const url = `https://dog.ceo/api/breeds/image/random/${pocet}`;
    const options = {
        method: 'GET'
    };
    const vysledek = await zavolejApi(url, options);
    nahodneObrzky = vysledek.message;
}

function zobrazObrzek(index) {
    if (index < 0 || index >= nahodneObrzky.length) {
        return;
    }
    document.getElementById('imgDog').src = nahodneObrzky[index];
}

function predchoziObrzek() {
    predchoziObrzekIndex--;
    if (predchoziObrzekIndex < 0) {
        predchoziObrzekIndex = nahodneObrzky.length - 1;
    }
    zobrazObrzek(predchoziObrzekIndex);
}

function dalsiObrzek() {
    predchoziObrzekIndex++;
    if (predchoziObrzekIndex >= nahodneObrzky.length) {
        predchoziObrzekIndex = 0;
    }
    zobrazObrzek(predchoziObrzekIndex);
}
