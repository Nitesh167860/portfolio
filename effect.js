(function () {
  // prevent double init (important for SPA / page transitions)
  if (window.__snakeCursorLoaded) return;
  window.__snakeCursorLoaded = true;

  const canvas = document.getElementById("snakeCursor");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resizeCursor() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCursor();
  window.addEventListener("resize", resizeCursor);

  /* ===== STATE ===== */
  /* ===== STATE ===== */
let cursorEnabled = localStorage.getItem("snakeCursor") !== "off";

document.body.classList.toggle("cursor-off", !cursorEnabled);


  /* ===== MOUSE ===== */
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  /* ===== SNAKE ===== */
  const snake = [];
  const LEN = 40;
  let hue = 0;

  for (let i = 0; i < LEN; i++) snake.push({ ...mouse });

  /* ===== THEME COLORS ===== */
  function getCursorColor() {
    const isDark = document.body.classList.contains("dark");
    return isDark
      ? { base: 180, glow: "#00fff7" }
      : { base: 320, glow: "#ff4ecd" };
  }

  /* ===== ANIMATION ===== */
  function animateCursor() {
    if (!cursorEnabled) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(animateCursor);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake[0].x += (mouse.x - snake[0].x) * 0.25;
    snake[0].y += (mouse.y - snake[0].y) * 0.25;

    for (let i = 1; i < snake.length; i++) {
      snake[i].x += (snake[i - 1].x - snake[i].x) * 0.35;
      snake[i].y += (snake[i - 1].y - snake[i].y) * 0.35;
    }

    const theme = getCursorColor();
    hue += 1.5;

    for (let i = 0; i < snake.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(snake[i].x, snake[i].y);
      ctx.lineTo(snake[i + 1].x, snake[i + 1].y);

      ctx.strokeStyle = `hsla(
        ${theme.base + hue + i * 4},
        100%,
        60%,
        ${1 - i / snake.length}
      )`;

      ctx.lineWidth = 10 - i * 0.2;
      ctx.lineCap = "round";
      ctx.shadowBlur = 18;
      ctx.shadowColor = theme.glow;
      ctx.stroke();
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  /* ===== GLOBAL TOGGLE (accessible from any page) ===== */
  window.toggleSnakeCursor = function () {
  cursorEnabled = !cursorEnabled;

  localStorage.setItem(
    "snakeCursor",
    cursorEnabled ? "on" : "off"
  );

  document.body.classList.toggle("cursor-off", !cursorEnabled);
};

  /* ===== THEME SYNC ===== */
  document.addEventListener("click", e => {
    if (e.target.closest(".theme-toggle")) {
      document.body.classList.toggle("dark");

      document.documentElement.style.setProperty(
        "--toggle-color",
        document.body.classList.contains("")
          ? "#00fff7"
          : "#00fff7"
      );
    }
  });

})();

window.addEventListener("load", () => {

    const icon = document.getElementById("wheelIcon");

    if(!icon) return;

    icon.textContent =
        localStorage.getItem("snakeCursor") === "off"
        ? "💤"
        : "🐍";
});

const oldToggle = window.toggleSnakeCursor;

window.toggleSnakeCursor = function(){

    oldToggle();

    const icon = document.getElementById("wheelIcon");

    if(!icon) return;

    icon.textContent =
        localStorage.getItem("snakeCursor") === "off"
        ? "💤"
        : "🐍";
};