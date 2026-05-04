const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

function closeMenu() {
  navMenu?.classList.remove("show-menu");
  const icon = navToggle?.querySelector("i");
  icon?.classList.add("uil-apps");
  icon?.classList.remove("uil-times");
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("show-menu");
    const icon = navToggle.querySelector("i");
    icon?.classList.toggle("uil-apps", !isOpen);
    icon?.classList.toggle("uil-times", isOpen);
  });
}

if (navClose && navMenu) {
  navClose.addEventListener("click", closeMenu);
}

document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!navMenu || !navToggle || !navMenu.classList.contains("show-menu")) return;

  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedToggle = navToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeMenu();
  }
});

const skillsContent = document.getElementsByClassName("skills__content");
const skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  const itemClass = this.parentNode.className;

  for (let i = 0; i < skillsContent.length; i += 1) {
    skillsContent[i].className = "skills__content skills__close";
  }

  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => el.addEventListener("click", toggleSkills));

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("[data-target]");
  const tabContents = document.querySelectorAll("[data-content]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.target);
      if (!target) return;

      tabContents.forEach((content) => {
        content.classList.remove("qualification__active");
      });

      target.classList.add("qualification__active");

      tabs.forEach((item) => item.classList.remove("qualification__active"));
      tab.classList.add("qualification__active");
    });
  });
});

new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  keyboard: true,
});

new Swiper(".testimonial__container", {
  loop: true,
  spaceBetween: 32,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    568: {
      slidesPerView: 2,
    },
  },
});

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;
  const headerOffset = 120;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - headerOffset;
    const sectionId = current.getAttribute("id");
    const navLink = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);

    if (!navLink) return;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLink.classList.add("active-link");
    } else {
      navLink.classList.remove("active-link");
    }
  });
}

function scrollHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  if (window.scrollY >= 80) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

function scrollUp() {
  const scrollUpButton = document.getElementById("scroll-up");
  if (!scrollUpButton) return;

  if (window.scrollY >= 350) {
    scrollUpButton.classList.add("show-scroll");
  } else {
    scrollUpButton.classList.remove("show-scroll");
  }
}

window.addEventListener("scroll", scrollActive);
window.addEventListener("scroll", scrollHeader);
window.addEventListener("scroll", scrollUp);

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton?.classList.contains(iconTheme) ? "uil-sun" : "uil-moon";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
}

if (selectedIcon && themeButton) {
  themeButton.classList[selectedIcon === "uil-sun" ? "add" : "remove"](iconTheme);
}

themeButton?.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const hash = this.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });
  });
});
