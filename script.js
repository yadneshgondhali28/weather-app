
function main() {

  const apiKey = "553f9fb85e24973256385af7dd0a1081";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

  const searchInput = document.querySelector(".search input");
  const searchButton = document.querySelector(".search button");

  // validating input field
  function inputValidation() {
    if (searchInput.value === "") {
      showErrorMessage("city name cannot be blank.");
    }
    else {
      fetchWeatherApi(searchInput.value).catch(error => {
        console.log(error.message);
      });
    }
  }

  const carContainer = document.querySelector(".card");
  const weatherImage = carContainer.querySelector(".weather-icon");
  const temperature = carContainer.querySelector(".temp");
  const cityName = carContainer.querySelector(".city");
  const humidity = carContainer.querySelector(".humidity");
  const windSpeed = carContainer.querySelector(".wind-speed");
  const errorMsg = carContainer.querySelector(".error-msg");


  // show Error Message
  function showErrorMessage(error) {
    errorMsg.innerHTML = error;
    errorMsg.classList.add("show-error");
  }

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
      showErrorMessage(data.message);
      weatherImage.src = "Assets//imgs//noWeather.svg";
      temperature.innerHTML = "--" + "&deg;C";
      cityName.innerHTML = "---";
      humidity.innerHTML = "--%";
      windSpeed.innerHTML = "-- km/hr";
    }
    else {
      errorMsg.classList.remove("show-error");
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
    catch (error) {
      console.error(error);
    }
  }

  // adding window event listener
  window.addEventListener("DOMContentLoaded", () => {
    fetchWeatherApi("Mumbai");
  });


  // adding event listener on search btn.
  searchButton.addEventListener("click", () => {
    inputValidation();
  })

}

main();