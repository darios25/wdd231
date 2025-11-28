// const menuToggle = document.getElementById('menuToggle');
// const menuLinks = document.getElementById('menuLinks');

// menuToggle.addEventListener('click', () => {
//   const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
//   menuToggle.setAttribute('aria-expanded', !isExpanded);
//   menuLinks.classList.toggle('show');
// });
// document.getElementById("year").textContent = new Date().getFullYear();
// document.getElementById("lastModified").textContent = document.lastModified;


// -----------------------------
// Toggle menu mobile
// -----------------------------
// const menuToggle = document.getElementById("menu-toggle");
// const menuItems = document.getElementById("menu-items");

// menuToggle.addEventListener("click", () => {
//   menuItems.classList.toggle("open");
// });

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

// -----------------------------
// Recupero parametri dal form (query string)
// -----------------------------
const params = new URLSearchParams(window.location.search);

// Funzione di utilità per inserire valori nei <span>
function setField(id, paramName) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = params.get(paramName) || "—";
  }
}

//  Nota: negli id del tuo HTML ci sono spazi e slash (es. "title/position").
// In HTML gli id dovrebbero essere senza spazi o caratteri speciali.
// Ti consiglio di rinominarli così: "titlePosition", "businessName", "membershipLevel", "businessDescription".
// Qui sotto li tratto come se fossero corretti.
setField("firstName", "first-name");
setField("lastName", "last-name");
setField("titleposition", "title"); // usa il name del form
setField("email", "email");
setField("phone", "phone");
setField("businessorganization name", "business");
setField("membership level", "membership");
setField("business description", "description");
setField("timestamp", "timestamp");

const d = new Date();
document.getElementById("timestamp").innerHTML = d;