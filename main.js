// I like that you've captured an example response.
// How would you explain to a student why you should or shouldn't do this when interacting with an API?
// const response = {
//     "coord": {
//         "lon": -0.13,
//         "lat": 51.51
//     },
//     "weather": [
//         {
//             "id": 804,
//             "main": "Clouds",
//             "description": "overcast clouds",
//             "icon": "04n"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 36.14,
//         "feels_like": 31.03,
//         "temp_min": 32,
//         "temp_max": 39.99,
//         "pressure": 1038,
//         "humidity": 93
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 3.36
//     },
//     "clouds": {
//         "all": 90
//     },
//     "dt": 1579660738,
//     "sys": {
//         "type": 1,
//         "id": 1414,
//         "country": "GB",
//         "sunrise": 1579679586,
//         "sunset": 1579710624
//     },
//     "timezone": 0,
//     "id": 2643743,
//     "name": "London",
//     "cod": 200
// }

// Do you have a strong opinion on semi-colons?
function createInfo(key, value) {
    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container'
    // Any reason why you prefer this over the `classList` API?
    const keyElement = document.createElement('p')
    keyElement.textContent = key;
    const valueElement = document.createElement('p');
    valueElement.textContent = value;
    infoContainer.appendChild(keyElement);
    infoContainer.appendChild(valueElement);
    return infoContainer;
}

function createWeatherOutput(data, userSearch) {
    const resultsContainer = document.getElementById('results-container');
    const newDiv = document.createElement('div');
    newDiv.className = 'weather-card'
    const header = document.createElement('h3');
    header.textContent = `Weather for ${userSearch}`;
    newDiv.appendChild(header);
    // Nice! I like the use of the `createInfo` function.
    newDiv.appendChild(createInfo('Current Temp:', data.main.temp));
    newDiv.appendChild(createInfo('Today\'s high:', data.main.temp_max));
    newDiv.appendChild(createInfo('Today\'s low:', data.main.temp_min));
    newDiv.appendChild(createInfo('Current conditions:', data.weather[0].description));
    resultsContainer.prepend(newDiv);
}

function formError(errorMessage) {
    let error = document.getElementById('error');
    if (error) {
        error.innerText = errorMessage
    } else {
        const formContainer = document.getElementById('weather-form');
        const error = document.createElement('p')
        error.id = 'error';
        error.innerText = errorMessage
        formContainer.appendChild(error);
    }
}

function searchWeather() {
    const input = document.getElementById('searchInput')
    const userSearch = input.value;
    if (userSearch === "") {
        input.value = ""
        formError("Not a valid input");
        return
    }

    let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=a94556791300fa08c019626f41eeca84&';
    if  (isNaN(userSearch)) {
        baseUrl += `q=${userSearch}`;
    } else {
        baseUrl += `zip=${userSearch}`;
    }
fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
        if (data.cod && (data.cod === "400" || data.cod === "404")) {
            formError(data.message);
        } else {
            const errorOutput = document.getElementById('error');
            if (errorOutput) {
                errorOutput.remove();
            }
            createWeatherOutput(data, userSearch);
        }
    })
    .catch(err => {
        formError(err.message)
    });
}
