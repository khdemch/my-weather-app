function formatTime(time) {
    let hours = time.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }
  
  function formatDate(date) {
    let cDate = date.getDate();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    return `${cDate}.${month}`;
  }
  
  function formatDay(day) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let cDay = days[day.getDay()];
    return `${cDay}`;
  }

  function formatForecastDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }
  
  function showForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = "";
    
    forecast.forEach(function (forecastDay, index) {
      if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="weekdays" id="monday">
      ${formatForecastDay(forecastDay.dt)} <br />
      <img 
      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
      alt=""
      width="42"/><br />
      ${Math.round(forecastDay.temp.day)}°C
    </div>`;
      }
    });
    forecastElement.innerHTML = forecastHTML;
  }

  function changeToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#celcius");
    let temperature = temperatureElement.innerHTML;
    document.querySelector("#fahrenheit").innerHTML = Math.round(
      (temperature * 9) / 5 + 32
    );
  }

  function getForecast(coordinates) {
    let apiKey = "4788416fe9d12307dc056ca14675a0cf";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
  }
  
  function showWeather(response) {
    console.log(response);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#celcius").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#showHumidity").innerHTML =
      response.data.main.humidity;
    document.querySelector("#showWind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#showPressure").innerHTML =
      response.data.main.pressure;
    document.querySelector("#showVisibility").innerHTML = Math.round(
      response.data.visibility / 1000
    );
    if (
      response.data.weather[0].icon === "01d" ||
      response.data.weather[0].icon === "01n"
    ) {
      document.querySelector(".sunflower").setAttribute("src", `../images/sun.png`);
    } else {
      document
        .querySelector(".sunflower").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    }
    document.querySelector(".sunflower").setAttribute("alt", response.data.weather[0].description);
    getForecast(response.data.coord);
  }
  
  function search(city) {
    let apiKey = "4788416fe9d12307dc056ca14675a0cf";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function citySubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
  }
  
  function showPosition(position) {
    let apiKey = "4788416fe9d12307dc056ca14675a0cf";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  let now = new Date();
  let oclock = document.querySelector(".oclock");
  oclock.innerHTML = formatTime(now);
  
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = formatDate(now);
  
  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = formatDay(now);
  
 let form = document.querySelector("#search-form");
  form.addEventListener("submit", citySubmit);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", changeToFahrenheit);
  
  search("Kyiv");
  
  let currentLocationButton = document.querySelector(".gps");
  currentLocationButton.addEventListener("click", getCurrentPosition);
  