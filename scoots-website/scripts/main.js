document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch weather data from OpenWeatherMap API
    function fetchWeather() {
      const apiKey = 'e3656fdda1b05098664b45f92e5a2e0c'; 
      const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Cozumel&appid=' + apiKey;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Update the weather section with the fetched data
          const weatherSection = document.getElementById('weather-section');
          weatherSection.innerHTML = `
            <h2>Current Weather</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Forecast for tomorrow at 3:00 PM: ${getTomorrowForecast(data.weather)}</p>
            ${getWeatherDetails(data.weather)}
          `;
  
          // Display a closeable message with the high temperature for the current day
          const closeableMessage = document.getElementById('closeable-message');
          closeableMessage.innerHTML = `
            <p>High temperature for today: ${data.main.temp_max}°C</p>
            <span class="close" onclick="closeMessage()">&times;</span>
          `;
          closeableMessage.style.display = 'block';
          
          // Attach click event listener to the close button
          const closeButton = closeableMessage.querySelector('.close');
          closeButton.addEventListener('click', closeMessage);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  
    // Function to get tomorrow's forecast from the weather data
    function getTomorrowForecast(weatherData) {
      return weatherData[0].description;
    }
  
    // Function to display all weather data points
    function getWeatherDetails(weatherData) {
      let detailsHTML = '<p>Weather Details:</p><ul>';
      weatherData.forEach(detail => {
        detailsHTML += `<p>${detail.main}: ${detail.description} <img src="http://openweathermap.org/img/w/${detail.icon}.png" alt="Weather icon"></p>`;
      });
      detailsHTML += '</ul>';
      return detailsHTML;
    }
  
    // Function to close the message
    function closeMessage() {
      const closeableMessage = document.getElementById('closeable-message');
      closeableMessage.style.display = 'none';
    }
  
    // Call the fetchWeather function when the page is loaded
    fetchWeather();
  });
  