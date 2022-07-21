import "core-js/stable"; // this is for everything
import "regenerator-runtime/runtime"; // this is for async/await

const API_KEY = "1235fa6c8560723f4689a8a0eb063c60";

const getWeather = async function (lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const data = await res.json();

  console.log(data);
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
