import "core-js/stable";
import { async } from "regenerator-runtime";
import * as model from "./model.js";
import ResultsBoxView from "./views/ResultsBoxView.js";
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
    ResultsBoxView.renderError(err);
    console.error("💥💥", err);
  }
};

const controlWeather = async function (elId) {
  try {
    WeatherView.renderSpinner();

    const { lat, lon, city, countryCode, id } = model.state.results.find(
      (result) => result.id === elId
    );

    await model.getWeather(lat, lon, city, countryCode);

    model.addToSaved(lat, lon, city, countryCode, id);

    WeatherView.render(model.state.weather);
    SavedView.render(model.state.saved);
  } catch (err) {
    WeatherView.renderError(err);
    console.error("💥💥", err);
  }
};

const controlSaved = async function (elId) {
  try {
    WeatherView.renderSpinner();
    console.log(model.state.saved);

    const { lat, lon, city, countryCode, id } = model.state.saved.find(
      (item) => item.id === elId
    );

    await model.getWeather(lat, lon, city, countryCode);

    WeatherView.render(model.state.weather);
  } catch (err) {
    console.error(err);
  }
};

const controlDeleteSaved = function (elId) {
  model.removeFromSaved(elId);
  SavedView.render(model.state.saved);
};

const controlRefresh = async function () {
  try {
    if (!model.state.weather) return;
    WeatherView.renderSpinner();
    const { lat, lon, city, country } = model.state.weather;
    await model.getWeather(lat, lon, city, country);

    WeatherView.render(model.state.weather);
  } catch (err) {
    WeatherView.renderError(err);
    console.error("💥💥", err);
  }
};

const init = function () {
  ResultsBoxView.addHandlerForm(controlCity);
  ResultsBoxView.addHandlerResults(controlWeather);
  WeatherView.addHandlerRefresh(controlRefresh);
  SavedView.addHandlerSaved(controlSaved, controlDeleteSaved);
  SavedView.addHandlerOpenSaved();
  SavedView.addHandlerCloseSaved();
};
init();

const checkSaved = function () {
  const storage = localStorage.getItem("saved");
  if (!storage) return;
  model.state.saved = JSON.parse(storage);
  SavedView.render(model.state.saved);
};
checkSaved();
