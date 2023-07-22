// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const port = 5500; // Defina a porta do servidor (posso alterar)

// Configuração do cors
app.use(cors());

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Rota para obter os dados climáticos
app.get('/weather/:city', async (req, res) => {
  console.log('Rota /weather/:city foi acessada');
  const city = req.params.city;
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await axios.get(apiWeatherUrl);
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    console.error('Erro ao obter os dados climáticos:', error.message);
    res.status(500).json({ error: 'Ocorreu um erro ao obter os dados climáticos.' });
  }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
