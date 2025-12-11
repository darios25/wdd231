//Il codice all'interno di questa funzione viene eseguito una volta che il DOM è completamente caricato
//  document.addEventListener('DOMContentLoaded', function () {
    // Elementos del modal
    // const dialogBox = document.querySelector("#dialogBox");
    // const closeButton = document.querySelector("#closeButton");
    // const dialogBoxText = dialogBox ? dialogBox.querySelector("div") : null;

    // Pulsanti per aprire la finestra modale
    // const openButton1 = document.querySelector("#openButton1");
    // const openButton2 = document.querySelector("#openButton2");
    // const openButton3 = document.querySelector("#openButton3");
    // const openButton4 = document.querySelector("#openButton4");

    // Ci assicuriamo che i pulsanti e la finestra modale esistano prima di aggiungere eventi
    //Ci assicuriamo che questi elementi esistano prima di tentare
    //assegnare loro eventi o manipolazioni. Se un elemento non esiste,
    //Non cercheremo di interagire con lui ed eviteremo errori.   // Apri la finestra modale
    // if (dialogBox && dialogBoxText && closeButton) {
    //     if (openButton1) {
    //         openButton1.addEventListener("click", () => {
    //             dialogBox.showModal();
    //             dialogBoxText.innerHTML = "Access to networking and events for non-profits at no cost.";
    //         });
    //     }
    //     if (openButton2) {
    //         openButton2.addEventListener("click", () => {
    //             dialogBox.showModal();                                                        
    //             dialogBoxText.innerHTML = "Includes basic discounts and exclusive webinars.";
    //         });
    //     }
    //     if (openButton3) {
    //         openButton3.addEventListener("click", () => {
    //             dialogBox.showModal();
    //             dialogBoxText.innerHTML = "Additional discounts and priority event access.";
    //         });
    //     }
    //     if (openButton4) {
    //         openButton4.addEventListener("click", () => {
    //             dialogBox.showModal();
    //             dialogBoxText.innerHTML = "All benefits included plus VIP event access and exclusive advertising opportunities.";
    //         });
    //     }

    //     closeButton.addEventListener("click", () => {
    //         dialogBox.close();  
    //     });
    // }

     // Costruisce la query string con i dati del form
    //  const formData = new FormData(form);
    // const params = new URLSearchParams(formData);

    // Reindirizza alla pagina thankyou.html con i dati
//     window.location.href = "thankyou.html?" + params.toString();
// });

// Display message and update storage
// visitEl.textContent = message;
// localStorage.setItem(VISIT_KEY, String(now));

// Footer info
// document.getElementById("year").textContent = new Date().getFullYear();
// document.getElementById("lastModified").textContent = document.lastModified;



// Toggle dark/light theme

// const themeToggle = document.getElementById("theme-toggle");

// themeToggle.addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");
// });

document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------
     MOBILE NAVIGATION MENU
  ------------------------------ */
  const menuToggle = document.getElementById("menu-toggle");
  const menuItems = document.getElementById("menu-items");

  if (menuToggle && menuItems) {
    menuToggle.addEventListener("click", () => {
      menuItems.classList.toggle("open");
    });
  }

  /* ------------------------------
     DARK / LIGHT MODE
  ------------------------------ */
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });

    // Mantieni il tema salvato
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
  }

  /* ------------------------------
     MODAL (solo su join.html)
  ------------------------------ */
  const dialogBox = document.querySelector("#dialogBox");
  const closeButton = document.querySelector("#closeButton");
  const dialogBoxText = dialogBox ? dialogBox.querySelector("div") : null;

  const openButtons = [
    { id: "#openButton1", text: "Perfect for beginners. Includes easy trails and basic guidance." },
    { id: "#openButton2", text: "Ideal for intermediate hikers. Includes medium-difficulty trails." },
    { id: "#openButton3", text: "Advanced trekking routes with steep climbs and long distances." },
    { id: "#openButton4", text: "Includes equipment rental and premium guided tours." }
  ];

  if (dialogBox && dialogBoxText && closeButton) {
    openButtons.forEach(btn => {
      const el = document.querySelector(btn.id);
      if (el) {
        el.addEventListener("click", () => {
          dialogBoxText.innerHTML = btn.text;
          dialogBox.showModal();
        });
      }
    });

    closeButton.addEventListener("click", () => dialogBox.close());
  }

  /* ------------------------------
     FORM HANDLING (solo su join.html)
  ------------------------------ */
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", (e) => {
      const timestampField = document.getElementById("timestamp");
      if (timestampField) {
        timestampField.value = new Date().toLocaleString();
      }
    });
  }

  /* ------------------------------
     FOOTER INFO
  ------------------------------ */
  const yearEl = document.getElementById("year");
  const lastModEl = document.getElementById("lastModified");

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModEl) lastModEl.textContent = document.lastModified;
});

