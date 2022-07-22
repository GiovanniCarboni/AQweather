import "core-js/stable"; // this is for everything
import "regenerator-runtime/runtime"; // this is for async/await
import * as model from "./model.js";
import ResultsBoxView from "./views/resultsBoxView.js";

// if (module.hot) {
//   module.hot.accept();
// }

const controlCity = async function (searchWord) {
  try {
    await model.getCity(searchWord);

    ResultsBoxView.render(model.state.results);

    console.log(model.state);
  } catch (err) {
    ResultsBoxView.renderError();
    console.error("💣💣💣", err);
  }
};

const init = function () {
  ResultsBoxView.addHandlerResults(controlCity);
};
init();
