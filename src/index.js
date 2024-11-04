// Handle the search form submission
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  if (city) {
    fetchWeatherData(city);
  }
}

// Fetch weather data from the API
function fetchWeatherData(city) {
  let apiKey = "396262bbd3oce4f20c3b41t44bae4cfa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

// Display the fetched temperature, city, humidity, description, and wind speed data
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperatureData");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}°C`;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  // Fetch and display humidity
  let humidityElement = document.querySelector("#current-humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `Humidity: <strong>${humidity}%</strong>`;

  // Fetch and display description
  let descriptionElement = document.querySelector("#current-description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = `${
    description.charAt(0).toUpperCase() + description.slice(1)
  }`;

  // Fetch and display wind speed
  let windElement = document.querySelector("#current-wind");
  let windSpeed = response.data.wind.speed;
  windElement.innerHTML = `Wind: <strong>${windSpeed} km/h</strong>`;

  // Fetch and display icon
  let iconElement = document.querySelector("#weather-icon");
  let iconUrl = response.data.condition.icon_url;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", description); // Set alt text to description
}

// Format date and time for display
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[date.getDay()];

  return `${formattedDay} ${hours}:${minutes}`;
}

// Event listeners and initializations
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
