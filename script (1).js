const enterBtn = document.getElementById("enterBtn");
const intro = document.getElementById("intro");
const experience = document.getElementById("experience");
const bgMusic = document.getElementById("bgMusic");
const soundBtn = document.getElementById("soundBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");

enterBtn.addEventListener("click", () => {
  intro.classList.add("fade-away");
  window.setTimeout(() => {
    intro.classList.add("hidden");
    experience.classList.remove("hidden");
    document.body.classList.add("entered");
    revealObserver.observeAll?.();
    revealAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 450);
  bgMusic.play().then(() => updateSoundButton(true)).catch(() => updateSoundButton(false));
});

function updateSoundButton(isPlaying) {
  soundBtn.innerHTML = isPlaying ? "♫ <span>Music on</span>" : "♫ <span>Music off</span>";
  soundBtn.setAttribute("aria-label", isPlaying ? "Turn music off" : "Turn music on");
}
soundBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().then(() => updateSoundButton(true)).catch(() => updateSoundButton(false));
  } else {
    bgMusic.pause();
    updateSoundButton(false);
  }
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function revealAll() {
  document.querySelectorAll(".experience .reveal").forEach(el => revealObserver.observe(el));
}
revealAll();

document.addEventListener("mousemove", event => {
  const glow = document.querySelector(".cursor-glow");
  if (glow && window.innerWidth > 700) {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  }
});

function launchConfetti(amount = 100) {
  const symbols = ["✦", "✧", "♡", "•"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.color = ["#f4b9dc", "#c9b5ff", "#f5d89a", "#ffffff"][Math.floor(Math.random() * 4)];
    piece.style.fontSize = (8 + Math.random() * 12) + "px";
    piece.style.animationDuration = (3 + Math.random() * 4) + "s";
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 7500);
  }
}

surpriseBtn.addEventListener("click", () => {
  surpriseMessage.classList.remove("hidden");
  launchConfetti(150);
  surpriseBtn.textContent = "A wish sent to the universe ✨";
  surpriseBtn.disabled = true;
});

// A gentle sprinkle of stars when the page is opened.
window.addEventListener("load", () => window.setTimeout(() => launchConfetti(28), 500));
