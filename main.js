var apiKey = config.API_KEY;
var baseURL = config.BASE_URL;

const api = {
  key: apiKey,
  base: baseURL,
};

const setQuery = (e) => {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
  }
};

const getResults = (query) => {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
};

const displayResults = (weather) => {
  if (weather.message == "city not found") {
    alert("I can't find that city");
  }

  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = `${weather.weather[0].main} / ${weather.weather[0].description}`;

  let hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;

  let sunrise = new Date(0);
  sunrise.setUTCSeconds(weather.sys.sunrise);

  let sunset = new Date(0);
  sunset.setUTCSeconds(weather.sys.sunset);

  let riseSet = document.querySelector(".current .rise-set");
  riseSet.innerText = `Sunrise is at ${formatTime(
    sunrise
  )}, sunset is at ${formatTime(sunset)} according to your timezone.`;
};

const formatTime = (time) => {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const str = `${hours}:${minutes} ${ampm}`;
  return str;
};

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);
