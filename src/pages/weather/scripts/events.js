import { cityInput, searchButton } from './dom.js';
import { showWeatherData } from './ui.js';

//buscar com click e enter
searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    showWeatherData(city);
})

cityInput.addEventListener('keydown', (event) => {
   if(event.code === 'Enter'){
      const city = cityInput.value;
      showWeatherData(city);
   }
})