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
    forecastContainer.innerHTML = "<h3>Previsione 3 giorni</h3>";

    let today = new Date().getDate();
    let count = 0;

    for (let item of data.list) {
      const date = new Date(item.dt_txt);
      if (date.getHours() === 12 && count < 3) {
        const dayName = date.toLocaleDateString("it-IT", { weekday: "long" });
        const temp = item.main.temp.toFixed(1);
        const desc = item.weather[0].description;

        const forecastItem = document.createElement("p");
        forecastItem.textContent = `${dayName}: ${temp} °C, ${desc}`;
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


//spotlight
const spotlightContainer = document.getElementById("spotlight-container");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Impossibile recuperare i dati dei membri.");

    const { members } = await response.json();

    // Filtra solo membri Gold o Silver
    const eligible = members.filter(member =>
      ["Gold", "Silver"].includes(member.membership)
    );

    // Mescola casualmente e seleziona fino a 3
    const selected = eligible
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(3, eligible.length));

    // Pulisce il contenitore prima di aggiungere nuovi elementi
    spotlightContainer.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <img src="${member.logo}" alt="Logo di ${member.name}" loading="lazy">
        <div class="spotlight-details">
          <h3>${member.name}</h3>
          <p><strong>Telefono:</strong> ${member.phone}</p>
          <p><strong>Indirizzo:</strong> ${member.address}</p>
          <p><strong>Sito Web:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          <p><strong>Livello:</strong> ${member.membership}</p>
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


// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

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

const container = document.getElementById('cards');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

gridBtn.addEventListener('click', () => {
  container.classList.add('grid-view');
  container.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list-view');
  container.classList.remove('grid-view');
});

async function loadMembers() {
  const response = await fetch('data/members.json');
  const members = await response.json();
  

  container.innerHTML = '';
  console.log(members);
  members.members.forEach(member => {
      
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="Logo di ${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Web site</a>
      <p>Level: ${member.membershipLevel}</p>
      <p>${member.description}</p>
    `;
    container.appendChild(card);
  }
);
}

loadMembers();

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;
