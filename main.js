const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=f30fbbdcdf84257db512af4aa76a89b5';
const units = '&units=metric';
let city;
let url;

const getWeather = () => {
    city = input.value;
    url = apiLink + city + apiKey + units;

    axios.get(url)
        .then(res => {
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const conditions = Object.assign({}, ...res.data.weather);

            cityName.textContent = res.data.name;
            weather.textContent = conditions.main;
            temperature.textContent = Math.floor(temp) + '°C';
            humidity.textContent = hum + '%';

            warning.textContent = '';
            input.value = '';
            
            if (conditions.id >= 200 && conditions.id < 300) {
                photo.setAttribute('src', './img/thunderstorm.png');
            } else if (conditions.id >= 300 && conditions.id < 400) {
                photo.setAttribute('src', './img/drizzle.png');
            } else if (conditions.id >= 500 && conditions.id < 600) {
                photo.setAttribute('src', './img/rain.png');
            } else if (conditions.id >= 600 && conditions.id < 700) {
                photo.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png');
            } else if (conditions.id >= 700 && conditions.id < 800) {
                photo.setAttribute('src', './img/fog.png');
            } else if (conditions.id === 800) {
                photo.setAttribute('src', './img/sun.png');
            } else if (conditions.id > 800 && conditions.id < 900) {
                photo.setAttribute('src', './img/cloud.png');
            } else {
                photo.setAttribute('src', './img/unknown.png');
            };
        })
        .catch(() => {
            if (input.value.length !== 0) {
                warning.textContent = 'Couldn\'t find this city in database. Please check the spelling.';
            } else {
                warning.textContent = 'Please enter city name.';
            };
        })
    };

const enterCheck = (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
};

btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);