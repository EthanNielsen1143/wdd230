function main() {
  const hamburgerButton = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".hero-container nav");
  const lastModifiedSpan = document.getElementById("lastModified");
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  if (navMenu && lastModifiedSpan) {
      const lastModified = new Date(document.lastModified);
      lastModifiedSpan.textContent = lastModified.toLocaleString();

      if (darkModeToggle) {
          darkModeToggle.addEventListener("change", () => {
              document.body.classList.toggle("dark-mode", darkModeToggle.checked);
          });
      }

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

              const currentTempElement = document.getElementById("current-temp");
              const currentDescElement = document.getElementById("current-description");

              const currentTempFahrenheit = celsiusToFahrenheit(
                  kelvinToCelsius(currentWeatherData.main.temp)
              );
              currentTempElement.innerText = `${currentTempFahrenheit.toFixed(2)}°F`;
              currentDescElement.innerText = currentWeatherData.weather[0].description;

              for (let i = 0; i < 3; i++) {
                  const forecastElement = document.getElementById(`day${i + 1}`);
                  const forecastTime = forecastData.list[i * 8].dt_txt;
                  const forecastTemp = celsiusToFahrenheit(
                      kelvinToCelsius(forecastData.list[i * 8].main.temp)
                  );
                  const forecastDesc = forecastData.list[i * 8].weather[0].description;

                  const date = new Date(forecastTime);
                  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
                      weekday: "long",
                  }).format(date);

                  forecastElement.innerHTML = `<strong>${dayOfWeek}</strong><br>${forecastTemp.toFixed(2)}°F, ${forecastDesc}`;
              }
          } catch (error) {
              console.error("Error fetching weather data:", error);
          }
      };

      fetchWeatherData();
  }

  const meetGreetBanner = document.getElementById("meetGreetBanner");
  const closeBannerButton = document.getElementById("closeBanner");

  function isMeetGreetDay() {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      return currentDay >= 0 && currentDay <= 3;
  }

  function updateBannerVisibility() {
      meetGreetBanner.style.display = isMeetGreetDay() ? "block" : "none";
  }

  updateBannerVisibility();

  closeBannerButton.addEventListener("click", () => {
      meetGreetBanner.style.display = "none";
  });

  const displaySpotlightMembers = (json) => {
      const spotlightContainer = document.querySelector('.spotlight');

      const silverGoldMembers = json.members.filter(member => member.tier === 'Silver' || member.tier === 'Gold');
      shuffleArray(silverGoldMembers);

      for (let i = 0; i < Math.min(3, silverGoldMembers.length); i++) {
          const member = silverGoldMembers[i];

          const card = document.createElement('div');
          card.classList.add('card');

          card.innerHTML = `
              <img src="${member.img}" alt="${member.name}">
              <p>${member.name}</p>
              <p>${member.address}</p>
              <p>${member.phoneNumber}</p>
              <p>${member.webiste}</p>
              <p>${member.tier} Tier</p>
          `;

          spotlightContainer.appendChild(card);
      }
  };

  const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  };

  const fetchJsonData = async () => {
      try {
          const response = await fetch('../data/members.json'); 
          const data = await response.json();

          displaySpotlightMembers(data);
      } catch (error) {
          console.error('Error fetching JSON data:', error);
      }
  };

  fetchJsonData();
}

document.addEventListener('DOMContentLoaded', main);
