/* =========================================================
   Birthday Surprise — app engine
   ------------------------------------------------------------
   Simple, single-page reveal. All text lives in CONFIG below.
   No dependencies, no build step.
   ========================================================= */

const CONFIG = {
  /* ---- her name + the two dates ---- */
  herName: "Divya dharshini",
  fakeDate: "November 27",
  realDate: "09 • 11 • 2026 🎂💙",
  /* ---------------------------------- */

  text: {
    /* 1. Opening */
    openTitle: "Hey, Dumbhead 👀💙",
    openLede: "I made a little something for you.",
    openBtn: "Open Your Surprise 🎁",

    /* 2. Birthday reveal */
    revealLine1: "First of all... 👀",
    revealLine2: "You told me your birthday was November 27.",
    revealLine3: "Nice try, Dumbhead. 😂",
    revealLine4: "Your actual birthday is...",
    revealBtn: "Okay, continue 👉",

    /* 3. Gojo visual */
    gojoTitle: "Special Grade LIAR 👁️💙",
    gojoSub: "A little message for the LIAR. 😂",
    gojoBtn: "Show me the message 💌",

    /* 4. Final message */
    messageTitle: "Happy Birthdayyy Dumbhead! 🎂💙",
    messageBody: [
      "I know one day you'll travel all around the universe, not only the earth",
      "With your legendary memory, I wouldn't be surprised if you finished reading this and then forgot to reply. 💀📖😭",
      "Honestly, your memory deserves its own birthday gift. Maybe a notebook? A reminder app? Or should I just repeat everything 27 times until you remember? 😭😂",
    ],
    messageSignOff: [
      "With dumbness,",
      "Your Dumbhead Companion and as well as Your Ideal Lover 😂💙",
    ],

    /* Closing */
    closingLine: "Happy Birthday, Divya dharshini.    i think i spelled your name correctly, am I?",
    replayBtn: "Replay",
  },
};

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  };

  /* ---------- text ---------- */

  function applyText() {
    $$("[data-txt]").forEach(function (el) {
      var key = el.getAttribute("data-txt");
      var val = CONFIG.text[key];
      if (val == null) return;
      el.textContent = String(val);
    });

    // the real date is separate so it can be emphasised on its own
    var dateEl = $('[data-txt="realDate"]');
    if (dateEl) dateEl.textContent = CONFIG.realDate;

    document.title = "Happy Birthday 💙";

    // final message — paragraphs then the exact sign-off
    var msg = $("#finalMessage");
    if (msg) {
      var parts = CONFIG.text.messageBody.map(function (p) {
        return "<p>" + p + "</p>";
      });
      parts.push(
        '<div class="message__sign">' +
          '<p class="message__sign-a">' + CONFIG.text.messageSignOff[0] + "</p>" +
          '<p class="message__sign-b">' + CONFIG.text.messageSignOff[1] + "</p>" +
        "</div>"
      );
      msg.innerHTML = parts.join("");
    }
  }

  /* ---------- ambient stars ---------- */

  function makeStars() {
    var host = $("#stars");
    if (!host) return;
    var n = window.innerWidth < 620 ? 26 : 48;
    var html = "";
    for (var i = 0; i < n; i++) {
      var size = (Math.random() * 1.7 + 0.7).toFixed(2);
      var dur = (Math.random() * 16 + 14).toFixed(1);
      var delay = (-Math.random() * 30).toFixed(1);
      var left = (Math.random() * 100).toFixed(2);
      var op = (Math.random() * 0.5 + 0.2).toFixed(2);
      html +=
        '<span class="star" style="left:' + left + "%;width:" + size + "px;height:" + size +
        "px;opacity:" + op + ";animation-duration:" + dur + "s;animation-delay:" + delay + 's"></span>';
    }
    host.innerHTML = html;
  }

  /* ---------- floating particles around the main Gojo image ---------- */

  function makeParticles() {
    var host = $("#gojoParticles");
    if (!host || reduced) return;
    var n = window.innerWidth < 620 ? 10 : 18;
    var html = "";
    for (var i = 0; i < n; i++) {
      var left = (Math.random() * 100).toFixed(1);
      var top = (Math.random() * 100).toFixed(1);
      var size = (Math.random() * 3 + 1.5).toFixed(1);
      var dur = (Math.random() * 7 + 6).toFixed(1);
      var delay = (-Math.random() * 8).toFixed(1);
      html +=
        '<span class="gp" style="left:' + left + "%;top:" + top + "%;width:" + size +
        "px;height:" + size + "px;animation-duration:" + dur + "s;animation-delay:" + delay + 's"></span>';
    }
    host.innerHTML = html;
  }

  /* ---------- confetti ---------- */

  var confettiCanvas = null;
  var confettiCtx = null;
  var confettiRaf = null;
  var openBtn = null;

  function sizeConfetti() {
    if (!confettiCanvas) return;
    var d = Math.min(window.devicePixelRatio || 1, 2);
    confettiCanvas.width = Math.round(window.innerWidth * d);
    confettiCanvas.height = Math.round(window.innerHeight * d);
    confettiCtx.setTransform(d, 0, 0, d, 0, 0);
  }

  function fireConfetti(count, duration) {
    if (reduced || !confettiCtx) return;
    count = count || 110;
    duration = duration || 2200;

    var w = window.innerWidth;
    var h = window.innerHeight;
    var bits = [];
    var colors = ["#4fc3ff", "#a06bff", "#8ddffd", "#ffffff", "#6fe0ff"];

    for (var i = 0; i < count; i++) {
      bits.push({
        x: Math.random() * w,
        y: -20 - Math.random() * h * 0.4,
        vx: (Math.random() - 0.5) * 3.4,
        vy: 2 + Math.random() * 3.6,
        s: 4 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.16,
        c: colors[(Math.random() * colors.length) | 0],
      });
    }

    if (confettiRaf) cancelAnimationFrame(confettiRaf);
    var start = performance.now();

    (function tick(now) {
      var t = now - start;
      if (t > duration) {
        confettiCtx.clearRect(0, 0, w, h);
        confettiRaf = null;
        return;
      }
      confettiCtx.clearRect(0, 0, w, h);
      confettiCtx.globalAlpha = Math.max(0, 1 - t / duration);
      for (var i = 0; i < bits.length; i++) {
        var b = bits[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.035;
        b.rot += b.vr;
        confettiCtx.save();
        confettiCtx.translate(b.x, b.y);
        confettiCtx.rotate(b.rot);
        confettiCtx.fillStyle = b.c;
        confettiCtx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2);
        confettiCtx.restore();
      }
      confettiCtx.globalAlpha = 1;
      confettiRaf = requestAnimationFrame(tick);
    })(performance.now());
  }

  window.fireConfetti = fireConfetti;

  function setupConfetti() {
    confettiCanvas = document.getElementById("confetti");
    confettiCtx = confettiCanvas.getContext("2d");
    sizeConfetti();
  }

  /* ---------- reveal ---------- */

  var sections = ["#reveal", "#gojo", "#message"];

  function reveal(id) {
    var el = typeof id === "string" ? $(id) : id;
    if (!el) return;
    el.hidden = false;
    // next frame so the transition actually runs
    requestAnimationFrame(function () {
      el.classList.add("is-in");
    });
  }

  function scrollToSection(id) {
    var el = $(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
  }

  /* briefly intensify the reveal section's glow when the real date lands */
  function pulseReveal() {
    var section = $("#reveal");
    if (!section) return;
    section.classList.add("is-pulsing");
    setTimeout(function () {
      section.classList.remove("is-pulsing");
    }, 1800);
  }

  /* ---------- open the surprise ---------- */

  function openSurprise() {
    sections.forEach(function (sel, i) {
      setTimeout(function () { reveal(sel); }, reduced ? 0 : i * 130);
    });

    setTimeout(function () {
      scrollToSection("#reveal");

      // the date lands after the scroll settles
      setTimeout(function () {
        var big = $(".big-date");
        if (big) big.classList.add("is-on");
        pulseReveal();
        fireConfetti(120, 2300);
      }, reduced ? 0 : 700);
    }, reduced ? 0 : 260);
  }

  /* ---------- replay ---------- */

  function replay() {
    if (confettiRaf) {
      cancelAnimationFrame(confettiRaf);
      confettiRaf = null;
      confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    sections.forEach(function (sel) {
      var el = $(sel);
      if (!el) return;
      el.hidden = true;
      el.classList.remove("is-in");
    });

    // re-arm the opening button so the experience can be run again
    openBtn = $("#openBtn");
    if (openBtn) {
      openBtn.disabled = false;
      openBtn.classList.remove("is-done");
    }

    var big = $(".big-date");
    if (big) big.classList.remove("is-on");

    var revealSection = $("#reveal");
    if (revealSection) revealSection.classList.remove("is-pulsing");

    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  /* ---------- wiring ---------- */

  function init() {
    applyText();
    makeStars();
    makeParticles();
    setupConfetti();

    openBtn = $("#openBtn");

    document.addEventListener("click", function (e) {
      var btn = e.target.closest("#openBtn");
      if (btn && !btn.disabled) {
        btn.disabled = true;
        btn.classList.add("is-done");
        openSurprise();
        return;
      }

      var replayBtn = e.target.closest("#replayBtn");
      if (replayBtn) {
        e.preventDefault();
        replay();
        return;
      }

      var jump = e.target.closest("[data-scroll]");
      if (jump) {
        e.preventDefault();
        scrollToSection(jump.getAttribute("data-scroll"));
      }
    });

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        sizeConfetti();
        makeStars();
        makeParticles();
      }, 200);
    });

    // images: report load failures loudly in dev, never break the page
    $$("img").forEach(function (img) {
      img.addEventListener("error", function () {
        console.warn("[birthday] image failed to load:", img.getAttribute("src"));
      });
    });

    document.body.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
