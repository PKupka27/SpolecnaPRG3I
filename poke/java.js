function stahniJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        } else {
            console.error("Nepodařilo se načíst data:", xhr.statusText);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

function nactiSeznam(url) {
    let container = document.querySelector(".poke-container");
    if (!container) {
        console.error("Nenalezen kontejner s třídou 'poke-container'!");
        return;
    }
    
    let seznam_div = container.querySelector("#poke-seznam");
    if (!seznam_div) {
        console.error("Nenalezen seznam pokémonů!");
        return;
    }
    
    seznam_div.innerHTML = "<ul id='poke-seznam-ul'></ul>";
    let seznam_ul = seznam_div.querySelector("#poke-seznam-ul");

    stahniJSON(url, (data) => {
        for (let pokemon of data.results) {
            let novaPolozka = document.createElement("li");
            novaPolozka.innerText = pokemon.name;
            seznam_ul.appendChild(novaPolozka);
            let poke_url = pokemon.url;
            novaPolozka.addEventListener("click", () => nactiPokemona(poke_url));
        }
    });
}

function nactiPokemona(url) {
    let container = document.querySelector(".poke-container");
    if (!container) {
        console.error("Nenalezen kontejner s třídou 'poke-container'!");
        return;
    }

    let detaily_div = container.querySelector("#poke-detaily");
    if (!detaily_div) {
        console.error("Nenalezen detailní pohled na pokémona!");
        return;
    }
    
    stahniJSON(url, (data) => {
        let html = `
            <img src="${data.sprites.back_default}" />
            <ul>
                <li>Název: ${data.name}</li>
                <li>Výška: ${data.height}</li>
                <li>Váha: ${data.weight}</li>
            </ul>
        `;

        detaily_div.innerHTML = html;
    });
}

// Volání funkce pro načtení seznamu pokémonů
nactiSeznam("https://pokeapi.co/api/v2/pokemon");
