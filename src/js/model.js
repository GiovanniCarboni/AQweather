import { async } from "regenerator-runtime";
import { API_KEY_city, API_KEY_weather } from "./config.js";
import { formatDate, getJSON } from "./helpers.js";

export const state = {
  weather: {
    current: {},
    hourly: [],
    daily: [],
    results: [
      {
        city: "",
        state: "",
        country: "",
        countryCode: "",
        lat: "",
        lon: "",
        id: "",
      },
    ],
  },
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
      hour: formatDate(entry.dt).time,
      temp: Math.round(entry.temp),
      main: entry.weather[0].main.toLowerCase(),
    };
  });
};
const formatDataDaily = function (data) {
  return data.map((entry) => {
    return {
      day: days[new Date(entry.dt * 1000).getDay()],
      main: entry.weather[0].main.toLowerCase(),
      min: Math.round(entry.temp.min),
      max: Math.round(entry.temp.max),
      sunrise: formatDate(entry.sunrise).time,
      sunset: formatDate(entry.sunset).time,
    };
  });
};

export const getCity = async function (searchWord) {
  try {
    const formattedWord = searchWord.toLowerCase().trim();

    const cityData = await getJSON(
      `https://api.geoapify.com/v1/geocode/search?city=${formattedWord}&format=json&type=city&limit=100&apiKey=${API_KEY_city}`
    );

    const results = cityData.results
      // .filter((result) => result.city?.toLowerCase() === formattedWord)
      .map((result) => {
        return {
          city: result.city,
          state: result.state ?? result.county ?? "-",
          country: result.country,
          countryCode: result.country_code.toUpperCase(),
          lat: result.lat,
          lon: result.lon,
          id: `${result.city}%${result.lat}:${result.lon}`,
        };
      });

    if (results.length < 1) throw new Error("city data not available");

    state.results = results;
  } catch (err) {
    throw err;
  }
};

export const getWeather = async function (lat, lon, city, country) {
  try {
    const weatherData = await getJSON(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY_weather}`
    );

    state.weather = {
      city: city,
      country: country,
      current: {
        temp: Math.round(weatherData.current.temp),
        description: weatherData.current.weather[0].description,
        main: weatherData.current.weather[0].main.toLowerCase(),
        feelsLike: Math.round(weatherData.current.feels_like),
        humidity: weatherData.current.humidity,
        windSpeed: Math.round(weatherData.current.wind_speed),
        windDirection: weatherData.current.wind_deg,
        cloudiness: weatherData.current.clouds,
        visibility: weatherData.current.visibility,
        UVI: weatherData.current.uvi,
        pressure: weatherData.current.pressure,
        sunset: weatherData.current.sunset,
        sunrise: weatherData.current.sunrise,
      },
      hourly: formatDataHourly(weatherData.hourly.slice(2, 14)),
      daily: formatDataDaily(weatherData.daily.slice(1)),
    };
  } catch (err) {
    throw err;
  }
};

//
