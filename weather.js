const weather = document.querySelector(".js-weather");
const weatherDescription = document.querySelector(".js-weather-description");

const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;

      const weatherToday = json.weather[0].main;
      const weatherImageURL = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      console.log(weatherImageURL);
      const weatherImage = new Image(40, 40);
      weatherImage.src = weatherImageURL;

      weather.innerText = `${temperature}℃ @ ${place}`;

      const span = document.createElement("span");
      span.innerText = `${weatherToday}`;
      weatherDescription.appendChild(span);
      weatherDescription.appendChild(weatherImage);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
