async function getWeather() {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.750000&lon=6.633333&appid=ad136a05b7f30c19817811ed609c2969";
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
    const temp = Math.round(data.main.temp - 273.15) * 9/5 + 32;
    const main = data.weather[0].main;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    
    console.log(temp);
    
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('figcaption');
    
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
    currentTemp.textContent = `Temp: ${temp}\u00B0F`;
    captionDesc.textContent = `${main} - ${desc.charAt(0).toUpperCase()+desc.slice(1)}`;
}

document.addEventListener('DOMContentLoaded', getWeather) 