import closeOutline from "../../img/icons/close-outline.svg";
import moon from "../../img/icons/moon-outline.svg";
import drizzle from "../../img/icons/weather-icons/drizzle.svg";
import clear from "../../img/icons/weather-icons/clear.svg";
import clouds from "../../img/icons/weather-icons/clouds.svg";
import mist from "../../img/icons/weather-icons/mist.svg";
import rain from "../../img/icons/weather-icons/rain.svg";
import snow from "../../img/icons/weather-icons/snow.svg";
import thunderstorm from "../../img/icons/weather-icons/thunderstorm.svg";

export default class View {
  icons = {
    moon,
    closeOutline,
    drizzle,
    clear,
    clouds,
    mist,
    rain,
    snow,
    thunderstorm,
  };

  render(data) {
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup(data));
  }
  _clear() {
    this._parentEl.textContent = "";
  }
}