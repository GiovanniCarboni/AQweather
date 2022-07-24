import View from "./View";

class SavedView extends View {
  _parentEl = document.querySelector(".section-saved");

  _generateMarkup(savedArr) {
    return savedArr.map((item) => {
      return `
      <li class="saved-item">
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
    });
  }
}

export default new SavedView();
