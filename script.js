const apiKey = "7b8f84ee91932ff6dac2e7a343afc49b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting elements using the new specific target classes
const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather img");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        alert("Invalid city name");
    } else {
        const data = await response.json();

        // Update Text Elements using targeted utility classes
        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".city-temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity-val").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind-val").innerHTML = data.wind.speed + " km/h";

        // Map OpenWeatherMap "Main" condition string to your image assets
        const condition = data.weather[0].main;

        if (condition === "Clear") {
            weatherIcon.src = "images/sun.png"; 
        } else if (condition === "Clouds") {
            const cloudDesc = data.weather[0].description;
            if (cloudDesc.includes("few") || cloudDesc.includes("scattered")) {
                weatherIcon.src = "images/cloudy.jpg";
            } else {
                weatherIcon.src = "images/mainlyCloud.jpg"; 
            }
        } else if (condition === "Rain" || condition === "Drizzle") {
            weatherIcon.src = "images/rain.jpg";
        } else if (condition === "Thunderstorm") {
            weatherIcon.src = "images/thunderRain.jpg";
        } else if (condition === "Snow") {
            weatherIcon.src = "images/snow.jpg";
        } else if (condition === "Atmosphere" || condition === "Mist" || condition === "Haze") {
            weatherIcon.src = "images/wind.jpg"; 
        } else {
            weatherIcon.src = "images/cloud.jpg"; 
        }
    }
}

// Event Listeners for action triggers
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});