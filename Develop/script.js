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
            alert('Error fetching weather data. Please try again.');
        });
}