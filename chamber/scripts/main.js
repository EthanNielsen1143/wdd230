document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu functionality
    const hamburgerButton = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const lastModifiedSpan = document.getElementById('lastModified');
    const temperatureDescriptionElement = document.getElementById('temperature-description');
    const windChillElement = document.getElementById('wind-chill');
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const temperatureInput = document.getElementById("temperature-input");
    const windspeedInput = document.getElementById("windspeed-input");
  
    if (hamburgerButton && navMenu && lastModifiedSpan) {
      hamburgerButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });
  
      const lastModified = new Date(document.lastModified);
      lastModifiedSpan.textContent = lastModified.toLocaleString();
  
      if (darkModeToggle) {
        darkModeToggle.addEventListener("change", () => {
          if (darkModeToggle.checked) {
            // Enable dark mode
            document.body.classList.add("dark-mode");
          } else {
            // Disable dark mode
            document.body.classList.remove("dark-mode");
          }
        });
      }
  
      // Function to calculate the temperature description
      function calculateTempDescription(temperature) {
        let temperatureDescription = "";
  
        if (temperature <= 32) {
          temperatureDescription = "Freezing";
        } else if (temperature <= 50) {
          temperatureDescription = "Cold";
        } else if (temperature <= 70) {
          temperatureDescription = "Perfect";
        } else {
          temperatureDescription = "Hot";
        }
  
        temperatureDescriptionElement.textContent = temperatureDescription;
      }
  
      // Function to calculate wind chill
      function calculateWindChill(temperature, windspeed) {
        const windChill = 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windspeed, 0.16) + 0.4275 * temperature * Math.pow(windspeed, 0.16);
        return windChill;
      }
  
      // Add event listener to update temperature description when input changes
      temperatureInput.addEventListener("input", function () {
        const temperature = parseFloat(temperatureInput.value);
        calculateTempDescription(temperature);
      });
  
      // Add event listener to calculate wind chill when the Submit button is clicked
      const submitButton = document.getElementById("submit-button");
      submitButton.addEventListener("click", function () {
        // Get temperature and wind speed values
        const temperature = parseFloat(temperatureInput.value);
        const windspeed = parseFloat(windspeedInput.value);
  
        // Check if values meet the specification limits
        if (temperature <= 50 && windspeed > 3.0) {
          // Calculate wind chill
          const windChill = calculateWindChill(temperature, windspeed);
          windChillElement.textContent = windChill.toFixed(1); // Display wind chill with one decimal place
        } else {
          // Values do not meet the specification limits
          windChillElement.textContent = "N/A";
        }
      });
  
      // Initialize the temperature description and wind chill
      const initialTemperature = parseFloat(temperatureInput.value);
      calculateTempDescription(initialTemperature);
      const initialWindspeed = parseFloat(windspeedInput.value);
      calculateWindChill(initialTemperature, initialWindspeed);
    }
  });
  