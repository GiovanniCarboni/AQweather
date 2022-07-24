import View from "./View";

class SavedView extends View {
  _parentEl = document.querySelector(".section-saved");

  addHandlerSaved(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const item = e.target.closest(".saved-item");
      if (!item) return;
      handler(item.id);
    });
  }

  _generateMarkup(savedArr) {
    console.log(savedArr);
    return savedArr
      .map((item) => {
        return `
      <li class="saved-item" id="${item.id}">
        <div class="saved-item--temp hot">39°</div>
        <div class="saved-item--city">${item.city} (${item.countryCode})</div>
        <button class="saved-item--delete btn saved-icon">
          <img
            src="${this.icons.closeCircle}"
            alt="close icon"
            width="25"
          />
        </button>
      </li>
      `;
      })
      .join("");
  }
}

export default new SavedView();
