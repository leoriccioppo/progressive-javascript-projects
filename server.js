// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const app = express();
const port = 3000; // Defina a porta do servidor (você pode alterá-la se desejar)

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Rota para obter os dados climáticos
app.get('/src/scripts/weather/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.API_KEY;
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
