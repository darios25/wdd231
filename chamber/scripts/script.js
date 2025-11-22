


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
