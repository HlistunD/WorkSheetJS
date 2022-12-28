const api = {
    key: "a55b1163ed97c26eb450f23d0752a200",
    endpoint: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.searchBox')
searchBox.addEventListener('keypress', enter)

function enter(e) {
    if (e.keyCode === 13) {
        getInfo(searchBox.value);
    }
}

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const result = await res.json();
    displayResult(result);
}
function displayResult(result) {
    let city = document.querySelector(".city");
    city.textContent = `${result.name}, ${result.sys.country}`;

    getOurDate();

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(result.main.temp)}<span>°C</span>`;
    let weather = document.querySelector(".weather");
    weather.textContent = `${result.weather[0].main}`;
    let hiLow = document.querySelector('.hiLow');
    hiLow.innerHTML = `${Math.round(result.main.temp_min)}<span>°C</span> / ${Math.round(result.main.temp_max)}<span>°C</span>`
}
function getOurDate() {
    const now = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = weekday[now.getDay()];
    let nowDay = now.getDate();
    let nowMonth = months[now.getMonth()];
    
    let showDate = document.querySelector(".date");
    showDate.textContent = `${day}` + " " + `${nowDay}` + " " + `${nowMonth}`;
}
