
document.getElementById("hamburger").addEventListener("click", () => {
  const nav = document.getElementById("navMenu");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
});