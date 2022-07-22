import { API_KEY_city, API_KEY_weather } from "./config.js";
import { formatDate, getJSON } from "./helpers.js";

export const state = {
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
      hour: `${new Date(entry.dt * 1000).getHours()}:00`,
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

export const getWeather = async function (lat, lon) {
  try {
    const cityData = await getJSON(
      `https://api.geoapify.com/v1/geocode/search?city=${"  nuoro  "}&format=json&type=city&apiKey=${API_KEY_city}`
    );

    const weatherData = await getJSON(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.results[0].lat}&lon=${cityData.results[0].lon}&units=metric&appid=${API_KEY_weather}`
    );
    // const cityData = await getJSON(
    //   `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=5074afdd2d514e979ef4b42077f910f5`
    // );

    state.weather = {
      city: cityData.results[0].city,
      state: cityData.results[0].state,
      country: cityData.results[0].country,
      current: {
        temp: weatherData.current.temp,
        description: weatherData.current.weather[0].description,
        main: weatherData.current.weather[0].main,
        feelsLike: weatherData.current.feels_like,
        humidity: weatherData.current.humidity,
        windSpeed: weatherData.current.wind_speed,
        windDirection: weatherData.current.wind_deg,
        cloudiness: weatherData.current.clouds,
        visibility: weatherData.current.visibility,
        UVI: weatherData.current.uvi,
        pressure: weatherData.current.pressure,
        sunset: weatherData.current.sunset,
        sunrise: weatherData.current.sunrise,
      },
      hourly: formatDataHourly(weatherData.hourly.slice(0, 12)),
      daily: formatDataDaily(weatherData.daily),
    };
    console.log(state.weather);

    console.log(cityData);
  } catch (err) {
    throw err;
  }
};

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
