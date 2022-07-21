import "core-js/stable"; // this is for everything
import "regenerator-runtime/runtime"; // this is for async/await
import * as model from "./model.js";

if (module.hot) {
  module.hot.accept();
}
