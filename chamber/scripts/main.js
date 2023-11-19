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

    async function getWeather() {
      // const url = "https://api.openweathermap.org/data/2.5/onecall?lat=49.750000&lon=6.633333&appid=785f1aebf1a53ae8d37c7db6bf435044";
      const url = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=49.750000&lon=6.633333&cnt=3&appid=e3656fdda1b05098664b45f92e5a2e0c";
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          displayWeather(data);
        } else {
          throw Error(await response.text());
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    const displayWeather = (data) => {
      const forecastContainer = document.querySelector('#forecast-container');
    
      for (let i = 1; i <= 3; i++) {
        const dailyData = data.daily[i];
        const date = new Date(dailyData.dt * 1000); // Convert Unix timestamp to JavaScript date object
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    
        const tempMin = Math.round(dailyData.temp.min - 273.15) * 9/5 + 32;
        const tempMax = Math.round(dailyData.temp.max - 273.15) * 9/5 + 32;
        const description = dailyData.weather[0].description;
        const icon = dailyData.weather[0].icon;
    
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        console.log(tempMin);
        forecastItem.innerHTML = `
          <p>${day}</p>
          <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
          <p>Min: ${tempMin}\u00B0F</p>
          <p>Max: ${tempMax}\u00B0F</p>
          <p>${description}</p>
        `;
    
        forecastContainer.appendChild(forecastItem);
      }
    }
    getWeather();
  } 
  const meetGreetBanner = document.getElementById("meetGreetBanner");
  const closeBannerButton = document.getElementById("closeBanner");

  function isMeetGreetDay() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    return currentDay >= 1 && currentDay <= 3; // Monday, Tuesday, or Wednesday
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




