import { background, cityElement, countryFlagIcons, temperatureElement, descriptionElement, weatherElement, humidityElement, windElement } from './dom.js';

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