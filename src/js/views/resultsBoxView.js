class ResultsBoxView {
  _parentEl = document.querySelector(".results-box");
  _errorMessage = "Could not find city";
  _form = document.querySelector(".search-bar-container");
  _searchBar = document.querySelector(".search-bar");

  render(data) {
    this._parentEl.textContent = "";
    this._parentEl.classList.remove("hidden");
    this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup(data));
  }

  renderError() {
    this._parentEl.classList.remove("hidden");
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      `<p class="error-message">${this._errorMessage}</p>`
    );
  }

  addHandlerResults(handler) {
    const searchBar = this._searchBar;
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler(searchBar.value);
    });
  }

  _generateMarkup(data) {
    const resultslist = data
      .map(
        (result) =>
          `<li class="results-item"><a href="#">${result.city}, ${result.state}, ${result.country}</a></li>`
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
