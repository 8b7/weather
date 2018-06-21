var linkIcons = "https://i.imgur.com/";
var weatherIcons = {
    "clear sky": linkIcons + "Lwx3sjh.png",
    "few clouds": linkIcons + "0urokbt.png",
    "scattered clouds": linkIcons + 'zjo500C.png',
    "broken clouds": linkIcons + 'p2ueVHq.png',
    "rain": linkIcons + 'QQBl2XE.png',
    "shower rain": linkIcons + 'yT6myJ7.png',
    "thunderstorm": linkIcons + 'HtTlDq4.png',
    "snow": linkIcons + 'TwZjsQQ.png',
    "overcast clouds": linkIcons + '3OQgyFF.png',
    "mist": linkIcons + 'OILOHrX.png'
};
var conditionImg = document.getElementById('conditionImg'),
    timeOfDay = document.querySelector('time'),
    skycon = document.getElementById("skyCondition"),
    wrong = document.getElementById("wrong-msg"),
    button = document.getElementById("searchButton"),
    searchField = document.getElementById('formField');
   
var nameofcity = "riyadh";


function updateDt() {
    "use strict";
    var date = new Date(),
        week = ['1', '2', '3', '4', '5', '6', '7'],
        month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        d = week[date.getDay()],
        dNum = date.getDate(),
        n = month[date.getMonth()],
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        dayOrNight;
    if (h <= 11) {
        dayOrNight = 'AM';
    } else {
        h = h - 12;
        dayOrNight = 'PM';
    }

    if (dNum < 10) {
        dNum = '0' + dNum;
    }

    if (m < 10) {
        m = '0' + m;
    }

    if (s < 10) {
        s = '0' + s;
    }

    timeOfDay.innerHTML = d + ', ' + n + ' ' + dNum + " " + h + ':' + m + ' ' + dayOrNight;
}
setInterval(updateDt, 1000);
updateDt();
function city() {
    "use strict";
    var xml = new XMLHttpRequest(),
        url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(nameofcity) + "&units=metric&APPID=eb9ba4d5906d3eecd90f0bb03297ec8b";
    xml.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var req = JSON.parse(this.responseText);
            document.getElementById("nowCity").innerHTML = req.name;
            document.getElementById("speed").innerHTML = req.wind.speed + " m/s";
            document.getElementById("temp").innerHTML = Math.round(req.main.temp) + "°";
            document.getElementById("speed").innerHTML = req.wind.speed + " m/s";
            document.getElementById("maxTemp").innerHTML = req.main.temp_max + "° Max";
            document.getElementById("minTemp").innerHTML = req.main.temp_min + "° Min";
            document.getElementById("humidity").innerHTML = req.main.humidity + " Max";
            document.getElementById("speed").innerHTML = Math.round(req.wind.speed) + " m/s";
            skycon.innerHTML = req.weather[0].description;
            conditionImg.src = weatherIcons[skycon.innerHTML];
            conditionImg.alt = skycon.innerHTML;
            wrong.innerHTML = '';
            wrong.classList.remove('wrongMsg');
        } else if (this.status === 404) {
            wrong.classList.add('wrongMsg');
            wrong.innerHTML = 'Oups! city not found , Please try again';
        } else {
            wrong.classList.remove('wrongMsg');
        }
    };
    xml.open("GET", url, true);
    xml.send();
}
city();

document.getElementById("search").addEventListener("submit", function (e) {
    "use strict";
    e.preventDefault();
    nameofcity = searchField.value;
    city();
});
function onWrite() {
    "use strict";
    var input = searchField.value;
    if (input.length > 1) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}