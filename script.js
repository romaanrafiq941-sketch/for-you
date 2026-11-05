/**
 * =========================================================================
 * 💖 PROPOSAL WEBSITE CONFIGURATION
 * Customize these fields with your girlfriend's name, memories, and photos!
 * =========================================================================
 */
const CONFIG = {
  // Her name or pet name
  herName: "Sarah", // Change this to her name or nickname!

  // Your name or nickname for the sign-off
  yourName: "Uzair",

  // Main heartfelt message in the letter
  loveMessage: `From the endless late-night conversations to all the silly inside jokes and quiet moments... you've quickly become my favorite part of every day. Life is just so much brighter, funnier, and more beautiful whenever you're around.`,

  // 3-4 Special Moments / Photos (Place your own image URLs or local files in the same folder!)
  memories: [
    {
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=700&q=80",
      title: "That First Unforgettable Day",
      caption: "When we talked for hours and neither of us wanted the night to end.",
      rotation: "-2deg"
    },
    {
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80",
      title: "Laughing Until Our Stomachs Hurt",
      caption: "You have the most contagious, adorable smile in the entire universe.",
      rotation: "2deg"
    },
    {
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80",
      title: "Every Little Coffee & Walk",
      caption: "Even the simplest errands feel like adventures when I'm with you.",
      rotation: "-1.5deg"
    },
    {
      image: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=700&q=80",
      title: "The Comfort We Share",
      caption: "Knowing I can truly be 100% myself around you.",
      rotation: "1.5deg"
    }
  ],

  // Cute reasons why you adore her
  reasons: [
    {
      icon: "smile",
      title: "Your Heart of Gold",
      text: "The kindness and genuine warmth you show to everyone around you is unmatched."
    },
    {
      icon: "laugh",
      title: "Your Sense of Humor",
      text: "You always know how to make me laugh, even on the longest days."
    },
    {
      icon: "heart-handshake",
      title: "You're My Best Friend",
      text: "Before anything else, you're the person I want to tell everything to first."
    },
    {
      icon: "sparkles",
      title: "Just Being You",
      text: "You don't have to try. Just being in the room makes everything better."
    }
  ],

  // Playful excuses when she hovers or tries to click "No"
  noExcuses: [
    "Are you sure? 🥺",
    "Think about it again!",
    "I'll buy you food! 🍕",
    "Pookie please... 🥹",
    "Look at how shiny the YES button is!",
    "Wrong button! Try the other one 😉",
    "You can't escape my love! 🏃‍♂️💨",
    "Error 404: 'No' option not found 💖",
    "Nice try, haha!"
  ]
};

// Load persisted config from localStorage if available
function getActiveConfig() {
  try {
    const saved = localStorage.getItem("proposal_custom_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...CONFIG, ...parsed };
    }
  } catch (e) {
    console.warn("Could not load saved config", e);
  }
  return CONFIG;
}

let activeConfig = getActiveConfig();

// =========================================================================
// SOUND GENERATOR (Web Audio API - Works everywhere with zero audio files!)
// =========================================================================
class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Playful dodge boing sound
  playBoing() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.log("Audio play prevented:", e);
    }
  }

  // Sweet envelope chime
  playOpenChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        const now = this.ctx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      });
    } catch (e) {
      console.log("Audio play prevented:", e);
    }
  }

  // Celebratory fanfare chime on YES
  playCelebrationFanfare() {
    try {
      this.init();
      if (!this.ctx) return;
      const melody = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.14 }, // G5
        { f: 1046.50, d: 0.35 } // C6
      ];
      let start = this.ctx.currentTime;
      melody.forEach((note) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(note.f, start);
        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.d + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + note.d + 0.2);
        start += note.d;
      });
    } catch (e) {
      console.log("Audio play prevented:", e);
    }
  }
}

const sfx = new SoundEffects();


