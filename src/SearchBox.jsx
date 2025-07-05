import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);

  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = import.meta.env.VITE_API_KEY;

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      const jsonResponse = await response.json();

      if (jsonResponse.cod !== 200) throw new Error();

      const result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };

      return result;
    } catch (err) {
      throw err;
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
    setError(false); // reset error when typing again
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity('');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit} className="search-form">
        <TextField
          id="city"
          label="Enter City"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
          fullWidth
          className="search-input"
        />
        <Button variant="contained" type="submit" className="search-button">
          Search
        </Button>
        {error && <p className="error-message">❌ No such place exists!</p>}
      </form>
    </div>
  );
}
