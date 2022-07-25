import View from "./View.js";

class WeatherView extends View {
  _parentEl = document.querySelector(".weather-display");
  _refreshBtn = document.querySelector(".refresh-btn");

  addHandlerRefresh(handler) {
    this._refreshBtn.addEventListener("click", handler);
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
            src="${this.icons[weather.current.main]}"
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
          }°</span>
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
              src="${this.icons[hour.main]}"
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
            src="${this.icons[day.main]}"
            alt="rainy icon"
            width="40"
            class="forecast-icon"
            />
        </div>
        <div class="min-temp">min <span>${day.min}°</span></div>
        <div class="max-temp">max <span>${day.max}°</span></div>
        <div class="sunset">
          <img
            src="${this.icons.moon}"
            alt="moon icon"
            width="20"
          />
          <span>${day.sunset}</span>
        </div>
        <div class="sunrise">
          <img
            src="${this.icons.sun}"
            alt="sun icon"
            width="23"
          />
          <span>${day.sunrise}</span>
        </div>
      </div>
    </li>
      `;
      })
      .join("");
  }
}

export default new WeatherView();
