import { background, cityElement, countryFlagIcons, temperatureElement, descriptionElement, weatherElement, humidityElement, windElement } from './dom.js';
import { getWeatherData } from './weather.js';
import { addImageToContainer } from './helpers.js';
//mostrar na página os dados 
export async function showWeatherData(city){
    const data = await getWeatherData(city);

    addImageToContainer('background', `https://source.unsplash.com/1600x900/?${city}`, 'Imagem da cidade');
    
    cityElement.textContent = data.name;
    addImageToContainer('country', `https://www.countryflagicons.com/SHINY/24/${data.sys.country}.png`, 'Bandeira do país');
    temperatureElement.textContent = parseInt(data.main.temp);

    descriptionElement.innerText = data.weather[0].description;
    addImageToContainer('weather-icon', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, 'Ícone do clima');
    humdityElement.innerText =` ${data.main.humidity}%`;
    windElement.innerText = ` ${data.wind.speed}km/h`;
}

