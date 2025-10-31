
document.getElementById("ham-btn").addEventListener("click", () => {
  const nav = document.getElementById("Menu");
  // nav.style.display = "flex" ? "none" : "flex";

  if (nav.style.display === 'flex'){
    nav.style.display = 'none';
  }
  else {
    nav.style.display = 'flex';
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('#Menu a');
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

