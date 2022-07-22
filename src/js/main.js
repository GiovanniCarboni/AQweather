import "core-js/stable"; // this is for everything
import "regenerator-runtime/runtime"; // this is for async/await
import * as model from "./model.js";

// if (module.hot) {
//   module.hot.accept();
// }

const controlWeather = async function () {
  try {
    await model.getWeather();
    console.log(model.state.weather);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  controlWeather();
};
init();
