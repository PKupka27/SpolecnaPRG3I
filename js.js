window.onload = function() {
    ziskatNahodnyObrazek();
}

async function zavolejApi(urlVolani, volbyVolani) {
    try {
        const odpoved = await fetch(urlVolani, volbyVolani);
        const vysledek = await odpoved.json();
        
        if (odpoved.ok) {
            const zprava = vysledek.image;
            document.getElementById('imgLiska').src = zprava;
        } else {
            console.error("Chyba při načítání obrázku lišky", vysledek);
        }
    } catch (chyba) {
        console.error("Chyba při načítání obrázku lišky", chyba);
    }
}

function ziskatNahodnyObrazek() {
    const url = 'https://randomfox.ca/floof/';
    const options = {
        method: 'GET'
    };
    
    zavolejApi(url, options);
}