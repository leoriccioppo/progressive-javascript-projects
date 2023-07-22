//form
const cityInput = document.querySelector('#city-input');
const searchButton = document.querySelector('#search');
//weather data
const cityElement = document.querySelector('#city');
const countryFlagIcons = document.querySelector('#country');
const temperatureElement = document.querySelector('#temperature');
//description
const descriptionElement = document.querySelector('#description');
const humdityElement = document.querySelector('#humidity');
const windElement = document.querySelector('#wind');

//pegar os dados do clima e trata erro
async function getWeatherData(city){
    try {
        const response = await fetch(`http://localhost:5500/weather/${city}`);
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
      } catch (error) {
        console.error('Erro ao obter os dados climáticos:', error);
      }
}

//bandeira
function showFlag(countryCode) {
  const flagImg = document.querySelector('#country');
  flagImg.src = `https://www.countryflagicons.com/FLAT/24/${countryCode}.png`;
  flagImg.alt = 'Bandeira do país';
}

//mostrar na página os dados 
async function showWeatherData(city){
    const data = await getWeatherData(city);
    // Obtém o código do país a partir dos dados da API
    const countryCode = data.sys.country;

    cityElement.textContent = data.name;
    showFlag(countryCode);
    temperatureElement.innerText = parseInt(data.main.temp);

    descriptionElement.innerText = data.weather[0].description;
    humdityElement.innerText = data.main.humidity;
    windElement.innerText = data.wind.speed;


}

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    showWeatherData(city);
    console.log(city);
})