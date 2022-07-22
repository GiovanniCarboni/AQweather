import "core-js/stable"; // this is for everything
import "regenerator-runtime/runtime"; // this is for async/await
import * as model from "./model.js";
import ResultsBoxView from "./views/resultsBoxView.js";

// if (module.hot) {
//   module.hot.accept();
// }

const controlWeather = async function () {
  try {
    await model.getWeather("cape city");

    ResultsBoxView.render(model.state.results);
  } catch (err) {
    ResultsBoxView.renderError();
    console.error("💣💣💣", err);
  }
};

const init = function () {
  controlWeather();
};
init();
