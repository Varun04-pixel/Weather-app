const content = document.getElementById("container");
const input_location = document.getElementById("input");
const button = document.getElementById("btn");
const weather_icon_box = document.getElementById("weather-icon");
const weather_icon = document.createElement("img");
const weather_details = document.getElementById("weather-details");
const extra_info = document.getElementById("extra-info");

input_location.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});

button.addEventListener("click", function () {
  if (input_location.value.trim() == "") {
    return;
  }
  content.classList.remove("animate__slideInUp");
  void content.offsetWidth;
  content.classList.add("animate__slideInUp");
  content.style.display = "block";
  const loc = input_location.value.trim();
  getWeather(loc);
  input_location.value = "";
  input_location.focus();
});

async function getWeather(loc) {
  weather_icon_box.innerHTML = "";
  weather_icon.remove();
  weather_details.innerHTML = "";
  extra_info.innerHTML = "";
  try {
    let response = await fetch('/api/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({loc})
    });
    let data = await response.json();
    const date = new Date();
    let day = date.toLocaleDateString("indian", { weekday: "long" });
    let time = date.toLocaleTimeString("indian", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
    weather_icon.src = data.current.condition.icon;
    weather_icon_box.appendChild(weather_icon);
    let item_1 = document.createElement("h5");
    item_1.innerText = data.current.condition.text;
    weather_icon_box.appendChild(item_1);
    let item_2 = document.createElement("h5");
    item_2.innerHTML = `Temp: ${
      data.current.temp_c + "°C  |  " + data.current.temp_f + "°F"
    } </br>`;
    weather_details.appendChild(item_2);
    let item_3 = document.createElement("h5");
    item_3.innerText = "Humidity: " + data.current.humidity + "%";
    weather_details.appendChild(item_3);
    let item_4 = document.createElement("h5");
    item_4.innerText = "Wind: " + data.current.wind_kph + "km/h";
    weather_details.appendChild(item_4);
    let item_5 = document.createElement("h5");
    item_5.innerText = day;
    extra_info.appendChild(item_5);
    let item_6 = document.createElement("h5");
    item_6.innerText = time;
    extra_info.appendChild(item_6);
    let item_7 = document.createElement("h5");
    item_7.innerText =
      data.location.name +
      ", " +
      data.location.region +
      ", " +
      data.location.country;
    extra_info.appendChild(item_7);
  } catch (error) {
    extra_info.innerHTML =
      "<h6>There was an error fetching the data. <a href='index.html'>Refresh</a></h6>";
  }
}
