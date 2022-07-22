class ResultsBoxView {
  _parentEl = document.querySelector(".results-box");
  _errorMessage = "Could not find city";

  render(data) {
    // this._parentEl.textContent = "";
    this._parentEl.classList.remove("hidden");
    this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup(data));
  }

  renderError() {
    this._parentEl.classList.remove("hidden");
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      this._generateErrorMarkup()
    );
  }

  _generateErrorMarkup() {
    return `
    <p class="error-message">${this._errorMessage}</p>`;
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
