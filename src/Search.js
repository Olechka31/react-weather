import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";

export default function Search() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      city: response.data.city,
      temperature: response.data.temperature.current,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      icon: `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
      description: response.data.condition.description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "28ae48tbf6e9169de4of202670faef34";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        className="searchLine"
        placeholder="Please, type a city"
        onChange={updateCity}
      />
      <input type="submit" className="searchButton" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="container">
        {form}
        <p className="currentPlace">
          Current temperature in {weather.city.toUpperCase()} is:
          <WeatherTemperature celsius={weather.temperature} />
          <br />
          <FormattedDate date={weather.date} />
        </p>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <img src={weather.icon} alt={weather.description} />
          </div>

          <div className="col-md-6 col-sm-12 left-align">
            <ul>
              <li>Humidity: {weather.humidity} %</li>
              <li>Wind: {weather.wind} km/h</li>
              <li>{weather.description}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
