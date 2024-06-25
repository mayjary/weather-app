 // Replace with your Pexels API key


function getweather() {
    const apikey = `d9dc0e6dd1c702102b4e5d0992426f35`;
    const city = document.getElementById('city').value;

    if (!city) {
        alert(`Please enter a city`);
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayweather(data);
        })
        .catch(error => {
            console.log(`Error fetching current weather data:`, error);
            alert(`Error fetching data, please try again`);
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list); // Corrected to pass the list of forecasts
        })
        .catch(error => {
            console.log(`Error fetching current forecast data:`, error);
            alert(`Error fetching forecast data, please try again`);
        });

        async function getRandomImage() {
            const API_KEY = 'lslCfHXUoDSNTJwGyx1yuVM5yH8dBVGdmTvVdt6km4e6Dp1q8fIr5vER';
            const url = 'https://api.pexels.com/v1/search?query='+ city +'&per_page=1&page=' + Math.floor(Math.random() * 1000);
        
            const response = await fetch(url, {
                headers: {
                    Authorization: API_KEY
                }
            });
        
            const data = await response.json();
            const imageUrl = data.photos[0].src.original;
            document.body.style.backgroundImage = `url(${imageUrl})`;
            
        }
        
        getRandomImage();
}

function showImage() {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = `block`;
    }


function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0,8);
    
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt *1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl =  `https://openweathermap.org/img/wn/${iconCode}.png`;
    
        const hourlyItemHtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="hourly-weather-icon"/>
            <span>${temperature}°C</span>
        </div>`;
    
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}
    
function displayweather(data){
    const tempdiv = document.getElementById(`temp-div`);
    const weatherInfoDiv = document.getElementById(`weather-info`);
    const weathericon = document.getElementById('weather-icon');
    const hourlyForecast = document.getElementById('hourly-forecast');

    //Clearence
    weatherInfoDiv.innerHTML = '';
    weathericon.src = '';
    hourlyForecast.innerHTML = '';

    if (data.cod == '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        
        const temperatureHTML = `
        <p>${temperature}°C</p>
        `;
        const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>
        `;

        tempdiv.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weathericon.src = iconUrl;
        weathericon.alt = description;

        showImage();
    }

}








