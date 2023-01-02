//d2fcb2ffa19d0868c9d925fd1f16529b
// const url_2 = `https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=1e638bcf60b8176b2a20fe6440c78d57`
//https://api.openweathermap.org/data/2.5/weather?q=pune&appid=1e638bcf60b8176b2a20fe6440c78d57


async function get_weather() {

    try {
        let city = document.getElementById("city").value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e638bcf60b8176b2a20fe6440c78d57&units=metric`;
        let res = await fetch(url);
        let data = await res.json();

        console.log(data);
        let res_1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1e638bcf60b8176b2a20fe6440c78d57&units=metric`)
        let data_1 = await res_1.json()
        console.log(data_1.list);
        append(data);
        forecast_data(data_1.list)
    }

    catch (err) {
        console.log(err);
    }

}

function append(data) {

    let map = document.getElementById("gmap_canvas")

    let cont = document.getElementById("city_data");
    cont.innerHTML = null;

    let p1 = document.createElement("p");
    p1.innerText = `City : ${data.name}`;

    let p2 = document.createElement("p");
    p2.innerText = `Temp. : ${data.main.temp}°C`

    let p3 = document.createElement("p");
    p3.innerText = `Max Temp. : ${data.main.temp_max}°C`;

    let p4 = document.createElement("p");
    p4.innerText = `Min Temp. : ${data.main.temp_min}°C`;

    let p5 = document.createElement("p");
    p5.innerText = `Humidity : ${data.main.humidity}`;

    let p6 = document.createElement("p");
    p6.innerText = `Wind Speed : ${data.wind.speed}`;

    let div = document.createElement("div")
    div.append(p1, p2, p3, p4, p5, p6)

    cont.append(div)

    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

    // let forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=1e638bcf60b8176b2a20fe6440c78d57`

    // console.log(forecast);
}

let forecast_data = (list) => {

    let cont = document.getElementById("forecast");
    cont.innerHTML = null;

    for (let i = 0; i <= 7; i++) {
        let x = list[i]
        let p1 = document.createElement("p");
        p1.innerText = x.dt_txt

        let div = document.createElement("div");
        div.append(p1);

        cont.append(div)
    }

}

let get_loc = () => {

    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        get_weather_loc(crd.latitude, crd.longitude);

    }

}

let get_weather_loc = async (lat, lon) => {

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1e638bcf60b8176b2a20fe6440c78d57&units=metric`;

    let res = await fetch(url);
    let data = await res.json();

    append(data)

}

// let a = x("city");
// let b = x("name")

// function get_value(val){

//     return document.getElementById(val).value;

// }