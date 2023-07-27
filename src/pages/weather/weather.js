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

    addImageToContainer('background', `https://source.unsplash.com/1600x900/?${city}`, 'Imagem da cidade');
    
    cityElement.textContent = data.name;
    addImageToContainer('country', `https://www.countryflagicons.com/SHINY/24/${data.sys.country}.png`, 'Bandeira do país');
    temperatureElement.textContent = parseInt(data.main.temp);

    descriptionElement.innerText = data.weather[0].description;
    addImageToContainer('weather-icon', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, 'Ícone do clima');
    humdityElement.innerText =` ${data.main.humidity}%`;
    windElement.innerText = ` ${data.wind.speed}km/h`;
}

//construindo imagens
function addImageToContainer(containerId, imageUrl, altText) {
  const container = document.getElementById(containerId);

  // Remover imagens existentes dentro do container, se houver
  container.innerHTML = '';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = altText;

  container.appendChild(img);
}

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