
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