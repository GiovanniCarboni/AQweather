import View from "./View";

class SavedView extends View {
  _parentEl = document.querySelector(".saved-list");
  _menuBtn = document.querySelector(".menu-btn");
  _sectionSaved = document.querySelector(".section-saved");
  _closeBtn = document.querySelector(".close-menu-btn");

  addHandlerOpenSaved() {
    const sectionSaved = this._sectionSaved;
    this._menuBtn.addEventListener("click", function () {
      sectionSaved.style.left = "0";
    });
  }

  addHandlerCloseSaved() {
    const sectionSaved = this._sectionSaved;
    this._closeBtn.addEventListener("click", function () {
      sectionSaved.style.left = "-50rem";
    });
  }

  addHandlerSaved(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const item = e.target.closest(".saved-item");
      if (!item) return;
      handler(item.id);
    });
  }

  _generateMarkup(savedArr) {
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
