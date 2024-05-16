const imageUrls = [];
let currentImageIndex = -1;
const dogImageElement = document.getElementById('dogImage');
const photoCountElement = document.getElementById('photoCount');

async function loadImages(count) {
  try {
    const responses = await Promise.all(Array.from({ length: count }, () => fetch('https://dog.ceo/api/breeds/image/random')));
    const data = await Promise.all(responses.map(response => response.json()));
    imageUrls.push(...data.map(item => item.message));
    showImage(0);
    updatePhotoCount();
  } catch (error) {
    console.error('Chyba při načítání obrázků:', error);
  }
}

function showImage(index) {
  currentImageIndex = index;
  dogImageElement.src = imageUrls[index];
}

function previousImage() {
  if (currentImageIndex > 0) {
    showImage(currentImageIndex - 1);
    updatePhotoCount();
  } else {
    console.log('Žádný předchozí obrázek.');
  }
}

function nextImage() {
  if (currentImageIndex < imageUrls.length - 1) {
    showImage(currentImageIndex + 1);
    updatePhotoCount();
  } else {
    console.log('Žádný další obrázek.');
  }
}

function updatePhotoCount() {
  photoCountElement.textContent = `${currentImageIndex + 1} / ${imageUrls.length}`;
}

// Nahraj 5 obrázků po načtení stránky
window.onload = function() {
  loadImages(5);
};
