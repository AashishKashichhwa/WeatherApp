// Name:- Aashish Kashichhwa
// University Id = 2333984


function dateFunction(){
    const d = new Date();
    document.getElementById("date").innerHTML=d.getFullYear()+ "/" + d.getMonth() + "/" + d.getDate();
}

async function weatherFetch(city){
    const apiKey = "e4dbea44a029ff942f02bcb1964feb89";
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey);

    if(response.ok){
        const data = await response.json();
        weatherDisplay(data);
        document.querySelector(".error").style.display ="none";
        document.querySelector(".weather_app").style.display ="block";
    }else{
        alert("No weather found!")
        document.querySelector(".error").style.display ="block";
        // document.querySelector(".weather").style.display ="none";
        throw new Error("No weather found!")
    }
}

function weatherDisplay(data){
    const name = data.name;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const speed = data.wind.speed;
    const  cityName= document.querySelector(".city");
    const valueOftemperature = document.querySelector(".temperature");
    const weatherimage = document.querySelector(".weatherimg");
    const weatherDescription = document.querySelector(".weatherCondition");
    const valueOfhumidity = document.querySelector(".humidityValue");
    const valueOfwindspeed = document.querySelector(".windspeedValue");
    cityName.innerText=name;
    valueOftemperature.innerText = temp + "°C";
    weatherimage.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    weatherDescription.innerText = description;
    valueOfhumidity.innerText = humidity+"%";
    valueOfwindspeed.innerText = speed + "km/h";
}

async function look(){
    const city = document.querySelector("#searchbox").value;
    await weatherFetch(city);
}

document.querySelector("button").addEventListener("click",look);

document.querySelector("#searchbox").addEventListener("keyup", (event) =>{
    if(event.key == "Enter"){
        look();
    }
});

dateFunction();
weatherFetch("Newport News");
