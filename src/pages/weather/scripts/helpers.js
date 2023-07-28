import { pageWeather, cityElement, countryFlagIcons, temperatureElement, descriptionElement, weatherElement, humidityElement, windElement } from './dom.js';

//construindo imagens
export function addImageToContainer(containerId, imageUrl, altText) {
  const container = document.getElementById(containerId);

  // Remover imagens existentes dentro do container, se houver
  container.innerHTML = '';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = altText;

  container.appendChild(img);
}

//muda background de acordo com a cidade
export function changeBackground(city) {
    const imageUrl = `https://source.unsplash.com/1600x900/?${city}`;
    pageWeather.classList.add('background');
    pageWeather.style.backgroundImage = `url('${imageUrl}')`;
  }