// =========================================================================
// BACKGROUND FLOATING HEARTS CANVAS
// =========================================================================
function setupFloatingHearts() {
  const canvas = document.getElementById("hearts-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let hearts = [];
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Heart {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
      this.opacity = Math.random() * 0.4 + 0.2;
      this.color = Math.random() > 0.4 ? "#f43f5e" : "#fda4af";
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 1.5;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotSpeed;
      if (this.y < -30) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.scale(this.size / 20, this.size / 20);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20);
      ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  // Create 24 gentle floating hearts
  for (let i = 0; i < 24; i++) {
    hearts.push(new Heart());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((h) => {
      h.update();
      h.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}


// =========================================================================
// RUNAWAY "NO" BUTTON & YES EXPANSION
// =========================================================================
let excuseIndex = 0;
let yesScale = 1;

function setupPlayfulButtons() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const funMessage = document.getElementById("funMessage");

  if (!noBtn || !yesBtn) return;

  function dodgeButton(e) {
    if (e) e.preventDefault();

    sfx.playBoing();
    noBtn.classList.add("dodging");

    // Dimensions
    const btnWidth = noBtn.offsetWidth || 100;
    const btnHeight = noBtn.offsetHeight || 44;
    const padding = 20;

    // Viewport bounds
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    // Calculate a random spot within safe margins
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Cycle through humorous excuses
    noBtn.innerText = CONFIG.noExcuses[excuseIndex % CONFIG.noExcuses.length];
    if (funMessage) {
      funMessage.innerText = `Attempt ${excuseIndex + 1}: The button is too fast! 💨`;
    }
    excuseIndex++;

    // Make the YES button progressively bigger and more tempting!
    yesScale += 0.08;
    if (yesScale > 1.6) yesScale = 1.6;
    yesBtn.style.transform = `scale(${yesScale})`;
  }

  // Desktop hover
  noBtn.addEventListener("mouseenter", dodgeButton);
  // Mobile touch / click
  noBtn.addEventListener("touchstart", dodgeButton, { passive: false });
  noBtn.addEventListener("click", dodgeButton);
}


// =========================================================================
// POPULATE DYNAMIC CONTENT
// =========================================================================
function renderContent() {
  activeConfig = getActiveConfig();

  // Set Names
  const herNameDisplay = document.getElementById("herNameDisplay");
  if (herNameDisplay) herNameDisplay.innerText = activeConfig.herName;

  const loveMessage = document.getElementById("loveMessage");
  if (loveMessage) loveMessage.innerText = activeConfig.loveMessage;

  const signatureDisplay = document.getElementById("signatureDisplay");
  if (signatureDisplay) signatureDisplay.innerText = `— Yours Always, ${activeConfig.yourName} ❤️`;

  // Render Memories / Polaroids
  const memoriesGrid = document.getElementById("memoriesGrid");
  if (memoriesGrid) {
    memoriesGrid.innerHTML = activeConfig.memories.map((m) => `
      <div class="polaroid-card" style="transform: rotate(${m.rotation || '0deg'});">
        <div class="w-full h-48 sm:h-56 overflow-hidden rounded-md bg-pink-100 mb-3">
          <img src="${m.image}" alt="${m.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
        </div>
        <h4 class="font-serif font-bold text-gray-800 text-sm sm:text-base">${m.title}</h4>
        <p class="font-handwritten text-rose-600 text-lg leading-tight mt-1">${m.caption}</p>
      </div>
    `).join("");
  }

  // Render Reasons
  const reasonsList = document.getElementById("reasonsList");
  if (reasonsList) {
    reasonsList.innerHTML = activeConfig.reasons.map((r) => `
      <div class="flex items-start gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-pink-100 shadow-sm hover:shadow-md transition-all">
        <div class="p-2.5 rounded-xl bg-rose-100 text-rose-600 shrink-0">
          <i data-lucide="${r.icon}" class="w-5 h-5"></i>
        </div>
        <div>
          <h4 class="font-semibold text-gray-800 text-sm sm:text-base">${r.title}</h4>
          <p class="text-xs sm:text-sm text-gray-600 mt-0.5">${r.text}</p>
        </div>
      </div>
    `).join("");
  }

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}


// =========================================================================
// ENVELOPE OPENING & PHASE TRANSITIONS
// =========================================================================
function setupEnvelope() {
  const envelope = document.getElementById("envelope");
  const openLetterBtn = document.getElementById("openLetterBtn");
  const envelopeSection = document.getElementById("envelope-section");
  const contentSection = document.getElementById("content-section");

  let isOpening = false;

  function openLetter() {
    if (isOpening) return;
    isOpening = true;

    sfx.playOpenChime();
    if (envelope) envelope.classList.add("open");

    setTimeout(() => {
      // Fade out envelope section
      if (envelopeSection) {
        envelopeSection.style.transition = "opacity 0.4s ease";
        envelopeSection.style.opacity = "0";
      }

      setTimeout(() => {
        if (envelopeSection) envelopeSection.classList.add("hidden");
        if (contentSection) {
          contentSection.classList.remove("hidden");
          setTimeout(() => {
            contentSection.style.opacity = "1";
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 50);
        }
      }, 400);
    }, 800);
  }

  if (envelope) envelope.addEventListener("click", openLetter);
  if (openLetterBtn) openLetterBtn.addEventListener("click", openLetter);
}


// =========================================================================
// CELEBRATION & CONFETTI (YES BUTTON)
// =========================================================================
function fireMassiveConfetti() {
  if (typeof confetti !== "function") return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55, colors: ["#f43f5e", "#fda4af", "#ffedd5"] });
  fire(0.2, { spread: 60, colors: ["#ec4899", "#fb7185", "#ffffff"] });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });

  // Secondary burst from both sides
  setTimeout(() => {
    confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 } });
  }, 400);
}

