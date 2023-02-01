// Variables
const searchBtn = document.querySelector('.btn');
const showWheather = document.querySelector('.show-wheathe');
const cityName = document.querySelector('.city-name');
const showIcon = document.querySelector(".icon");
const showTemp = document.querySelector('.temp');
const showHumidity = document.querySelector('.humidity');
const showWind = document.querySelector('.wind');
const searchList = document.querySelector('.list-group');

// Get the latitude and longitude of the city
function getLatitudeAndLongitude() {
    let cityId = document.querySelector('#tags').value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityId} &appid=843f058e4044327330ceeb93cf7b413a`)
        .then(function (response) {
            return response.json(); 
        })
        .then(function (data) { 
            for (let i = 0; i < data.length; i++){
             localStorage.setItem(`${cityId} lat`, data[i].lat);
                localStorage.setItem(`${cityId} lon`, data[i].lon); 
            }
        })
}
document.querySelector('#tags').addEventListener('input', getLatitudeAndLongitude);

function currentCity() {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=39.7392364&lon=-104.984862&units=imperial&appid=843f058e4044327330ceeb93cf7b413a")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            showIcon.src ="https://openweathermap.org/img/wn/" + data.weather[0].icon +".png";
            cityName.textContent = `${data.name} ${dayjs().format('DD/MM/YYYY')}`;
            showTemp.textContent = `${'Temp:'} ${data.main.temp} ${'F°'}`;
            showHumidity.textContent = `${'Humidity:'} ${data.main.humidity} ${'%'}`;
            showWind.textContent = `${'Wind:'} ${data.wind.speed} ${'Mph'}`;
        })
}
currentCity();

// 5 days forecast
function getWeather() {
    let cityId = document.querySelector('#tags').value;
    let getLatitude = localStorage.getItem(`${cityId} lat`);
    let getLongitude = localStorage.getItem(`${cityId} lon`);
    let setCityName = localStorage.setItem("name", `${cityId}`);
    console.log(localStorage.getItem("name"));
     fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${getLatitude}&lon=${getLongitude}&appid=843f058e4044327330ceeb93cf7b413a`)
         .then(function (response) {
             return response.json();
         })
         .then(function (data) {
             console.log(data);
             cityName.textContent = `${data.city.name} ${dayjs().format('DD/MM/YYYY')}`;
            //  showTemp.textContent = `${'Temp:'} ${data.main.temp}`;
            //  showHumidity.textContent = `${'Humidity:'} ${data.main.humidity}`;
            //  showWind.textContent = `${'Wind:'} ${data.wind.speed}`;
             let list = document.createElement('li');
             list.classList.add('list-group-item');
             searchList.append(list);
             list.textContent = localStorage.getItem('name');
         })
}
searchBtn.addEventListener('click', getWeather);







