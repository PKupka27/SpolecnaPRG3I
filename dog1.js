const url = 'https://dog.ceo/api/breeds/image/random';
let history = [];
let currentIndex = -1;

document.getElementById('btnNextDog').addEventListener('click', async function () {
    try {
        const response = await fetch(url);
        const result = await response.json();
        const imgElement = document.getElementById('imgDog');

        // Pokud jsme se vrátili zpět a načteme nový obrázek, odstraníme všechny "budoucí" obrázky
        if (currentIndex < history.length - 1) {
            history = history.slice(0, currentIndex + 1);
        }

        // Přidáme nový obrázek do historie a zvýšíme currentIndex
        history.push(result.message);
        currentIndex++;
        imgElement.src = result.message;
    } catch (error) {
        console.error(error);
    }
});

document.getElementById('btnPrevDog').addEventListener('click', function () {
    if (currentIndex > 0) {
        currentIndex--;
        document.getElementById('imgDog').src = history[currentIndex];
    }
});

