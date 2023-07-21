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

//pegar os dados do clima e trata erro
async function getWeatherData(city){
    try {
        const response = await fetch(`/weather/${city}`);
        const weatherData = await response.json();
        console.log(weatherData);
        showWeatherData(weatherData);
        // Chame a função showWeatherData(data) aqui para exibir os dados na página
      } catch (error) {
        console.error('Erro ao obter os dados climáticos:', error);
      }
    }


function showeWeatherData(data){
    cityElement.textContent = data.name;
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    getWeatherData(city);
    console.log(city);
})