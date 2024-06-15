// fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=553f9fb85e24973256385af7dd0a1081')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.log('Error:', error));


function main() {

  const apiKey = "553f9fb85e24973256385af7dd0a1081";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

  const searchInput = document.querySelector(".search input");
  const searchButton = document.querySelector(".search button");

  // validating input field
  function inputValidation() {
    if (searchInput.value === "") {
      alert("city name cannot be blank.");
    }
    else {
      fetchWeatherApi(searchInput.value);
    }
  }

  const carContainer = document.querySelector(".card");
  const weatherImage = carContainer.querySelector(".weather-icon");
  const temperature = carContainer.querySelector(".temp");
  const cityName = carContainer.querySelector(".city");
  const humidity = carContainer.querySelector(".humidity");
  const windSpeed = carContainer.querySelector(".wind-speed");

  // showing weather data
  function showWeatherData(data) {
    weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.innerHTML = Math.round(data.main.temp) + `&deg;C`;
    cityName.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + `%`;
    windSpeed.innerHTML = Math.round(data.wind.speed * (18 / 5)) + ` km/hr`;
  }

  // validating city name
  function cityNameValidation(data) {
    if (!(data.cod === 200)) {
      weatherImage.src = "Assets//imgs//noWeather.svg";
      temperature.innerHTML = "--" + "&deg;C";
      cityName.innerHTML = "---";
      humidity.innerHTML = "--%";
      windSpeed.innerHTML = "-- km/hr";
    }
    else {
      showWeatherData(data);
    }
  }

  // fetching weather api
  async function fetchWeatherApi(city) {
    try {
      const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
      const data = await response.json();
      cityNameValidation(data);
    }
    catch (err) {
      console.error(err);
    }
  }

  // adding window event listener
  window.addEventListener("DOMContentLoaded", () => {
    try {
      fetchWeatherApi("Mumbai");
    }
    catch (err) {
      console.error(err.message);
    }
  });


  // adding event listener on search btn.
  searchButton.addEventListener("click", () => {
    inputValidation();
  })

}

main();