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
    console.error(err);
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

const init = function () {
  ResultsBoxView.addHandlerForm(controlCity);
  ResultsBoxView.addHandlerResults(controlWeather);
  SavedView.addHandlerSaved(controlSaved);
  SavedView.addHandlerOpenSaved();
  SavedView.addHandlerCloseSaved();
};
init();
