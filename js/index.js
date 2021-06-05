
const icon = document.getElementById("icon");
const city = document.getElementById("city");
const date = document.getElementById('date');

const temp = document.getElementById('temp');
const description = document.getElementById('description');
const inputCity = document.getElementById('inputCity');
const submitCityBtn = document.getElementById('submitCityBtn');
const form = document.getElementById('form')

const minmaxtemp = document.getElementById('minmaxtemp');
const temp_max = document.getElementById("temp_max");
const temp_min = document.getElementById("temp_min");
const feels_like = document.getElementById("feels_like")
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById('sunset');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');


async function getDataByLatLong(lat,long){

    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
    console.log(url)
    let response = await fetch(url)
    let result = await response.json();
    return result;

}

async function getDataByCity(city){

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    console.log(url)
    let response = await fetch(url)
    let result = await response.json();
    return result;

}

function getRequiredData(response){
    console.log(response);
    let icon = response.weather[0].icon;
    let city = response.name
    // console.log(city)
    let country = response.sys.country
    // console.log(country);
    let temp = response.main.temp;
    temp = temp-273.15;
    temp = temp.toString().substring(0,5);
    
    let temp_min = response.main.temp_min;
    temp_min = temp_min-273.15;
    temp_min = temp_min.toString().substring(0,5);
    let temp_max = response.main.temp_max;
    temp_max = temp_max-273.15;
    temp_max = temp_max.toString().substring(0,5);
    let feels_like = response.main.feels_like;
    feels_like = feels_like-273.15;
    feels_like = feels_like.toString().substring(0,5);

    let windSpeed = response.wind.speed;
    let pressure = response.main.pressure

    console.log(sunset)
    let humidity = response.main.humidity;
    let description = response.weather[0].main;
    
    console.log(temp)
    let date = new Date();
    return {
        icon:icon,
        city:city,
        country:country,
        temp:temp,
        description:description,
        date:date.toDateString(),
        time:date.toTimeString().substring(0,8),
        temp_max:temp_max,
        temp_min:temp_min,
        feels_like:feels_like,
        windSpeed:windSpeed,
        pressure:pressure,
        humidity:humidity
    }
}

function getLocation(){
    if(navigator.geolocation){
        console.log("Supporting");
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        console.log("Browser not supporting")
    }
}
function putData(data){
    console.log(data);
    let iconUrl = ` http://openweathermap.org/img/wn/${data.icon}@2x.png`
    icon.setAttribute("src",iconUrl);
    city.innerHTML = `${data.city},${data.country}`;
    date.innerHTML = `${data.date} | ${data.time}`.toUpperCase();
    description.innerText= data.description

    temp.innerHTML = `${data.temp}°`
    temp_max.innerText = `${data.temp_max}°`
    temp_min.innerText = `${data.temp_min}°`
    feels_like.innerText = `${data.feels_like}°`
    console.log("ppppppppppppppp "+data.sunrise+ "  "+ sunset)
    windSpeed.innerText = `${data.windSpeed} m/s`;
    humidity.innerText = data.humidity;
    pressure.innerText = data.pressure
}
function showPosition(position){

    // console.log("Latitude = "+position.coords.latitude);
    // console.log("Longitude = " + position.coords.longitude);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    
    getDataByLatLong(lat,long)
    .then((response)=>{
        // console.log(response);
       let requiredData = getRequiredData(response);
       putData(requiredData);
    })


}


getLocation();
form.style.display='none'

city.addEventListener("click",()=>{
    console.log('click');
    form.style.display='block'
    inputCity.value = `${city.innerText}`
    city.style.display='none'
})

submitCityBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let cityName = inputCity.value;
    console.log(cityName);
    getDataByCity(cityName).then((response)=>{
        let requiredData = getRequiredData(response);
        putData(requiredData);
    })
    form.style.display='none';
    city.style.display='inline'

})