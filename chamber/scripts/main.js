document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu functionality
  const hamburgerButton = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");
  const lastModifiedSpan = document.getElementById("lastModified");
  const temperatureDescriptionElement = document.getElementById(
    "temperature-description"
  );
  const windChillElement = document.getElementById("wind-chill");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const temperatureInput = document.getElementById("temperature-input");
  const windspeedInput = document.getElementById("windspeed-input");

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
      const windChill =
        35.74 +
        0.6215 * temperature -
        35.75 * Math.pow(windspeed, 0.16) +
        0.4275 * temperature * Math.pow(windspeed, 0.16);
      return windChill;
    }

    temperatureInput.addEventListener("input", function () {
      const temperature = parseFloat(temperatureInput.value);
      calculateTempDescription(temperature);
    });

    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", function () {
      const temperature = parseFloat(temperatureInput.value);
      const windspeed = parseFloat(windspeedInput.value);

      if (temperature <= 50 && windspeed > 3.0) {
        const windChill = calculateWindChill(temperature, windspeed);
        windChillElement.textContent = windChill.toFixed(1);
      } else {
        windChillElement.textContent = "N/A";
      }
    });

    const initialTemperature = parseFloat(temperatureInput.value);
    calculateTempDescription(initialTemperature);
    const initialWindspeed = parseFloat(windspeedInput.value);
    calculateWindChill(initialTemperature, initialWindspeed);
  }

  let lastVisit = localStorage.getItem("lastVisit");
  if (!lastVisit) {
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.textContent =
      "Welcome! Let us know if you have any questions.";
    lastVisit = new Date();
    localStorage.setItem("lastVisit", JSON.stringify(lastVisit));
  } else {
    const updatedVisit = new Date();
    const daysSinceLastVisit = Math.round(
      (updatedVisit - new Date(lastVisit)) / 86_400_000
    );
    welcomeMessage.textContent = daysSinceLastVisit
      ? `It's been ${daysSinceLastVisit} days since your last visit`
      : "Back so soon! Awesome!";
    localStorage.setItem("lastVisit", JSON.stringify(updatedVisit));
  }
});

// // Call the function to display the appropriate message
// displayVisitMessage();

// const resizeContent = () => {
//   const sidebar = document.getElementsByClassName('side-column-cards')[0];
//   const content = document.getElementsByClassName('content')[0];
//   content.style.maxHeight = `${sidebar.clientHeight}px`
// }

// window.addEventListener('resize', resizeContent);
// window.onload = resizeContent
