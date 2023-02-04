// Variables
const searchBtn = document.querySelector('.btn');
const showCurrent = document.querySelector('.show-current-city');
const searchList = document.querySelector('.list-group');
const dayOne = document.querySelector('.day-1');
const dayTwo = document.querySelector('.day-2');
const dayThree = document.querySelector('.day-3');
const dayFour = document.querySelector('.day-4');
const dayFive = document.querySelector('.day-5');
const keyApi = '843f058e4044327330ceeb93cf7b413a';
// // Get the latitude and longitude of the city
function getLatitudeAndLongitude() {
    let cityName = document.querySelector('#tags').value;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName} &appid=${keyApi}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.length; i++) {
                localStorage.setItem(`${cityName} lat`, data[i].lat);
                localStorage.setItem(`${cityName} lon`, data[i].lon);
            }
        })
}
document.querySelector('#tags').addEventListener('input', getLatitudeAndLongitude);

// 5 days forecast
function getWeather() {
    let cityName = document.querySelector('#tags').value;
    let getLatitude = localStorage.getItem(`${cityName} lat`);
    let getLongitude = localStorage.getItem(`${cityName} lon`);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${getLatitude}&lon=${getLongitude}&appid=843f058e4044327330ceeb93cf7b413a&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showCurrent.innerHTML = `<p>${data.name} ${dayjs().format('MM/DD/YYYY')}<p/>
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${data.main.temp} <p>
                    <p> ${'Humidity:'} ${data.main.humidity}</p>
                    <p>  ${'Wind:'} ${data.wind.speed}</p>`
            let list = document.createElement('button');
            list.classList.add('bg-primary', 'text-light', 'mt-2', 'btn');
            list.setAttribute('data-city', data.name);
            searchList.append(list);
            let setNameToLocalStorage = localStorage.setItem('name', data.name)
            list.textContent = localStorage.getItem('name');
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${getLatitude}&lon=${getLongitude}&appid=843f058e4044327330ceeb93cf7b413a&units=imperial`)
                .then(function (response) {
                    return response.json()
                        .then(function (data) {
                            data.list.every(myFunction);
                            function myFunction(value, index, array) {
                                var arr = [];
                                for (i = 0; i < array.length; i = i + 8) {
                                    arr.push(array[i]);
                                }
                                dayOne.innerHTML =
                                    `<p>${dayjs().add(1, 'day').format('MM/DD/YYYY')}</p>
                    <img src="http://openweathermap.org/img/wn/${array[0].weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${array[0].main.temp} <p>
                    <p> ${'Humidity:'} ${array[0].main.humidity}</p>
                    <p>  ${'Wind:'} ${array[0].wind.speed}</p>`;
                                dayTwo.innerHTML =
                                    `<p>${dayjs().add(2, 'day').format('MM/DD/YYYY')}</p>
                                    <img src="http://openweathermap.org/img/wn/${array[1].weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${array[1].main.temp} <p>
                    <p> ${'Humidity:'} ${array[1].main.humidity}</p>
                    <p>  ${'Wind:'} ${array[1].wind.speed}</p>`;
                                dayThree.innerHTML =
                                    `<p>${dayjs().add(3, 'day').format('MM/DD/YYYY')}</p>
                                    <img src="http://openweathermap.org/img/wn/${array[2].weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${array[2].main.temp} <p>
                    <p> ${'Humidity:'} ${array[2].main.humidity}</p>
                    <p>  ${'Wind:'} ${array[2].wind.speed}</p>`;
                                dayFour.innerHTML =
                                    `<p>${dayjs().add(4, 'day').format('MM/DD/YYYY')}</p>
                                    <img src="http://openweathermap.org/img/wn/${array[3].weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${array[3].main.temp} <p>
                    <p> ${'Humidity:'} ${array[3].main.humidity}</p>
                    <p> ${'Wind:'} ${array[3].wind.speed}</p>`;
                                dayFive.innerHTML =
                                    `<p>${dayjs().add(5, 'day').format('MM/DD/YYYY')}</p>
                                    <img src="http://openweathermap.org/img/wn/${array[4].weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${array[4].main.temp} <p>
                    <p> ${'Humidity:'} ${array[4].main.humidity}</p>
                    <p>  ${'Wind:'} ${array[4].wind.speed}</p>`;
                            }
                        })
                })
        })
}
searchBtn.addEventListener('click', getWeather);

let buttonClickHandler = function (event) {
    let city = event.target.getAttribute('data-city');
    
};
searchList.addEventListener('click', buttonClickHandler);
