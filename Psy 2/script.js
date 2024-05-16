const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const imageContainer = document.getElementById('image-container');
const imageNumber = document.getElementById('image-number');

let imageHistory = [];
let currentIndex = 0;

async function fetchImages() {
  try {
    const promises = Array.from({ length: 13 }, () =>
      fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json())
    );
    const results = await Promise.all(promises);
    imageHistory = results.map(result => result.message);
    currentIndex = 0;

    displayImage(imageHistory[currentIndex]);
    nextBtn.disabled = imageHistory.length <= 1;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function displayImage(url) {
  const imgElement = document.createElement('img');
  imgElement.src = url;
  imgElement.alt = `Random dog image ${currentIndex + 1}`;
  imageContainer.innerHTML = '';
  imageContainer.appendChild(imgElement);
  imageNumber.textContent = `Image ${currentIndex + 1} of ${imageHistory.length}`;
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayImage(imageHistory[currentIndex]);
    nextBtn.disabled = false;
    if (currentIndex === 0) {
      prevBtn.disabled = true;
    }
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < imageHistory.length - 1) {
    currentIndex++;
    displayImage(imageHistory[currentIndex]);
    prevBtn.disabled = false;
    if (currentIndex === imageHistory.length - 1) {
      nextBtn.disabled = true;
    }
  }
});

window.onload = fetchImages;
