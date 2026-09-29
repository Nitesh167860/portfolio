(function () {
  // prevent double init
  if (window.__snakeCursorLoaded) return;
  window.__snakeCursorLoaded = true;

  const canvas = document.getElementById("snakeCursor");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", {
    alpha: true
  });

  if (!ctx) return;

  /* ===== DEVICE ===== */
  const isMobile =
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth <= 768;

  /* ===== CANVAS ===== */
  function resizeCursor() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCursor();
  window.addEventListener("resize", resizeCursor, {
    passive: true
  });

  /* ===== STATE ===== */
  let cursorEnabled =
    localStorage.getItem("snakeCursor") !== "off";

  document.body.classList.toggle(
    "cursor-off",
    !cursorEnabled
  );

  /* ===== POINTER ===== */
  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  let targetX = mouse.x;
  let targetY = mouse.y;

  /* ===== DESKTOP ===== */
  window.addEventListener(
    "mousemove",
    e => {
      targetX = e.clientX;
      targetY = e.clientY;
    },
    { passive: true }
  );

  /* ===== MOBILE TOUCH ===== */
  window.addEventListener(
    "touchstart",
    e => {
      if (!e.touches.length) return;

      targetX = e.touches[0].clientX;
      targetY = e.touches[0].clientY;

      mouse.x = targetX;
      mouse.y = targetY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    e => {
      if (!e.touches.length) return;

      targetX = e.touches[0].clientX;
      targetY = e.touches[0].clientY;
    },
    { passive: true }
  );

  /* ===== SNAKE ===== */

  // Desktop remains exactly 40
  // Mobile uses fewer segments for smooth performance
  const LEN = isMobile ? 24 : 40;

  const snake = [];
  let hue = 0;

  for (let i = 0; i < LEN; i++) {
    snake.push({
      x: mouse.x,
      y: mouse.y
    });
  }

  /* ===== THEME COLORS ===== */
  function getCursorColor() {
    const isDark =
      document.body.classList.contains("dark");

    return isDark
      ? {
          base: 180,
          glow: "#00fff7"
        }
      : {
          base: 320,
          glow: "#ff4ecd"
        };
  }

  /* ===== ANIMATION ===== */
  let lastFrame = 0;

  function animateCursor(timestamp) {
    requestAnimationFrame(animateCursor);

    /*
      Mobile:
      Limit rendering slightly to reduce CPU/GPU load.
      Desktop remains full speed.
    */
    if (
      isMobile &&
      timestamp - lastFrame < 20
    ) {
      return;
    }

    lastFrame = timestamp;

    if (!cursorEnabled) {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
      return;
    }

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    /* ===== SMOOTH HEAD ===== */

    const headSpeed = isMobile ? 0.18 : 0.25;

    mouse.x +=
      (targetX - mouse.x) * headSpeed;

    mouse.y +=
      (targetY - mouse.y) * headSpeed;

    snake[0].x +=
      (mouse.x - snake[0].x) *
      headSpeed;

    snake[0].y +=
      (mouse.y - snake[0].y) *
      headSpeed;

    /* ===== BODY ===== */

    const bodySpeed = isMobile
      ? 0.28
      : 0.35;

    for (let i = 1; i < snake.length; i++) {
      snake[i].x +=
        (snake[i - 1].x - snake[i].x) *
        bodySpeed;

      snake[i].y +=
        (snake[i - 1].y - snake[i].y) *
        bodySpeed;
    }

    /* ===== COLORS ===== */

    const theme = getCursorColor();

    hue += isMobile ? 1 : 1.5;

    /* ===== PERFORMANCE OPTIMIZATION ===== */

    ctx.lineCap = "round";
    ctx.shadowColor = theme.glow;

    // Mobile uses lighter glow
    ctx.shadowBlur = isMobile ? 8 : 18;

    /* ===== DRAW ===== */

    for (
      let i = 0;
      i < snake.length - 1;
      i++
    ) {
      ctx.beginPath();

      ctx.moveTo(
        snake[i].x,
        snake[i].y
      );

      ctx.lineTo(
        snake[i + 1].x,
        snake[i + 1].y
      );

      ctx.strokeStyle = `hsla(
        ${theme.base + hue + i * 4},
        100%,
        60%,
        ${1 - i / snake.length}
      )`;

      /*
        Desktop:
        Original 10 - i * 0.2

        Mobile:
        Slightly lighter line
      */
      ctx.lineWidth = isMobile
        ? 8 - i * 0.22
        : 10 - i * 0.2;

      ctx.stroke();
    }
  }

  requestAnimationFrame(animateCursor);

  /* ===== GLOBAL TOGGLE ===== */

  window.toggleSnakeCursor = function () {
    cursorEnabled = !cursorEnabled;

    localStorage.setItem(
      "snakeCursor",
      cursorEnabled
        ? "on"
        : "off"
    );

    document.body.classList.toggle(
      "cursor-off",
      !cursorEnabled
    );

    if (!cursorEnabled) {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  };

  /* ===== THEME SYNC ===== */

  document.addEventListener(
    "click",
    e => {
      if (
        e.target.closest(".theme-toggle")
      ) {
        document.body.classList.toggle(
          "dark"
        );

        document.documentElement.style.setProperty(
          "--toggle-color",
          "#00fff7"
        );
      }
    }
  );

})();

/* ===== SNAKE TOGGLE ICON ===== */

window.addEventListener("load", () => {
  const icon =
    document.getElementById("wheelIcon");

  if (!icon) return;

  icon.textContent =
    localStorage.getItem("snakeCursor") ===
    "off"
      ? "💤"
      : "🐍";
});

const oldToggle =
  window.toggleSnakeCursor;

window.toggleSnakeCursor = function () {
  oldToggle();

  const icon =
    document.getElementById("wheelIcon");

  if (!icon) return;

  icon.textContent =
    localStorage.getItem("snakeCursor") ===
    "off"
      ? "💤"
      : "🐍";
};