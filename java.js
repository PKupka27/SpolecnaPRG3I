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

{
    const pokemonData = {
        "abilities": [
            // ...
        ],
        "base_experience": 64,
        "forms": [
            // ...
        ],
        "game_indices": [
            // ...
        ],
        "height": 7,
        "held_items": [],
        "id": 1,
        "is_default": true,
        "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/1/encounters",
        "moves": [
            // ...
        ],
        "name": "bulbasaur",
        "order": 1,
        "species": {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
        },
        "sprites": {
            "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
            "back_female": null,
            "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
            "back_shiny_female": null,
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "front_female": null,
            "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
            "front_shiny_female": null
        },
        "stats": [
            // ...
        ],
        "types": [
            {
                "slot": 2,
                "type": {
                    "name": "poison",
                    "url": "https://pokeapi.co/api/v2/type/4/"
                }
            },
            {
                "slot": 1,
                "type": {
                    "name": "grass",
                    "url": "https://pokeapi.co/api/v2/type/12/"
                }
            }
        ],
        "weight": 69
    };
    
    // Zde můžete provádět operace s objektem pokemonData, např. výpis informací o pokémonovi:
    console.log("Název:", pokemonData.name);
    console.log("Výška:", pokemonData.height);
    console.log("Váha:", pokemonData.weight);
    console.log("Typy:", pokemonData.types.map(type => type.type.name).join(", "));
