const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const API_KEY = 'd17a9d0a1cf31171feebed2714a02008';     

searchButton.addEventListener('click', fetchWeatherData);
function fetchWeatherData() {
    const cityName = cityInput.value;
    const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${API_KEY}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            displayForecast(data);
            storeSearchHistory(cityName);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
}
function displayCurrentWeather(data) {
    document.getElementById('city-name-date').textContent = `${data.city.name} (${new Date().toLocaleDateString()})`;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    document.getElementById('temperature').textContent = `Temperature: ${data.list[0].main.temp}°F`;
    document.getElementById('humidity').textContent = `Humidity: ${data.list[0].main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.list[0].wind.speed} m/s`;
}

function displayForecast(data) {
    for (let i = 0; i < 5; i++) {
        const forecastData = data.list[(i + 1) * 8];
        const dayElem = document.getElementById(`day${i + 1}`);

        dayElem.querySelector('.forecast-date').textContent = new Date(forecastData.dt * 1000).toLocaleDateString();
        dayElem.querySelector('.forecast-icon').src = `https://openweathermap.org/img/w/${forecastData.weather[0].icon}.png`;
        dayElem.querySelector('.forecast-temperature').textContent = `Temperature: ${forecastData.main.temp}°F`;
        dayElem.querySelector('.forecast-wind-speed').textContent = `Wind Speed: ${forecastData.wind.speed} m/s`;
        dayElem.querySelector('.forecast-humidity').textContent = `Humidity: ${forecastData.main.humidity}%`;
    }
}

function storeSearchHistory(cityName) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (searchHistory.indexOf(cityName) === -1) {
        searchHistory.push(cityName);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory();
    }
}

function displaySearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const historyList = document.getElementById('search-history-list');
    historyList.innerHTML = '';
    for (const city of searchHistory) {
        const li = document.createElement('li');
        li.textContent = city;
        li.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeatherData();
        });
        historyList.appendChild(li);
    }
}

displaySearchHistory();