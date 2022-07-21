import { API_KEY } from "./config.js";
import { formatDate } from "./helpers.js";

const state = {
  weather: {},
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formatDataHourly = function (data) {
  return data.map((entry) => {
    return {
      hour: `${new Date(entry.dt * 1000).getHours()}:00}`,
      temp: entry.temp,
      main: entry.weather[0].main,
    };
  });
};
const formatDataDaily = function (data) {
  return data.map((entry) => {
    return {
      day: days[new Date(entry.dt * 1000).getDay()],
      main: entry.weather[0].main,
      min: Math.round(entry.temp.min),
      max: Math.round(entry.temp.max),
      sunrise: formatDate(entry.sunrise).time,
      sunset: formatDate(entry.sunset).time,
    };
  });
};

const getWeather = async function (lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) return;

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
      sunset: data.current.sunset,
      sunrise: data.current.sunrise,
    },
    hourly: formatDataHourly(data.hourly.slice(0, 12)),
    daily: formatDataDaily(data.daily),
  };
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
