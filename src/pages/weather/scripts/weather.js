import { pageWeather, cityElement, countryFlagIcons, temperatureElement, descriptionElement, weatherElement, humidityElement, windElement } from './dom.js';

//pegar os dados do clima e trata erro
export async function getWeatherData(city){
    try {
        const response = await fetch(`http://localhost:5500/weather/${city}`);
        const weatherData = await response.json();
        return weatherData;
      } catch (error) {
        console.error('Erro ao obter os dados climáticos:', error);
      }
}



