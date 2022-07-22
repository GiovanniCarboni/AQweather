import "core-js/stable";
import { async } from "regenerator-runtime";
import * as model from "./model.js";
import ResultsBoxView from "./views/resultsBoxView.js";
import SavedView from "./views/SavedView.js";
import WeatherView from "./views/WeatherView.js";

// if (module.hot) {
//   module.hot.accept();
// }

const controlCity = async function (searchWord) {
  try {
    ResultsBoxView.renderSpinner();

    await model.getCity(searchWord);

    ResultsBoxView.render(model.state.results);
  } catch (err) {
    ResultsBoxView.renderError();
    console.error("💣💣💣", err);
  }
};

const controlWeather = async function (id) {
  try {
    WeatherView.renderSpinner();

    const result = model.state.results.find((result) => result.id === id);

    await model.getWeather(result.lat, result.lon, result.city, result.country);

    WeatherView.render(model.state.weather);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  ResultsBoxView.addHandlerForm(controlCity);
  ResultsBoxView.addHandlerResults(controlWeather);
};
init();

const menuBtn = document.querySelector(".menu-btn");

const savedList = document.querySelector(".section-saved");

const closeMenuBtn = document.querySelector(".close-menu-btn");

menuBtn.addEventListener("click", function () {
  savedList.style.left = "0";
});

closeMenuBtn.addEventListener("click", function () {
  savedList.style.left = "-50rem";
});
