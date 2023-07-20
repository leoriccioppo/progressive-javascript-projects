//pegar a api key de maneira oculta pelo arquivo .env ignorado no .gitignore
require('dotenv').config();

const apiKey = process.env.OPEN_WEATHER_API_KEY;
const apiCountryFlagUrl = "https://www.countryflagicons.com/";

//form
const cityInput = document.querySelector('#city-input');
const searchButton = document.querySelector('#search');
//weather data
const cityElement = document.querySelector('#city');
const countryflagicons = document.querySelector('#country');
const temperatureElement = document.querySelector('#temperature');
//description
const descriptionElement = document.querySelector('#description');
const humdityElement = document.querySelector('#humidity');
const windElement = document.querySelector('#wind');

async function getWeatherData(city){
    const apiWeatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiWeatherUrl);
    const data = await response.json();

    console.log(data);
}

function showeWeatherData(city){

}

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    console.log(city);
})