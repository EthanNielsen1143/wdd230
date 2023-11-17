async function getWeather() {
    const apiURL = "https://api.weatherapi.com/v1/current.json?key=8ec5743ac3494d3c99b213540231611&q=Roseville,Ca&aqi=no";
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    displayWeather(data);
}

const displayWeather = (data) => {
    const current = data.current
    const temp = current.temp_f
    const condition = current.condition.text
    const icon = current.condition.icon
    
    const tempElement = document.getElementById('weather-temp');
    const conditionElement = document.getElementById('weather-desc');
    const iconElement = document.getElementById('weather-icon');

    iconElement.src = `http:${icon}`;
    tempElement.textContent = `Temp: ${temp}\u00B0F`;
    conditionElement.textContent = `Condition: ${condition}`;
}

getWeather();