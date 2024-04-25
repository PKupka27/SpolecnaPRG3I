const generateBtn = document.getElementById('generate-btn');
const imageContainer = document.getElementById('image-container');

generateBtn.addEventListener('click', () => {
  fetch('https://www.google.com/search?q=dogs&tbm=isch')
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const images = doc.querySelectorAll('img');
      const randomIndex = Math.floor(Math.random() * images.length);
      const imageUrl = images[randomIndex].src;

      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.alt = 'Random dog image';

      imageContainer.innerHTML = '';
      imageContainer.appendChild(imgElement);
    })
    .catch(error => console.error('Error fetching images:', error));
});