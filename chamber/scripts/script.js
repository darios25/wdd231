// const url = './data/members.json';


// async function getMembersData(url) {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Error HTTP: ${response.status}`);
//     }
//     const data = await response.json();
    
//     displayMembers(data.members);
//   } catch (error) {
//     console.error("Error al obtener los datos:", error);
//   }
// }


// function displayMembers(members) {
//   const display = document.querySelector("#cards");
//   display.innerHTML = ""; 
  
//   members.forEach(member => {
    
//     const card = document.createElement("section");
//     card.classList.add("card");

    
//     const companyName = document.createElement("h2");
//     companyName.textContent = member.name;

    
//     const portrait = document.createElement("img");
//     portrait.setAttribute("src", member.imageUrl);
//     portrait.setAttribute("alt", `Logo de ${member.name}`);
//     portrait.setAttribute("loading", "lazy");
//     portrait.setAttribute("width", "100");
//     portrait.setAttribute("height", "100");

    
//     const address = document.createElement("p");
//     address.textContent = member.address;

    
//     const phoneNumber = document.createElement("p");
//     phoneNumber.textContent = member.phone;

    
//     const website = document.createElement("a");
//     website.setAttribute("href", member.website);
//     website.setAttribute("target", "_blank");
//     website.textContent = "Sitio web";

    
//     card.appendChild(companyName);
//     card.appendChild(portrait);
//     card.appendChild(address);
//     card.appendChild(phoneNumber);
//     card.appendChild(website);

    
//     const description = document.createElement("p");
//     description.textContent = member.description;
//     card.appendChild(description);
    
   
//     display.appendChild(card);
//   });
// }


// document.addEventListener('DOMContentLoaded', () => {
//   const gridbutton = document.querySelector("#grid");
//   const listbutton = document.querySelector("#list");
//   const display = document.querySelector("#cards");

//   if (gridbutton && listbutton && display) {
    // Vista Grid
    // gridbutton.addEventListener("click", () => {
    //   display.classList.add("grid");
    //   display.classList.remove("list");
    // });

    // Vista Lista
//     listbutton.addEventListener("click", () => {
//       display.classList.add("list");
//       display.classList.remove("grid");
//     });
//   } else {
//     console.error("No se encontraron los elementos necesarios (botones o contenedor).");
//   }
  
  
//   getMembersData(url);
// });

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
