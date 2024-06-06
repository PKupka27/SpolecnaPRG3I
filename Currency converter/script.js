// Načtení měn do dropdowm menu a datumu po tom co se stránka načte (dělá to DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function() {
    var zMen = document.getElementById('zMen');
    var doMen = document.getElementById('doMen');


    fetch('https://api.exchangerate-api.com/v4/latest/CZK')
    // potom co dostaneme odpověd z api tak se data převedou to formátu json tímto kodem
    .then(function(odpoved) {
        return odpoved.json();
    })
    .then(function(data) {
            
            // Zde se získají měny, které jsou v API
            const meny = Object.keys(data.rates);

            // Zde se získá z API datum
            const datum = data.date

            // Toto vpíše datum do stránky
            document.getElementById('datum').textContent = `Kurz z ${datum}`;

            // Pro každou měnu se provede kod, který je pod tímto
            meny.forEach(function(mena){

                // Toto naplní dropdown menu všema měnama co jsou v API
                const ZMeny = document.createElement('option');
                ZMeny.value = mena;
                ZMeny.textContent = mena;
                zMen.appendChild(ZMeny);

                // Toto naplní dropdown menu všema měnama co jsou v API
                const DoMeny = document.createElement('option');
                DoMeny.value = mena;
                DoMeny.textContent = mena;
                doMen.appendChild(DoMeny);
            });
        });
});

// Když klikne uživatel na tlačíko převést, tak se provede kód, který je pod tímto
document.getElementById('prevest').addEventListener('click', function() {
    const zMen = document.getElementById('zMen').value;  // .value = získá hodnotu (měnu) co uživatel vybral a chce z ní převádět do jiné měny
    const doMen = document.getElementById('doMen').value; // .value = získá hodnotu (měnu) co uživatel vybral a chce převádět do jiné měny
    const castka = document.getElementById('castka').value; // .value = získá hodnotu (částku) co uživatel napsal do textového pole

    // Zde se získají informace o směnných kurzech, tím že zavoláme API
    fetch(`https://api.exchangerate-api.com/v4/latest/${zMen}`)
    .then(function(odpoved) {
        return odpoved.json();
    })
    .then(function(data) {

            // Zde je výpočet
            const kurz = data.rates[doMen];
            const vysledek = castka * kurz;

            // toto zobrazí výsledek, který je na dvě desetinná místa pomocí "to.Fixed(2)", po tom co uživatel klikne 
            document.getElementById('vysledek').textContent = `${castka} ${zMen} = ${vysledek.toFixed(2)} ${doMen}`;
        });
});
