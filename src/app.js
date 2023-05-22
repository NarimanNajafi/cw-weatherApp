const imgWeather = document.querySelector("#imgweather");
const degree = document.querySelector("#degree");
const sky = document.querySelector("#sky");
const loc = document.querySelector("#location");
const footerLeft = document.querySelector("#feelslike");
const humidity = document.querySelector("#humidity");
const btn = document.querySelector("#btnloc");
const city = document.querySelector("#city");
const cardRigth = document.querySelector("#cardRigth");

const APIKey = '0810c7556821ab1620b9fe65956fc3cf';


class weatherAPI {
    constructor(api) {
        this.APIKey = api;
        this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
        this.iconUrl = "https://openweathermap.org/img/wn/";
        this.apiLocationURL = "https://api.openweathermap.org/data/3.0/onecall?";
    }

    // lat={lat}&lon={lon}&exclude={part}&appid={API key}
    async getWeather(cityName) {
        try {
            const url = `${this.baseUrl}?q=${cityName}&appid=${this.APIKey}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;

        } catch (error) {
            console.log(error);
        }
    }
    async location(lat, lon) {
        try {
            const url = `${this.apiLocationURL}lat=${lat}&lon=${lon}&exclude=current&appid=${this.APIKey}`;
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            // return data;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    createCard(data) {
        let img = data["weather"][0]["icon"];
        imgWeather.src = `${this.iconUrl + img}.png`;
        degree.innerHTML = ` ${data["coord"]["lat"]}<span>&#8451;</span>`;
        loc.innerHTML = `<img class="w-5" src="/src/icon/211766_location_icon.png" alt="image">
        ${data["sys"]["country"]},${data["name"]}`;
        sky.innerHTML = `${data["weather"][0]["description"]}`;
        footerLeft.innerHTML = `${data["main"]["feels_like"]}<span>&#8451;</span>`;
        humidity.innerHTML = `${data["main"]["humidity"]}<span>&#8451;</span>`;

        return
    }
}

const weatherAPI2 = new weatherAPI(APIKey);

btn.addEventListener("click", async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            weatherAPI2(latitude, longitude);
        }, function (err) {
            console.log(err);
        })

    }
    cardRigth.classList.remove("hidden");
    let txtCity = city.value;
    const data = await weatherAPI2.getWeather(txtCity);
    weatherAPI2.createCard(data);

})


