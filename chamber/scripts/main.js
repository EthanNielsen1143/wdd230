document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu functionality
  const hamburgerButton = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.hero-container nav');
  const lastModifiedSpan = document.getElementById('lastModified');
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  if (hamburgerButton && navMenu && lastModifiedSpan) {
    hamburgerButton.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    const lastModified = new Date(document.lastModified);
    lastModifiedSpan.textContent = lastModified.toLocaleString();

    if (darkModeToggle) {
      darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
          document.body.classList.add("dark-mode");
        } else {
          document.body.classList.remove("dark-mode");
        }
      });
    }

  // Function to fetch weather data from OpenWeatherMap API
  const kelvinToCelsius = (kelvin) => kelvin - 273.15;
  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

const fetchWeatherData = async () => {
  try {
    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=38.752125&lon=-121.288010&appid=ad136a05b7f30c19817811ed609c2969`
    );
    const currentWeatherData = await currentWeatherResponse.json();

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=38.752125&lon=-121.288010&appid=ad136a05b7f30c19817811ed609c2969`
    );
    const forecastData = await forecastResponse.json();

    // Update current weather
    const currentTempElement = document.getElementById("current-temp");
    const currentDescElement = document.getElementById("current-description");

    // Convert temperature to Fahrenheit
    const currentTempFahrenheit = celsiusToFahrenheit(kelvinToCelsius(currentWeatherData.main.temp));
    currentTempElement.innerText = `${currentTempFahrenheit.toFixed(2)}°F`;
    currentDescElement.innerText = currentWeatherData.weather[0].description;

    // Update 3-day forecast
    for (let i = 0; i < 3; i++) {
      const forecastElement = document.getElementById(`day${i + 1}`);
      const forecastTime = forecastData.list[i * 8].dt_txt;
      const forecastTemp = celsiusToFahrenheit(kelvinToCelsius(forecastData.list[i * 8].main.temp));
      const forecastDesc = forecastData.list[i * 8].weather[0].description;

      const date = new Date(forecastTime);
      const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

      forecastElement.innerHTML = `<strong>${dayOfWeek}</strong><br>${forecastTemp.toFixed(2)}°F, ${forecastDesc}`;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};
  // Call the function to fetch weather data
  fetchWeatherData();
  } 

  const meetGreetBanner = document.getElementById("meetGreetBanner");
  const closeBannerButton = document.getElementById("closeBanner");

  function isMeetGreetDay() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    return currentDay >= 0 && currentDay <= 3; // Monday, Tuesday, or Wednesday
  }

  // Function to show/hide the meet and greet banner
  function updateBannerVisibility() {
    if (isMeetGreetDay()) {
      meetGreetBanner.style.display = "block";
    } else {
      meetGreetBanner.style.display = "none";
    }
  }

  // Initial banner visibility check
  updateBannerVisibility();

  closeBannerButton.addEventListener("click", function () {
    meetGreetBanner.style.display = "none";
  });
});

// const hamburgerButton = document.querySelector(".hamburger");
// const navMenu = document.querySelector("nav ul");
// const lastModifiedSpan = document.getElementById("lastModified");
// const temperatureDescriptionElement = document.getElementById(
//   "temperature-description"
// );
// const windChillElement = document.getElementById("wind-chill");
// const darkModeToggle = document.getElementById("dark-mode-toggle");
// const temperatureInput = document.getElementById("temperature-input");
// const windspeedInput = document.getElementById("windspeed-input");
// Function to calculate the temperature description
//   function calculateTempDescription(temperature) {
  //     let temperatureDescription = "";
  
  //     if (temperature <= 32) {
    //       temperatureDescription = "Freezing";
    //     } else if (temperature <= 50) {
      //       temperatureDescription = "Cold";
      //     } else if (temperature <= 70) {
        //       temperatureDescription = "Perfect";
        //     } else {
          //       temperatureDescription = "Hot";
          //     }
          
          //     temperatureDescriptionElement.textContent = temperatureDescription;
          //   }
          
          //   // Function to calculate wind chill
          //   function calculateWindChill(temperature, windspeed) {
            //     const windChill =
            //       35.74 +
            //       0.6215 * temperature -
  //       35.75 * Math.pow(windspeed, 0.16) +
  //       0.4275 * temperature * Math.pow(windspeed, 0.16);
  //     return windChill;
  //   }

  //   temperatureInput.addEventListener("input", function () {
  //     const temperature = parseFloat(temperatureInput.value);
  //     calculateTempDescription(temperature);
  //   });

  //   const submitButton = document.getElementById("submit-button");
  //   submitButton.addEventListener("click", function () {
  //     const temperature = parseFloat(temperatureInput.value);
  //     const windspeed = parseFloat(windspeedInput.value);

  //     if (temperature <= 50 && windspeed > 3.0) {
  //       const windChill = calculateWindChill(temperature, windspeed);
  //       windChillElement.textContent = windChill.toFixed(1);
  //     } else {
  //       windChillElement.textContent = "N/A";
  //     }
  //   });

  //   const initialTemperature = parseFloat(temperatureInput.value);
  //   calculateTempDescription(initialTemperature);
  //   const initialWindspeed = parseFloat(windspeedInput.value);
  //   calculateWindChill(initialTemperature, initialWindspeed);
  // }

  // let lastVisit = localStorage.getItem("lastVisit");
  // const welcomeMessage = document.getElementById("welcomeMessage");
  // if (!lastVisit) {
  //   welcomeMessage.textContent = 
  //     "Welcome! Let us know if you have any questions.";
  //   lastVisit = new Date();
  //   localStorage.setItem("lastVisit", JSON.stringify(lastVisit));
  // } else {
  //   const updatedVisit = new Date();
  //   const daysSinceLastVisit = Math.round(
  //     (updatedVisit - new Date(lastVisit)) / 86_400_000
  //   );
  //   welcomeMessage.textContent = daysSinceLastVisit
  //     ? `It's been ${daysSinceLastVisit} days since your last visit`
  //     : "Back so soon! Awesome!";
  //   localStorage.setItem("lastVisit", JSON.stringify(updatedVisit));
  // }




