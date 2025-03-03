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

searchBtn.addEventListener("click", async () => {
    let imput = userInput.value;
    const fetchedData = await fetchingData(imput);
    displayInfo(fetchedData);
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

function main() {

    let dataApi = fetchingData(imput);
    console.log(dataApi);
    // displayInfo(dataApi);
}

function displayInfo(data) {
    const { address, currentConditions: { temp } } = data;
    cityName.innerHTML = address;
    const celciusTemp = convertingToCelcius(temp);
    tempDisplay.innerHTML = `${celciusTemp.toFixed(1)}°C`;
    // tempDisplay.innerHTML = data.currentConditions.temp;
}

function convertingToCelcius(temp) {
    let celcius = (temp - 32) * 5 / 9;
    return celcius;
}