/* =========================
   MOBILE MENU TOGGLE
========================= */

document.getElementById("year").textContent = new Date().getFullYear();
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    // Change link colors based on theme
    document.querySelectorAll(".nav a").forEach(a => {
      a.style.color = nav.classList.contains("active")
        ? document.body.classList.contains("light") ? "#000" : "#fff"
        : "";
    });
  });
}



/* =========================
   DARK/LIGHT MODE WITH PERSISTENCE
========================= */
const themeBtn = document.querySelector(".theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") document.body.classList.add("light");
if (themeBtn) themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";

themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";

  // Update nav links colors
  document.querySelectorAll(".nav a").forEach(a => {
    a.style.color = document.body.classList.contains("light") ? "#000" : "#fff";
  });
});

/* =========================
   TYPING TEXT ANIMATION
========================= */
const texts = ["Full Stack Web Developer", "Frontend Developer", "UI/UX Designer", "PHP Developer"];
let textIndex = 0, charIndex = 0;
const typingEl = document.querySelector(".typing");

function type() {
  if (!typingEl) return;
  if (charIndex < texts[textIndex].length) {
    typingEl.textContent += texts[textIndex][charIndex++];
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typingEl.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", type);

/* =========================
   SCROLL ANIMATION
========================= */
const scrollItems = document.querySelectorAll(".scroll-animate");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
}, { threshold: 0.2 });

scrollItems.forEach(item => observer.observe(item));

/* =========================
   PAGE TRANSITION
========================= */
const transition = document.querySelector(".page-transition");
const links = document.querySelectorAll("a[href]");

window.addEventListener("load", () => transition?.classList.remove("active"));

links.forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (!href.startsWith("#")) {
      e.preventDefault();
      transition?.classList.add("active");
      setTimeout(() => window.location.href = href, 600);
    }
  });
});

/* =========================
   VIEW MY WORK BUTTON
========================= */
const viewBtn = document.getElementById("viewWorkBtn");
viewBtn?.addEventListener("click", () => {
  transition?.classList.add("active");
  setTimeout(() => window.location.href = "#work", 600);
});

/* =========================
   3D TILT EFFECT ON PROJECT CARDS
========================= */
const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    card.style.transform = `rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
});


/* =========================
   LOAD PROJECTS FROM ADMIN
========================= */
const projectGrid = document.getElementById("projectGrid");
const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

if (projectGrid) {
  projectGrid.innerHTML = storedProjects.map(p => `
    <div class="project-card tilt"
      data-category="${p.category}"
      data-title="${p.title}"
      data-desc="${p.desc}">
      <h3>${p.title}</h3>
      <p>${p.tech}</p>
    </div>
  `).join("");
}

/* RE-ATTACH MODAL EVENTS */
const modal = document.querySelector(".project-modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    modal.classList.add("active");
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
  });
});

document.querySelector(".close-modal")?.addEventListener("click", () => {
  modal.classList.remove("active");
});




/* =========================
   FLOATING BUBBLES SPAWNER
========================= */
const bubblesContainer = document.querySelector(".bubbles");

if (bubblesContainer) {
  setInterval(() => {
    const bubble = document.createElement("span");
    bubble.classList.add("bubble");

    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.animationDuration = 5 + Math.random() * 5 + "s";
    bubble.style.width = bubble.style.height =
      8 + Math.random() * 20 + "px";

    bubblesContainer.appendChild(bubble);

    setTimeout(() => bubble.remove(), 10000);
  }, 600);
}





/* =========================
   RESUME MODAL
========================= */
const resumeBtn = document.querySelector(".resume-btn");
const resumeModal = document.getElementById("resumeModal");
const closeResume = document.querySelector(".close-resume");

resumeBtn?.addEventListener("click", () => {
  resumeModal.classList.add("show");
});

closeResume?.addEventListener("click", () => {
  resumeModal.classList.remove("show");
});

resumeModal?.addEventListener("click", e => {
  if (e.target === resumeModal) {
    resumeModal.classList.remove("show");
  }
});


 // Contact Form JS
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });


  const resumeFrame = document.getElementById("resumeFrame");

// Load resume from admin upload
const storedResume = localStorage.getItem("portfolioResume");
if (storedResume) {
  resumeFrame.src = storedResume;
} else {
  resumeFrame.src = "resume.pdf"; // fallback
}


/* ===== SKILL BAR ANIMATION ===== */
const skillBars = document.querySelectorAll(".bar div");

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.getAttribute("data-level");
      entry.target.style.width = level + "%";
    }
  });
}, { threshold: 0.6 });

skillBars.forEach(bar => skillObserver.observe(bar));


/* ===== PROJECT COUNTER ===== */
const counter = document.querySelector(".counter-box strong");

let started = false;

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !started) {
      started = true;
      let count = 0;
      const target = 300;
      const speed = 15;

      const interval = setInterval(() => {
        count++;
        counter.textContent = count + "+";
        if (count >= target) clearInterval(interval);
      }, speed);
    }
  });
}, { threshold: 0.7 });

counterObserver.observe(counter);

  // Active current page
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav a").forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", function () {

    document.querySelectorAll(".nav a").forEach(navLink => {
      navLink.classList.remove("active");
    });

    this.classList.add("active");
  });
});

