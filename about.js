/* =========================
   TYPING TEXT ANIMATION
========================= */
const texts = ["Web Developer", "Frontend Developer", "UI/UX Designer", "PHP Developer"];
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


/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
/* SMOOTH SCROLL REVEAL */
const items = document.querySelectorAll(
  ".scroll-animate, .timeline-item"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

items.forEach(el => observer.observe(el));
const toggleBtn = document.querySelector(".theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  toggleBtn.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".theme-toggle");

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    toggle.textContent = document.body.classList.contains("dark")
      ? "☀️"
      : "🌙";
  });
});
