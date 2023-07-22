//form
const cityInput = document.querySelector('#city-input');
const searchButton = document.querySelector('#search');
//weather data
const cityElement = document.querySelector('#city');
const countryFlagIcons = document.querySelector('#country');
const temperatureElement = document.querySelector('#temperature');
//description
const descriptionElement = document.querySelector('#description');
const weatherElement = document.querySelector('#weather-icon');
const humdityElement = document.querySelector('#humidity');
const windElement = document.querySelector('#wind');

//pegar os dados do clima e trata erro
async function getWeatherData(city){
    try {
        const response = await fetch(`http://localhost:5500/weather/${city}`);
        const weatherData = await response.json();
        return weatherData;
      } catch (error) {
        console.error('Erro ao obter os dados climáticos:', error);
      }
}

//mostrar na página os dados 
async function showWeatherData(city){
    const data = await getWeatherData(city);
    
    cityElement.textContent = data.name;
    countryFlagIcons.setAttribute('src', `https://www.countryflagicons.com/SHINY/24/${data.sys.country}.png`);
    temperatureElement.textContent = parseInt(data.main.temp);

    descriptionElement.innerText = data.weather[0].description;
    weatherElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    humdityElement.innerText =` ${data.main.humidity}%`;
    windElement.innerText = ` ${data.wind.speed}km/h`;


}

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    showWeatherData(city);
})