    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var monthIndex = d.getMonth();
    var day = d.getDate();
    var dayNameIndex = d.getDay();


var inputSearch = document.querySelector('#Search');
var row = document.querySelector('#row');

(function(){
    fetchData();
})();

async function fetchData(location='egypt'){
    
    var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=163789acd84042559eb62903250911&q=${location}&days=3&aqi=no&alerts=no`);
    var data = await response.json();

    var currentDay={
        nameCity:data.location.name,
        temp:data.current.temp_c,
        status:data.current.condition.text,
        icon:data.current.condition.icon,
        wind:data.current.wind_kph,
        wind_dir:data.current.wind_dir,
        cloud:data.current.cloud,
        day:day,
        dayName:weekday[dayNameIndex],
        monthName:months[monthIndex],
    }
    var secondDay={
        maxTemp:data.forecast.forecastday[1].day.maxtemp_c,
        minTemp:data.forecast.forecastday[1].day.mintemp_c,
        status:data.forecast.forecastday[1].day.condition.text,
        icon:data.forecast.forecastday[1].day.condition.icon,
        dayName:weekday[getNextDay()],
    }
    var thirdDay={
        maxTemp:data.forecast.forecastday[2].day.maxtemp_c,
        minTemp:data.forecast.forecastday[2].day.mintemp_c,
        status:data.forecast.forecastday[2].day.condition.text,
        icon:data.forecast.forecastday[2].day.condition.icon,
        dayName:weekday[getThirdDay()],
    }
    displayData(currentDay,secondDay,thirdDay);
}

function displayData(today,nextDay,thirdDay){
    container = `<div class="col-md-4 card p-0 border-0 text-white bg-transparent">
                <div class="header-card d-flex justify-content-between ">
                    <p>${today.dayName}</p>
                    <p>${today.day}${today.monthName}</p>
                </div>
                <div class="card-body">
                    <h4>${today.nameCity}</h4>
                    <h3 class="position-relative">${today.temp}<span class="fs-2">o</span>C</h3>
                    <img src="${today.icon}" alt="status-image">
                    <p>${today.status}</p>
                    <div class="icon d-flex mt-3">
                        <span class="fw-bold"><i class="fa-solid fa-umbrella"></i> ${today.cloud}%</span>
                        <span class="mx-4 fw-bold"><i class="fa-solid fa-wind"></i> ${today.wind}km/h</span>
                        <span class="fw-bold"><i class="fa-solid fa-compass"></i> ${today.wind_dir}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-4 card p-0 border-0 text-white bg-transparent">
                <div class="header-card dark text-center">
                    <p>${nextDay.dayName}</p>
                </div>
                <div class="card-body dark text-center">
                    <img src="${nextDay.icon}" alt="status-image">
                    <h4>${nextDay.maxTemp}<span>o</span>c</h4>
                    <h3 >${nextDay.minTemp}<span>o</span></h3>
                    <p>${nextDay.status}</p>
                </div>
            </div>
            <div class="col-md-4 card p-0 border-0 text-white bg-transparent">
                <div class="header-card text-center header-bg">
                    <p>${thirdDay.dayName}</p>
                </div>
                <div class="card-body text-center card-bg">
                    <img src="${thirdDay.icon}" alt="status-image">
                    <h4>${thirdDay.maxTemp}<span>o</span>c</h4>
                    <h3 >${thirdDay.maxTemp}<span>o</span></h3>
                    <p>${thirdDay.status}</p>
                </div>
            </div>
`;
    row.innerHTML=container;
}

function getNextDay(){
    var res ;
    if(+dayNameIndex===6){
        res=0;
    }else{
        res = +dayNameIndex+1;
    }
    return res;
}

function getThirdDay(){
    var res ;
    if(+dayNameIndex===5){
        res=0;
    }else if(+dayNameIndex===6){
        res = 1;
    }else{
        res = +dayNameIndex+2;
    }
    return res;
}

inputSearch.addEventListener('input',function(){
    fetchData(inputSearch.value);
})

