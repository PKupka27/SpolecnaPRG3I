const imageHistory = [];
let currentImageIndex = -1;

document.getElementById('generateButton').addEventListener('click', generovatObrázek);
document.getElementById('previousButton').addEventListener('click', zpetObrazek);

async function generovatObrázek() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    zobrazitObrázek(data.message, true);
  } catch (error) {
    console.error('Chyba při načítání obrázku:', error);
  }
}

function zobrazitObrázek(src, saveToHistory) {
  const container = document.getElementById('obrazekContainer');
  container.innerHTML = ''; // Vymažeme předchozí obrázek, pokud existuje

  const img = document.createElement('img');
  img.src = src;
  container.appendChild(img);

  if (saveToHistory) {
    // Uložení URL obrázku do historie a aktualizace indexu
    imageHistory.push(src);
    currentImageIndex++;
  }
}

function zpetObrazek() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    zobrazitObrázek(imageHistory[currentImageIndex], false);
  } else {
    console.log('Žádný předchozí obrázek.');
  }
}