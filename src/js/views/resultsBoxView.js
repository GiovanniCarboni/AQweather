import View from "./View.js";

class ResultsBoxView extends View {
  _parentEl = document.querySelector(".results-box");
  _form = document.querySelector(".search-bar-container");
  _searchBar = document.querySelector(".search-bar");
  _errorMessage = "Could not find city";

  addHandlerForm(handler) {
    const that = this;
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler(that._searchBar.value);
      that._searchBar.value = "";
      that._parentEl.classList.remove("hidden");
    });
  }

  addHandlerResults(handler) {
    const that = this;
    this._parentEl.addEventListener("click", function (e) {
      if (!e.target.classList.contains("results-item-link")) return;
      that._parentEl.classList.add("hidden");
      handler(e.target.id);
    });
  }

  _generateMarkup(data) {
    const resultslist = data
      .map(
        (result) =>
          `<li class="results-item"><a class="results-item-link" id="${result.city}%${result.lat}:${result.lon}" href="#">${result.city}, ${result.state}, ${result.countryCode}</a></li>`
      )
      .join("");

    return `
      <ul class="results-list">
      ${resultslist}        
      </ul>
    `;
  }
}

export default new ResultsBoxView();
