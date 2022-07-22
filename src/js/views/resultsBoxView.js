import loadingIcon from "../../img/icons/refresh-outline.svg";

class ResultsBoxView {
  _parentEl = document.querySelector(".results-box");
  _errorMessage = "Could not find city";
  _form = document.querySelector(".search-bar-container");
  _searchBar = document.querySelector(".search-bar");

  render(data) {
    this._clear();

    this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup(data));
  }

  renderError() {
    this._clear();
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      `<p class="error-message">${this._errorMessage}</p>`
    );
  }
  // src="src/img/icons/refresh-outline.svg"

  renderSpinner() {
    this._clear();
    const spinner = `
    <div class="spinner">
      <img
        src="${loadingIcon}"
        alt="loading icon"
        width="40"
      />
    </div>`;
    this._parentEl.insertAdjacentHTML("afterbegin", spinner);
  }

  addHandlerForm(handler) {
    const searchBar = this._searchBar;
    const parentEl = this._parentEl;
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      parentEl.classList.remove("hidden");
      handler(searchBar.value);
    });
  }

  addHandlerResults(handler) {
    const parentEl = this._parentEl;
    this._parentEl.addEventListener("click", function (e) {
      if (!e.target.classList.contains("results-item-link")) return;
      parentEl.classList.add("hidden");
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
  _clear() {
    this._parentEl.textContent = "";
  }
}

export default new ResultsBoxView();
