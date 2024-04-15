async function getWeatherByCity(cityName, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.cod==404){
            alert("enter a valid city");
            document.getElementById("city-text").value="";
        }
        return data;
    } catch (error) {
        console.log("Error fetching weather data:", error);
        return error;
    }
}

document.getElementById("Search").addEventListener("click", () => {
    const cityName = document.getElementById("city-text").value;
    if (cityName.trim()!== "") {
        fetchWeather(cityName);
    } else {
        console.error("City name cannot be empty");
    }
});

function fetchWeather(cityName) {
    let apiKey="8a3e45c8094a0395c06727f1ffe9ec01";
    getWeatherByCity(cityName, apiKey)
       .then(weatherData => {
            if(weatherData.cod==200){
            console.log(weatherData);
            let iconurl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
            
            document.getElementById("temp").innerHTML=Math.floor((weatherData.main.temp-273))+"<sup>o</sup>"+"C";
            document.getElementById('wicon').setAttribute('src', iconurl);
            document.getElementById("humidity").innerHTML=(weatherData.main.humidity)+"%";
            document.getElementById("pressure").innerHTML=(weatherData.main.pressure);
            document.getElementById("windspeed").innerHTML=weatherData.wind.speed+"km/ph";
            document.getElementById("information").style.display="flex";
            document.getElementById("buttonandname").style.display="none";
            document.getElementById("heading").innerHTML=weatherData.name;
            }
        })
       .catch(error => {
            console.error("An error occurred:", error);
        });
}
document.getElementById("ok").addEventListener("click",()=>{
    document.getElementById("information").style.display="none";
    document.getElementById("buttonandname").style.display="flex";
    document.getElementById("heading").innerHTML="Location Search";
})