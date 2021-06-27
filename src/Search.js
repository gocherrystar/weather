import React, {useState} from "react";
import axios from 'axios';

export default function Search() {
   let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");

  function showTemperature(response) {
    setWeather(
      <ul>
        <li>Temperature: {Math.round(response.data.main.temp)}℃</li>
        <li>Description: {response.data.weather[0].description}</li>
        <li>Humidity: {response.data.humidity}%</li>
        <li>Wind: {response.data.wind.speed}km/h</li>
        <li>
          Icon:
          <img
            src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
            alt={response.data.weather[0].description}
          />
        </li>
      </ul>
    );
  }

  function handleSearch(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6b1ad2b1489fef19b8767763765b92f8&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
      />
      <input type="submit" value="Search" />
      <div>{weather}</div>
    </form>
  );
}