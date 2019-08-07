const inputs = document.getElementById("inputs");
const login = document.getElementById("login");
let name = '';
let url = `http://api.openweathermap.org/data/2.5/weather?`;
const appId = '23884f9b0a72004554863499d83c8fbd';
if (window.localStorage.getItem("Name") != null) {
    name = window.localStorage.getItem("Name");
    cleanWindow();
    getLocation();
} else if (window.sessionStorage.getItem("Name") != null) {
    name = window.sessionStorage.getItem("Name");
    cleanWindow();
    getLocation();
} else {
    login.addEventListener('click', function () {
        name = document.getElementById("name").value;
        const remember = document.getElementById("remember");
        if (remember.checked == true) {
            window.localStorage.setItem("Name", name);
            cleanWindow();
            getLocation();
        } else {
            window.sessionStorage.setItem("Name", name);
            cleanWindow();
            getLocation();
        }
    });
}



function cleanWindow() {
    inputs.innerHTML = '';
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition, function () {}, {
            enableHighAccuracy: true,
            timeout: 1
        });
    } else {
        inputs.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function savePosition(position) {
    let latCord = position.coords.latitude;
    let lonCord = position.coords.longitude;
    sendToWeather(latCord, lonCord, function (o) {
        inputs.innerHTML = `<h1>Hello ${name}!</h1><h2>The Temp in ${o.name} is: ${o.main.temp}</h2>`
    })
}

function sendToWeather(latCord, lonCord, callback) {
    fullUrl = `${url}lat=${latCord}&lon=${lonCord}&units=metric&appid=${appId}`;
    var req = new XMLHttpRequest();

    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var obj = JSON.parse(this.responseText)
                console.log(obj);
                callback(obj);
            }
        }
    };
    req.open("GET", fullUrl);
    req.send();
}