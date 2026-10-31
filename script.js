document.addEventListener("DOMContentLoaded", function () {
  const enterBtn = document.getElementById("enterBtn");
  const intro = document.getElementById("intro");
  const experience = document.getElementById("experience");
  const bgMusic = document.getElementById("bgMusic");
  const soundBtn = document.getElementById("soundBtn");
  const surpriseBtn = document.getElementById("surpriseBtn");
  const surpriseMessage = document.getElementById("surpriseMessage");

  if (enterBtn && intro && experience) {
    enterBtn.addEventListener("click", function () {
      intro.classList.add("hidden");
      experience.classList.remove("hidden");
      document.body.classList.add("entered");

      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("visible");
      });

      window.scrollTo(0, 0);

      if (bgMusic) {
        bgMusic.play().catch(function () {});
      }
    });
  }

  if (soundBtn && bgMusic) {
    soundBtn.addEventListener("click", function () {
      if (bgMusic.paused) {
        bgMusic.play().then(function () {
          soundBtn.innerHTML = "♫ <span>Music on</span>";
        }).catch(function () {});
      } else {
        bgMusic.pause();
        soundBtn.innerHTML = "♫ <span>Music off</span>";
      }
    });
  }

  function launchConfetti(amount) {
    const symbols = ["✦", "✧", "♡", "•"];

    for (let i = 0; i < amount; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti";
      piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.animationDuration = (3 + Math.random() * 4) + "s";
      document.body.appendChild(piece);
      setTimeout(function () {
        piece.remove();
      }, 7500);
    }
  }

  if (surpriseBtn && surpriseMessage) {
    surpriseBtn.addEventListener("click", function () {
      surpriseMessage.classList.remove("hidden");
      launchConfetti(100);
      surpriseBtn.textContent = "A wish sent to the universe ✨";
      surpriseBtn.disabled = true;
    });
  }
});
