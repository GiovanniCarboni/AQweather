import { API_KEY } from "./config.js";

const state = {
  weather: {},
};

const getWeather = async function (lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const data = await res.json();

  state.weather = {
    current: {
      temp: data.current.temp,
      description: data.current.weather[0].description,
      main: data.current.weather[0].main,
      feelsLike: data.current.feels_like,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
      windDirection: data.current.wind_deg,
      cloudiness: data.current.clouds,
      visibility: data.current.visibility,
      UVI: data.current.uvi,
      pressure: data.current.pressure,
    },
    hourly: data.hourly.slice(24),
    daily: data.daily,
  };

  console.log(data);
  console.log(state.weather);
};

getWeather(39.2238, 9.1217);

const menuBtn = document.querySelector(".menu-btn");

const savedList = document.querySelector(".section-saved");

const closeMenuBtn = document.querySelector(".close-menu-btn");

const weatherDisplay = document.querySelector(".weather-display");

menuBtn.addEventListener("click", function () {
  savedList.style.left = "0";
});

closeMenuBtn.addEventListener("click", function () {
  savedList.style.left = "-50rem";
});
