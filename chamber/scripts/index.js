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

// const spotlightContainer = document.getElementById("spotlight-container");

// async function loadSpotlights() {
//   try {
//     const response = await fetch("data/members.json");
//     if (!response.ok) throw new Error("Impossibile recuperare i dati dei membri.");

//     const { members } = await response.json();

    // Filtra solo membri Gold o Silver
    // const eligible = members.filter(member =>
    //   ["Gold", "Silver"].includes(member.membership)
    // );

    // Mescola casualmente e seleziona fino a 3
    // const selected = eligible
    //   .sort(() => Math.random() - 0.5)
    //   .slice(0, Math.min(3, eligible.length));

    // Pulisce il contenitore prima di aggiungere nuovi elementi
    // spotlightContainer.innerHTML = "";

    // selected.forEach(member => {
    //   const card = document.createElement("div");
    //   card.classList.add("spotlight-card");

    //   card.innerHTML = `
    //     <img src="${member.logo}" alt="Logo di ${member.name}" loading="lazy">
    //     <div class="spotlight-details">
    //       <h3>${member.name}</h3>
    //       <p><strong> ${member.phone}</strong></p>
    //       <p><strong> ${member.address}</strong></p>
    //       <p><strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</strong></a></p>
    //       <p><strong> ${member.membership}</strong></p>
    //     </div>
    //   `;

    //   spotlightContainer.appendChild(card);
    // });
//   } catch (error) {
//     console.error("Errore nel caricamento dei riflettori:", error);
//     spotlightContainer.innerHTML = "<p>Impossibile caricare i membri in evidenza al momento.</p>";
//   }
// }

// loadSpotlights();


// function loadSpotlightMembers() {
//   fetch('data/members.json')  
//     .then(response => response.json())
//     .then(data => {
//       const eligibleMembers = data.members.filter(member =>
//         member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
//       );
//       const selectedMembers = shuffleArray(eligibleMembers).slice(0, 3); 
//       const spotlightContainer = document.getElementById('spotlight-container');
//       spotlightContainer.innerHTML = '';
//       selectedMembers.forEach(member => {
//         const memberDiv = document.createElement('div');
//         memberDiv.classList.add('spotlight-member');
//         memberDiv.innerHTML = `
//           <img src="${member.imageUrl}" alt="${member.name}" style="max-width: 100px; border-radius: 50%;">
//           <h3>${member.name}</h3>
//           <p>${member.description}</p>
//           <a href="${member.website}" target="_blank">Visit Website</a>
//         `;
//         spotlightContainer.appendChild(memberDiv);
//       });
//     })
//     .catch(error => console.error('Error cargando miembros:', error));
// }

// Función para mezclar aleatoriamente una lista
// function shuffleArray(array) {
//   return array.sort(() => Math.random() - 0.5);
// }

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
        ["Gold", "Silver"].includes(String(m.membershipLevel).trim())
      );

      if (eligible.length === 0) {
        spotlightContainer.innerHTML = "<p>Nessun membro Gold o Silver disponibile.</p>";
        return;
      }

      const selected = eligible
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(3, eligible.length));

      spotlightContainer.innerHTML = "";

      selected.forEach(member => {
        const {
          name = "Nome non disponibile",
          logo = "",
          phone = "—",
          address = "—",
          website = "",
          membershipLevel = "—"
        } = member;

        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        // Normalizza website per evitare href vuoti
        const safeWebsite = website ? website : null;

        card.innerHTML = `
          <img src="${member.imageUrl}" alt="Logo di ${member.name}" loading="lazy" onerror="this.style.display='none'"> 
          <div class="spotlight-details">
            <h3>${name}</h3>
            <p><strong>Telefono:</strong> ${phone}</p>
            <p><strong>Indirizzo:</strong> ${address}</p>
            ${safeWebsite
              ? `<p><strong>Sito Web:</strong> <a href="${safeWebsite}" target="_blank" rel="noopener">${safeWebsite}</a></p>`
              : `<p><strong>Sito Web:</strong> —</p>`}
            <p><strong>Livello:</strong> ${membershipLevel}</p>
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

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

