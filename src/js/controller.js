import "core-js/stable"; // this is for everything
import "regenerator-runtime/runtime"; // this is for async/await
import * as model from "./model.js";
import ResultsBoxView from "./views/resultsBoxView.js";
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
