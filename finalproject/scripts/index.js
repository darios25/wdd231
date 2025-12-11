const sizeScreen = window.matchMedia('(max-width: 600px)')
const menuToggle = document.getElementById('menu-toggle');
menuToggle.addEventListener('click', () => {
  const menuItems = document.getElementById('menu-items');
  if (menuItems.style.display == 'none') {
    menuItems.style.display = 'flex';
  }

  else if ( sizeScreen.matches){
    menuItems.style.display = 'flex';
  }
  else {menuItems.style.display = 'none'}

  
})

// -----------------------------
// Toggle dark/light theme
// -----------------------------
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// -----------------------------
// Footer info: year & last modified
// -----------------------------
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Weather
const apiKey = "28a81ffae60b680f6b7a95e64d8f5788";
const city = "Palermo";
const units = "metric";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    console.log(data.weather[0].icon)

    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("temperature").textContent = `${data.main.temp.toFixed(1)} °C`;
    document.getElementById("conditions").textContent = data.weather[0].description;
    document.getElementById("high").textContent = `${data.main.temp_max.toFixed(1)} °C`;
    document.getElementById("low").textContent = `${data.main.temp_min.toFixed(1)} °C`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });

    document.getElementById("sunrise").textContent = sunrise;
    document.getElementById("sunset").textContent = sunset;

    getForecast();
  } catch (error) {
    console.error("Errore nel recupero del meteo:", error);
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    const forecastContainer = document.getElementById("forecast");
    // forecastContainer.innerHTML = "<h3>Previsione 3 giorni</h3>";

    let today = new Date().getDate();
    let count = 0;

    for (let item of data.list) {
      const date = new Date(item.dt_txt);
      if (date.getHours() === 12 && count < 3) {
        const dayName = date.toLocaleDateString("it-IT", { weekday: "long" });
        const temp = item.main.temp.toFixed(1);
        const desc = item.weather[0].description;

        const forecastItem = document.createElement("p");
        // forecastItem.textContent = `${dayName}: ${temp} °C, ${desc}`;
        forecastContainer.appendChild(forecastItem);

        if (count === 0) {
          document.getElementById("now").innerHTML = `<strong>Today:</strong> ${temp} °C`;
        } else if (count === 1) {
          document.getElementById("after").innerHTML = `<strong>Tomorrow:</strong> ${temp} °C`;
        } else if (count === 2) {
          document.getElementById("days").innerHTML = `<strong>After Tomorrow:</strong> ${temp} °C`;
        }

        count++;
      }
    }
  } catch (error) {
    console.error("Errore nel recupero della previsione:", error);
  }
}

getWeather();

document.addEventListener("DOMContentLoaded", () => {
  const spotlightContainer = document.getElementById("spotlight-container");
  if (!spotlightContainer) {
    console.error("Contenitore #spotlight-container non trovato nell'HTML.");
    return;
  }

  async function loadSpotlights() {
    try {
      const response = await fetch("data/members.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`Fetch fallito: ${response.status} ${response.statusText}`);

      const data = await response.json();

      const members = Array.isArray(data)
        ? data
        : Array.isArray(data?.members)
          ? data.members
          : null;

      if (!members || members.length === 0) {
        throw new Error("Struttura JSON inattesa o lista vuota (atteso: { members: [...] } o [...]).");
      }

      const eligible = members.filter(m =>
        ["Difficult", "Medium", "Easy"].includes(String(m.membershipLevel).trim())
      );

      if (eligible.length === 0) {
        spotlightContainer.innerHTML = "<p>Nessun livello Difficult o Easy o Medium disponibile.</p>";
        return;
      }

      const selected = eligible
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(3, eligible.length));

      spotlightContainer.innerHTML = "";

      selected.forEach(member => {
        const {
          name = "Nome non disponibile",
          image = "",
          address = "—",
          website = "",
          membershipLevel = "—"
        } = member;

        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        // Normalizza website per evitare href vuoti
        const safeWebsite = website ? website : null;

        card.innerHTML = `
          <img src="${member.image}" alt="${member.name}" loading="lazy" onerror="this.style.display='none'"> 
          <div class="spotlight-details">
            <h3>${name}</h3>
            
            <p><strong>Location:</strong> ${address}</p>
            ${safeWebsite
              ? `<p><strong>Website:</strong> <a href="${safeWebsite}" target="_blank" rel="noopener">${safeWebsite}</a></p>`
              : `<p><strong>Website:</strong> —</p>`}
            <p><strong>Level:</strong> ${membershipLevel}</p>
          </div>
        `;

        spotlightContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Errore nel caricamento dei riflettori:", error);
      spotlightContainer.innerHTML = "<p>Impossibile caricare i membri in evidenza al momento.</p>";
    }
  }

  loadSpotlights();
});