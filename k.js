const url = "https://api.openweathermap.org/data/2.5/forecast?&units=metric&appid=1f723e8a823454f3d6b10a5f89099767";

// Function to load cities from local storage
function loadCitiesFromLocalStorage() {
    const cityDropdown = document.getElementById("cityDropdown");
    const cities = JSON.parse(localStorage.getItem("cities")) || [];
    cityDropdown.innerHTML = "";
    // Add each city to the dropdown
    cities.forEach(city => {
        const cityElement = document.createElement("div");
        cityElement.textContent = city;
        cityElement.addEventListener("click", () => {
          document.getElementById("name").value=city; 
            checkWeather();
        });
        cityDropdown.appendChild(cityElement);
    });
    if (cities.length > 0) {
        cityDropdown.classList.remove("hidden");
    } 
    else {
        cityDropdown.classList.add("hidden");
    }
}
// Save a new city to local storage
function saveCityToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem("cities")) || [];
    
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    loadCitiesFromLocalStorage();
    
}

// Check weather function
async function checkWeather() {
    const city = document.getElementById("name").value;
    
    if (!city) {
        alert("Enter the city name...!");
        cityDropdown.classList.remove("hidden");
        return;
    }
    else{
        cityDropdown.classList.add("hidden");
    }

    try {
        const p = await fetch(url + `&q=${city}`);
        if (p.status == 404) {
            alert("Invalid city name...!");
            return;
        }

        const resp = await p.json();
        console.log(resp);

        // Save city to local storage
        saveCityToLocalStorage(city);

        // Update the weather dashboard
        updateWeatherDashboard(resp);
    } catch (error) {
        console.log(error);
    }
}

// Update the weather dashboard with fetched data
function updateWeatherDashboard(resp) {
    document.getElementById("part2-name").innerHTML = `${resp.city.name} (${resp.list[0].dt_txt})`;
    document.querySelector(".dh2").innerHTML = `${resp.list[1].dt_txt}`;
    document.querySelector(".dh3").innerHTML = `${resp.list[2].dt_txt}`;
    document.querySelector(".dh4").innerHTML = `${resp.list[3].dt_txt}`;
    document.querySelector(".dh5").innerHTML = `${resp.list[4].dt_txt}`;
    document.querySelector(".dh6").innerHTML = `${resp.list[5].dt_txt}`;

    document.getElementById("part2-temp").innerHTML = `Temperature: ${resp.list[0].main.temp}°C`;
    document.getElementById("dt2").innerHTML = `Temperature: ${resp.list[1].main.temp}°C`;
    document.getElementById("dt3").innerHTML =` Temperature: ${resp.list[2].main.temp}°C`;
    document.getElementById("dt4").innerHTML = `Temperature: ${resp.list[3].main.temp}°C`;
    document.getElementById("dt5").innerHTML = `Temperature: ${resp.list[4].main.temp}°C`;
    document.getElementById("dt6").innerHTML = `Temperature: ${resp.list[5].main.temp}°C`;

    document.getElementById("part2-wind").innerHTML = `Wind: ${resp.list[0].wind.speed} M/s`;
    document.getElementById("dw2").innerHTML = `Wind: ${resp.list[1].wind.speed} M/s`;
    document.getElementById("dw3").innerHTML = `Wind: ${resp.list[2].wind.speed} M/s`;
    document.getElementById("dw4").innerHTML = `Wind: ${resp.list[3].wind.speed} M/s`;
    document.getElementById("dw5").innerHTML = `Wind: ${resp.list[4].wind.speed} M/s`;
    document.getElementById("dw6").innerHTML = `Wind: ${resp.list[5].wind.speed} M/s`;

    document.getElementById("part2-humidity").innerHTML = `Humidity: ${resp.list[0].main.humidity}%`;
    document.getElementById("du2").innerHTML = `Humidity: ${resp.list[1].main.humidity}%`;
    document.getElementById("du3").innerHTML = `Humidity: ${resp.list[2].main.humidity}%`;
    document.getElementById("du4").innerHTML = `Humidity: ${resp.list[3].main.humidity}%`;
    document.getElementById("du5").innerHTML = `Humidity: ${resp.list[4].main.humidity}%`;
    document.getElementById("du6").innerHTML = `Humidity: ${resp.list[5].main.humidity}%`;


    const a= document.getElementById("part2-img");
    const b= document.getElementById("img1");
    const c= document.getElementById("img2");
    const d= document.getElementById("img3");
    const e= document.getElementById("img4");
    const f= document.getElementById("img5");
    for(let i=0;i<=5;i++){
        let k;
        if(resp.list[i]==resp.list[0])
            {
                k=a;
                img(k);
            }
        else if(resp.list[i]==resp.list[1])
            {           
                k=b;
                img(k);
             }
        else if(resp.list[i]==resp.list[2])
            {
                k=c;
                img(k);
            }
        else if(resp.list[i]==resp.list[3])
            {
                k=d;
                img(k);
            }
        else if(resp.list[i]==resp.list[4])
            {
                k=e;
                img(k);
            }
        else
            {
                k=f;
                img(k);
            }  
    }
function img(k){
if(resp.list[0].weather[0].main=="Clouds")
  {
    k.src="images/clouds.png";
  }
 else if(resp.list[0].weather[0].main=="Rain"){
     k.src="images/rain.png";
  }
  else if(resp.list[0].weather[0].main=="Clear"){
      k.src="images/clear.png";
  }
 else if(resp.list[0].weather[0].main=="Drizzle"){
      k.src="images/drizzle.png";
  }
 else{
      k.src="images/mist.png";
    }   
}
}

document.getElementById("search").addEventListener("click", checkWeather);
document.getElementById("loc").addEventListener("click", currentLocation);
loadCitiesFromLocalStorage();

// Function to handle current location fetching
function currentLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(`location: ${latitude}, ${longitude}`);
            const cords = [latitude, longitude];
            getCity(cords);
        },
        (error) => {
            console.error('Error getting location:', error.message);
        }
    );
}

// Fetch weather for current location
async function getCity(cords) {
    const locurl = await fetch(url + `&lat=${cords[0]}&lon=${cords[1]}`);
    const resp1 = await locurl.json();
    console.log(resp1);

    // Update weather dashboard with current location data
    updateWeatherDashboard(resp1);
}

