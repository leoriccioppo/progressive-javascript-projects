const apiKey = "163db620f1c61a0cc271e50a7f60976a";
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
}

function showeWeatherData(city){

}

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    console.log(city);
})