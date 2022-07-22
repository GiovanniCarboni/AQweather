import rainyIcon from "../../img/icons/rainy-outline.svg";
import moonIcon from "../../img/icons/moon-outline.svg";
import sunIcon from "../../img/icons/sunny-outline.svg";

class WeatherView {
  _parentEl = document.querySelector(".weather-display");

  render(weather) {
    console.log(weather);
    this._parentEl.textContent = "";
    this._parentEl.insertAdjacentHTML(
      "afterbegin",
      this._generateMarkup(weather)
    );
  }

  _generateMarkup(weather) {
    return `
    <div class="weather-main">
      <div class="weather-main--heading">
        <div class="display-name">${weather.city} (${weather.country})</div>
        <div class="display-temp">${weather.current.temp}°</div>
      </div>
      <div class="weather-main--description">
        <span>
          <img
            src="${rainyIcon}"
            width="40"
            alt="weather icon"
          />
        </span>
        <span class="description">${weather.current.description}</span>
      </div>
      <div class="weather-main--hourly">
        <ul class="hourly-list">
          ${this._generateMarkupHourly(weather.hourly)}
        </ul>
      </div>
    </div>

    <div class="weather-details">
      <div class="details-col-1">
        <div class="detail details--feels-like">
          <span class="details-tag">Feels like</span>
          <span class="details-entry feels-like">${
            weather.current.feelsLike
          }°</span>
        </div>
        <div class="detail details--humidity">
          <span class="details-tag">Humidity</span>
          <span class="details-entry humidity">${
            weather.current.humidity
          }%</span>
        </div>
        <div class="detail details--wind-speed">
          <span class="details-tag">Wind speed</span>
          <span class="details-entry wind-speed">${
            weather.current.windSpeed
          } km/h</span>
        </div>
        <div class="detail details--wind-direction">
          <span class="details-tag">Wind direction</span>
          <span class="details-entry wind-direction">${
            weather.current.windDirection
          } deg</span>
        </div>
      </div>
      <div class="details-col-2">
        <div class="detail details--coudiness">
          <span class="details-tag">Cloudiness</span>
          <span class="details-entry wind-cloudiness">${
            weather.current.cloudiness
          }%</span>
        </div>
        <div class="detail details--visibility">
          <span class="details-tag">Visibility</span>
          <span class="details-entry wind-visibility">${
            weather.current.visibility
          }m</span>
        </div>
        <div class="detail details--UVI-index">
          <span class="details-tag">UVI index</span>
          <span class="details-entry UVI-index">${weather.current.UVI}</span>
        </div>
        <div class="detail details--pressure">
          <span class="details-tag">Pressure</span>
          <span class="details-entry pressure">${
            weather.current.pressure
          }</span>
        </div>
      </div>
    </div>

    <div class="weather-daily">
      <ul class="daily-list">
        ${this._generateMarkupDaily(weather.daily)}
      </ul>
    </div>

            <button class="refresh-btn btn">
              <img
                src="src/img/icons/refresh-outline.svg"
                width="40"
                alt="refresh icon"
                class="refresh-icon"
              />
            </button>
            <button class="menu-btn btn">
              <img
                src="src/img/icons/menu-outline.svg"
                width="40"
                alt="menu icon"
                class="menu-icon"
              />
            </button>
    `;
  }
  _generateMarkupHourly(weatherHourly) {
    console.log(weatherHourly);
    return weatherHourly
      .map((hour) => {
        return `
      <li class="hourly-item">
        <div class="hourly-time">${hour.hour}</div>
          <div class="hourly-icon">
            <img
              src="${rainyIcon}"
              width="30"
              alt="weather icon"
             />
          </div>
        <div class="hourly-temp">${hour.temp}°</div>
      </li>
      `;
      })
      .join("");
  }
  _generateMarkupDaily(weatherDaily) {
    return weatherDaily
      .map((day) => {
        return `
      <li class="daily-item">
        <div class="daily-item--day">${day.day}</div>
        <div class="daily-item--desc">
        <div class="icon">
          <img
            src="${rainyIcon}"
            alt="rainy icon"
            width="40"
            class="forecast-icon"
            />
        </div>
        <div class="min-temp">min <span>${day.min}°</span></div>
        <div class="max-temp">max <span>${day.max}°</span></div>
        <div class="sunset">
          <img
            src="${moonIcon}"
            alt="moon icon"
            width="20"
          /><span>${day.sunset}</span>
        </div>
        <div class="sunrise">
          <img
            src="${sunIcon}"
            alt="sun icon"
            width="23"
          /><span>${day.sunrise}</span>
        </div>
      </div>
    </li>
      `;
      })
      .join("");
  }
}

export default new WeatherView();
