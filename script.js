const cityName = document.querySelector("#cityNameDisplay"); //Selektor wyświetlania nazwy miasta
const userInput = document.querySelector("#userInput"); //Selektor danych użytkownika
const searchBtn = document.querySelector("#searchBtn");//Selektor przycisku
const emojiDisplay = document.querySelector("#emojiDisplay");//Selektor do wyświetlania emoji pogody
const tempDisplay = document.querySelector("#tempDisplay")//Selektor do wyświetlania temperatury
const weatherDisplay = document.querySelector("#weatherDisplay")//Selektor do wyświetlanie opisu pogody
const cardTemp = document.querySelector("#cardTemp");//Selektor do wyświetlania odczuwalnej temperatury
const cardPressure = document.querySelector("#cardPressure");//Seletor do wyświetlania cisnienia
const cardWind = document.querySelector("#cardWind");//Selektor do wyświetlania prędkości wiatru
const nextDaysDisplay = document.querySelector("#nextDaysDisplay");//Selektor do wyświetlania następnych dni

const icons = {
    "clear-day": "☀️",
    "clear-night": "🌙",
    "partly-cloudy-day": "⛅",
    "partly-cloudy-night": "🌙☁️",
    cloudy: "☁️",
    fog: "🌫️",
    wind: "💨",
    rain: "🌧️",
    "showers-day": "🌦️",
    "showers-night": "🌧️",
    snow: "❄️",
    thunderstorm: "⛈️",
    hail: "🌨️"
};

main();
searchBtn.addEventListener("click", () => {
    main();
}
)

async function fetchingData(city) {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=3MH5ADQUCEYJDWKH5CSM6LZMA`
    const response = await fetch(apiUrl);
    if (!response.ok) {
        catchingError("Could not fetch weather data");
        throw new Error("Could not fetch weather data");

    }
    return await response.json();
} //Funkcja pobiera dane z API i zwraca w postaci json

async function main() {
    let imput = userInput.value;
    if (imput === "") {
        imput = "Tokyo";
    }
    const fetchedData = await fetchingData(imput);
    displayInfo(fetchedData);
    console.log(fetchedData);
    displaingNextDays(fetchedData);
}

function displayInfo(data) {
    const { address, currentConditions: { temp, feelslike, pressure,
        windspeed, icon }, description } = data;
    const celciusTemp = convertingToCelcius(temp);
    const feelslikeCelcius = convertingToCelcius(feelslike);
    emojiDisplay.innerHTML = icons[icon]
    cityName.innerHTML = address;
    tempDisplay.innerHTML = `${celciusTemp.toFixed(1)}°C`;
    cardTemp.innerHTML = `${feelslikeCelcius.toFixed(1)}°C`;
    cardPressure.innerHTML = `${pressure} hPa`;
    cardWind.innerHTML = `${windspeed} km/h`;
    weatherDisplay.innerHTML = description;
};

function displaingNextDays(data) {
    const { days } = data;
    nextDaysDisplay.innerHTML = "";
    for (let i = 1; i < 7; i++) {
        let currentDay = days[i];
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("nexDayCard");
        const currentDayDisplay = document.createElement("h1");
        const minTemp = document.createElement("h4");
        const maxTemp = document.createElement("h4");
        const currentTemp = document.createElement("h2");

        currentDayDisplay.innerHTML = dayName(currentDay.datetime);
        minTemp.innerHTML = `Min: ${convertingToCelcius(currentDay.tempmin).toFixed(1)}°C`;
        maxTemp.innerHTML = `Max: ${convertingToCelcius(currentDay.tempmax).toFixed(1)}°C`;
        currentTemp.innerHTML = `${convertingToCelcius(currentDay.temp).toFixed(1)}°C`;
        cardContainer.appendChild(currentDayDisplay);
        cardContainer.appendChild(currentTemp);
        cardContainer.appendChild(minTemp);
        cardContainer.appendChild(maxTemp);
        nextDaysDisplay.appendChild(cardContainer);

    }
}

function convertingToCelcius(temp) {
    let celcius = (temp - 32) * 5 / 9;
    return celcius;
}


function dayName(data) {
    const dateString = data;
    const date = new Date(dateString);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sa"];

    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
}

