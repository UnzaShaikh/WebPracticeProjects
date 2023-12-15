const apiKey = "ef7fcb2529755929ed68af2e9c099919";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if(response.status == 404){
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display = "none";
        }else{
            var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "/Project2/images/clouds.png";
            } else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "/Project2/images/clear.png";
            } else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "/Project2/images/rain.png";
            }else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "/Project2/images/drizzle.png";
            }else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "/Project2/images/mist.png";
            }else if(data.weather[0].main == "Snow"){
                weatherIcon.src = "/Project2/images/snow.png";
            }else if(data.weather[0].main == "Haze"){
                weatherIcon.src = "/Project2/images/haze.png";
            }
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display="none";
        }

     

    } 
searchBtn.addEventListener("click", async () => {
    const city = searchBox.value;
    if (city) {
        await checkWeather(city);
    } else {
        console.log("Please enter a city name");
    }
});

searchBox.addEventListener("keyup", async (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value;
        if (city) {
            await checkWeather(city);
        } else {
            console.log("Please enter a city name");
        }
    }
});
