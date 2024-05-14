import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const fetchWeatherData = () => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f514e5ddd4d77105772285b19e537b05&units=metric`
    )
      .then((result) => result.json())
      .then((jsonResult) => {
        setWeatherData(jsonResult);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App">
      <div className="weather-container">
        <h2>Weather App</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Latitude:</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Longitude:</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>
          <button type="submit">Get Weather</button>
        </form>
        {loading && <div className="loading">Loading...</div>}
        {weatherData && (
          <div className="weather-info">
            <h3>Weather in {weatherData.name}</h3>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

