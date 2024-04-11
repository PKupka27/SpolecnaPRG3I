let apiUrl = "https://pokeapi.co/api/v2/";
function stahniJSON(url, callback)
{
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        callback(JSON.parse(xhr.response));
    }
    xhr.open("GET", url);
    xhr.send();
}

function nactiSeznam(url)
{
    let seznam_div = document.getElementById("poke-seznam");
    seznam_div.innerHTML = "<ul id='poke-seznam-ul'></ul>";
    let seznam_ul = document.getElementById("poke-seznam-ul");

    stahniJSON(url, (data) => {
        for (let pokemon of data.results)
        {
            let novaPolozka = document.createElement("li");
            novaPolozka.innerText = pokemon.name;
            seznam_ul.appendChild(novaPolozka);
            let poke_url = pokemon.url;
            novaPolozka.addEventListener("click", () => nactiPokemona(poke_url));
        }
    });
}

function nactiPokemona(url)
{
    let detaily_div = document.getElementById("poke-detaily");
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

nactiSeznam("https://pokeapi.co/api/v2/pokemon");