/* ===========================
   TYPED TEXT ANIMATION
=========================== */
var titles = [
  "Computer Science Graduate",
  "Cybersecurity MSc Student",
  "AI & Machine Learning Enthusiast",
  "Software Engineer",
  "Full Stack Developer"
];

var titleIndex = 0;
var charIndex = 0;
var isDeleting = false;

function typeEffect() {
  var typedEl = document.getElementById("typed-text");
  if (!typedEl) return;

  var currentTitle = titles[titleIndex];

  if (!isDeleting) {
    typedEl.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentTitle.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typedEl.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

/* ===========================
   DARK / LIGHT MODE TOGGLE
=========================== */
function initTheme() {
  var themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  var savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    var isLight = document.body.classList.contains("light-mode");
    themeToggle.innerHTML = isLight
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

/* ===========================
   MOBILE HAMBURGER MENU
=========================== */
function initHamburger() {
  var hamburger = document.getElementById("hamburger");
  var mobileMenu = document.getElementById("mobile-menu");
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", function () {
    mobileMenu.classList.toggle("open");
    var isOpen = mobileMenu.classList.contains("open");
    hamburger.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  var mobileLinks = mobileMenu.querySelectorAll("a");
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  }
}

/* ===========================
   NAVBAR SCROLL EFFECT
=========================== */
function initNavbarScroll() {
  var navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 4px 30px rgba(0,0,0,0.3)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });
}

/* ===========================
   ACTIVE NAV LINK ON SCROLL
=========================== */
function initActiveNav() {
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    var scrollY = window.scrollY;

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var sectionTop = section.offsetTop - 100;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        for (var j = 0; j < navLinks.length; j++) {
          navLinks[j].style.color = "";
          navLinks[j].style.background = "";
          if (navLinks[j].getAttribute("href") === "#" + sectionId) {
            navLinks[j].style.color = "var(--primary-light)";
            navLinks[j].style.background = "var(--primary-glow)";
          }
        }
      }
    }
  });
}

/* ===========================
   SCROLL REVEAL ANIMATION
=========================== */
function initScrollReveal() {
  var animatables = document.querySelectorAll(
    ".timeline-item, .exp-card, .project-card, .skill-category"
  );

  if (!("IntersectionObserver" in window)) {
    for (var i = 0; i < animatables.length; i++) {
      animatables[i].classList.add("visible");
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        var siblings = Array.from(entry.target.parentElement.children);
        var index = siblings.indexOf(entry.target);
        (function (el, delay) {
          setTimeout(function () {
            el.classList.add("visible");
          }, delay);
        })(entry.target, index * 100);
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  for (var i = 0; i < animatables.length; i++) {
    observer.observe(animatables[i]);
  }
}

/* ===========================
   SMOOTH SCROLL
=========================== */
function initSmoothScroll() {
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href === "#") return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navbar = document.getElementById("navbar");
        var navHeight = navbar ? navbar.offsetHeight : 70;
        var targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    });
  }
}

/* ===========================
   AVATAR FALLBACK
=========================== */
function initAvatarFallback() {
  var avatar = document.querySelector(".avatar");
  var placeholder = document.querySelector(".avatar-placeholder");
  if (!avatar) return;

  avatar.addEventListener("error", function () {
    avatar.style.display = "none";
    if (placeholder) {
      placeholder.style.display = "flex";
    }
  });
}

/* ===========================
   COUNT-UP ANIMATION
=========================== */
function initCountUp() {
  if (!("IntersectionObserver" in window)) return;

  var stats = document.querySelectorAll(".stat-number");

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        var el = entry.target;
        var rawText = el.textContent.trim();
        var numPart = parseInt(rawText, 10);

        if (isNaN(numPart)) {
          observer.unobserve(el);
          continue;
        }

        var suffix = rawText.replace(String(numPart), "");
        var duration = 1500;
        var steps = 60;
        var increment = Math.ceil(numPart / steps);
        var current = 0;

        var interval = setInterval(function (element, target, suf) {
          return function () {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            element.textContent = current + suf;
          };
        }(el, numPart, suffix), duration / steps);

        observer.unobserve(el);
      }
    }
  }, { threshold: 0.5 });

  for (var i = 0; i < stats.length; i++) {
    var text = stats[i].textContent.trim();
    if (!isNaN(parseInt(text, 10))) {
      observer.observe(stats[i]);
    }
  }
}

/* ===========================
   PARTICLES
=========================== */
function initParticles() {
  var hero = document.getElementById("hero");
  if (!hero) return;

  var style = document.createElement("style");
  style.textContent = "@keyframes particleFloat { 0%,100% { transform: translateY(0); opacity: 0.1; } 50% { transform: translateY(-20px); opacity: 0.35; } }";
  document.head.appendChild(style);

  for (var i = 0; i < 25; i++) {
    var particle = document.createElement("div");
    var size = Math.random() * 4 + 2;
    var left = Math.random() * 100;
    var top = Math.random() * 100;
    var delay = Math.random() * 5;
    var dur = Math.random() * 10 + 10;
    var opacity = Math.random() * 0.3 + 0.05;

    particle.style.position = "absolute";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.borderRadius = "50%";
    particle.style.background = "var(--primary)";
    particle.style.left = left + "%";
    particle.style.top = top + "%";
    particle.style.opacity = opacity;
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "0";
    particle.style.animation = "particleFloat " + dur + "s ease-in-out " + delay + "s infinite";

    hero.appendChild(particle);
  }
}

/* ===========================
   CONSOLE MESSAGE
=========================== */
function initConsole() {
  console.log("Hi! I'm Faris Sara. Check out my GitHub: https://github.com/farissara");
}

/* ===========================
   INIT ALL ON DOM READY
=========================== */
document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initHamburger();
  initNavbarScroll();
  initActiveNav();
  initScrollReveal();
  initSmoothScroll();
  initAvatarFallback();
  initCountUp();
  initParticles();
  initConsole();
  setTimeout(typeEffect, 600);
});
window.addEventListener("scroll", function () {
  var scrollTop = window.scrollY;
  var docHeight = document.body.scrollHeight - window.innerHeight;
  var progress = (scrollTop / docHeight) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
});