function setupCelebration() {
  const yesBtn = document.getElementById("yesBtn");
  const modal = document.getElementById("celebrationModal");
  const card = document.getElementById("celebrationCard");
  const closeBtn = document.getElementById("closeModalBtn");

  if (!yesBtn || !modal) return;

  yesBtn.addEventListener("click", () => {
    sfx.playCelebrationFanfare();
    fireMassiveConfetti();

    // Show celebration modal
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.style.opacity = "1";
      if (card) {
        card.style.transform = "scale(1)";
      }
    }, 50);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.opacity = "0";
      if (card) card.style.transform = "scale(0.9)";
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 400);
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal && closeBtn) closeBtn.click();
  });
}


// =========================================================================
// MUSIC TOGGLE
// =========================================================================
function setupMusicPlayer() {
  const btn = document.getElementById("musicToggleBtn");
  const audio = document.getElementById("bgMusic");
  const statusText = document.getElementById("musicStatusText");

  if (!btn || !audio) return;

  let isPlaying = false;

  btn.addEventListener("click", () => {
    sfx.init();
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        if (statusText) statusText.innerText = "Music Playing 🎶";
        btn.classList.add("border-pink-300", "bg-pink-50");
      }).catch((err) => {
        console.log("Audio autoplay restricted:", err);
      });
    } else {
      audio.pause();
      isPlaying = false;
      if (statusText) statusText.innerText = "Play Soft Music";
      btn.classList.remove("border-pink-300", "bg-pink-50");
    }
  });
}


// =========================================================================
// CUSTOMIZER MODAL CONTROLS
// =========================================================================
function setupCustomizer() {
  const customizeBtn = document.getElementById("customizeBtn");
  const customizeModal = document.getElementById("customizeModal");
  const closeCustomizeBtn = document.getElementById("closeCustomizeBtn");
  const form = document.getElementById("customizeForm");
  const resetBtn = document.getElementById("resetDefaultsBtn");

  if (!customizeBtn || !customizeModal) return;

  function openModal() {
    const cfg = getActiveConfig();
    document.getElementById("inputHerName").value = cfg.herName || "";
    document.getElementById("inputYourName").value = cfg.yourName || "";
    document.getElementById("inputLoveMessage").value = cfg.loveMessage || "";

    if (cfg.memories && cfg.memories[0]) {
      document.getElementById("inputMemoryTitle1").value = cfg.memories[0].title || "";
      document.getElementById("inputMemoryCaption1").value = cfg.memories[0].caption || "";
    }
    if (cfg.memories && cfg.memories[1]) {
      document.getElementById("inputMemoryTitle2").value = cfg.memories[1].title || "";
      document.getElementById("inputMemoryCaption2").value = cfg.memories[1].caption || "";
    }

    customizeModal.classList.remove("hidden");
    setTimeout(() => {
      customizeModal.style.opacity = "1";
    }, 20);
  }

  function closeModal() {
    customizeModal.style.opacity = "0";
    setTimeout(() => {
      customizeModal.classList.add("hidden");
    }, 300);
  }

  customizeBtn.addEventListener("click", openModal);
  if (closeCustomizeBtn) closeCustomizeBtn.addEventListener("click", closeModal);
  customizeModal.addEventListener("click", (e) => {
    if (e.target === customizeModal) closeModal();
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const current = getActiveConfig();

      const updated = {
        ...current,
        herName: document.getElementById("inputHerName").value.trim() || current.herName,
        yourName: document.getElementById("inputYourName").value.trim() || current.yourName,
        loveMessage: document.getElementById("inputLoveMessage").value.trim() || current.loveMessage,
      };

      if (updated.memories && updated.memories[0]) {
        updated.memories[0].title = document.getElementById("inputMemoryTitle1").value.trim() || updated.memories[0].title;
        updated.memories[0].caption = document.getElementById("inputMemoryCaption1").value.trim() || updated.memories[0].caption;
      }
      if (updated.memories && updated.memories[1]) {
        updated.memories[1].title = document.getElementById("inputMemoryTitle2").value.trim() || updated.memories[1].title;
        updated.memories[1].caption = document.getElementById("inputMemoryCaption2").value.trim() || updated.memories[1].caption;
      }

      localStorage.setItem("proposal_custom_config", JSON.stringify(updated));
      renderContent();
      closeModal();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      localStorage.removeItem("proposal_custom_config");
      renderContent();
      closeModal();
    });
  }
}
// =========================================================================
// INITIALIZE APPLICATION
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderContent();
  setupFloatingHearts();
  setupEnvelope();
  setupPlayfulButtons();
  setupCelebration();
  setupMusicPlayer();
  setupCustomizer();
});
