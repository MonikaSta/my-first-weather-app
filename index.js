function formatDate(date) {
  let hours = date.getHours();
  if (hours < 0) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 0) {
    minutes = `0${minutes}`;
  }

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}
let currentDate = document.querySelector("#current-date");
let currentTime = new Date();

currentDate.innerHTML = formatDate(currentTime);

function displayCityTemp(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let h1 = document.querySelector("h1");
  if (cityInput < 0) {
    alert("Please enter your city");
  }
  let units = "metric";
  let apiKey = "980705a0ba4bf0987a707dd1c07fbc80";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;

  function displayForcast(response) {
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector("#current-temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector(
      "#humidity"
    ).innerHTML = `${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = `${Math.round(
      response.data.wind.speed
    )}km/h`;
    console.log(response.data);
  }
  axios(apiUrl).then(displayForcast);
}

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", displayCityTemp);
let yourTemp = document.querySelector("#current-location-weather");
yourTemp.addEventListener("click", displayMyTemp);

function displayMyTemp() {
  function showTemperature(response) {
    let currentLocation = response.data.name;
    let header = document.querySelector("h1");
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#current-temperature");
    header.innerHTML = `${currentLocation}`;
    temperatureElement.innerHTML = `${temperature}`;
    console.log(response);
  }

  function retrievePosition(position) {
    let longitude = Math.round(position.coords.longitude);
    let latitude = Math.round(position.coords.latitude);
    let apiKey = "980705a0ba4bf0987a707dd1c07fbc80";
    let units = "metric";
    let urlStartPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${urlStartPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
