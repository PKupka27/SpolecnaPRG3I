let predchoziObrzek = '';

window.onload = function() {
    ziskejNahodnyObrzek();
}

async function zavolejApi(urlVolani, volbyVolani) {
    try {
        const odpoved = await fetch(urlVolani, volbyVolani);
        const vysledek = await odpoved.json();
        const zprava = vysledek.message;
        predchoziObrzek = document.getElementById('imgDog').src;
        document.getElementById('imgDog').src = zprava;
    } catch (chyba) {
        console.error(chyba);
    }
}

function ziskejNahodnyObrzek() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const options = {
        method: 'GET'
    };
    zavolejApi(url, options);
}

function zobrazPredchoziObrzek() {
    if (predchoziObrzek) {
        document.getElementById('imgDog').src = predchoziObrzek;
    } else {
        alert('Žádný předchozí obrázek není k dispozici.');
    }
}
