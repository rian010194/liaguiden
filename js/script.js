document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");

  // ================= Desktop Dropdown =================
  const desktopDropdownLinks = document.querySelectorAll(".main-nav .has-dropdown");
  let activeDropdown = null;

  function showDropdown(dropdown) {
    if (activeDropdown && activeDropdown !== dropdown) {
      hideDropdown(activeDropdown);
    }
    dropdown.classList.add("active");
    dropdown.style.maxHeight = dropdown.scrollHeight + "px";
    dropdown.style.opacity = 1;
    dropdown.style.pointerEvents = "auto";
    activeDropdown = dropdown;
  }

  function hideDropdown(dropdown) {
    dropdown.style.maxHeight = 0;
    dropdown.style.opacity = 0;
    dropdown.style.pointerEvents = "none";
    dropdown.classList.remove("active");
    if (activeDropdown === dropdown) activeDropdown = null;
  }

  // Aktivera hover och klick bara på desktop
  function enableDesktopDropdowns() {
    desktopDropdownLinks.forEach(li => {
      const dropdown = li.querySelector(".mega-dropdown");

      // Klick togglar dropdown
      li.addEventListener("click", li._desktopClickHandler = (e) => {
        if (window.innerWidth > 950) {
          e.preventDefault();
          if (activeDropdown === dropdown) {
            hideDropdown(dropdown);
          } else {
            showDropdown(dropdown);
          }
        }
      });

      // Hover visar dropdown
      li.addEventListener("mouseenter", li._desktopEnterHandler = () => {
        if (window.innerWidth > 950) {
          showDropdown(dropdown);
        }
      });
    });

    // Klick utanför stänger dropdown
    document.addEventListener("click", document._desktopDocHandler = (e) => {
      if (window.innerWidth > 950 && !e.target.closest(".site-header") && activeDropdown) {
        hideDropdown(activeDropdown);
      }
    });

    // Lämnar header → stäng
    header.addEventListener("mouseleave", header._desktopLeaveHandler = () => {
      if (window.innerWidth > 950 && activeDropdown) {
        hideDropdown(activeDropdown);
      }
    });
  }

  // Ta bort desktop-logik i mobil
  function disableDesktopDropdowns() {
    desktopDropdownLinks.forEach(li => {
      if (li._desktopClickHandler) {
        li.removeEventListener("click", li._desktopClickHandler);
        li._desktopClickHandler = null;
      }
      if (li._desktopEnterHandler) {
        li.removeEventListener("mouseenter", li._desktopEnterHandler);
        li._desktopEnterHandler = null;
      }
    });
    if (document._desktopDocHandler) {
      document.removeEventListener("click", document._desktopDocHandler);
      document._desktopDocHandler = null;
    }
    if (header._desktopLeaveHandler) {
      header.removeEventListener("mouseleave", header._desktopLeaveHandler);
      header._desktopLeaveHandler = null;
    }
  }

  // ================= Mobile Menu =================
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileDropdownLinks = mobileMenu.querySelectorAll(".has-dropdown > a");

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // Mobil-dropdown toggle
  mobileDropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 950) {
        e.preventDefault();
        const parentLi = link.parentElement;
        const dropdown = parentLi.querySelector(".mega-dropdown");
        dropdown.classList.toggle("active");
        parentLi.classList.toggle("active");
      }
    });
  });

  // ================= Resize Hantering =================
  function handleResize() {
    if (window.innerWidth > 950) {
      enableDesktopDropdowns();
      mobileMenu.classList.remove("active"); // stäng mobilmenyn
      // Stäng mobil-dropdowns
      mobileMenu.querySelectorAll(".mega-dropdown").forEach(dd => dd.classList.remove("active"));
      mobileMenu.querySelectorAll(".has-dropdown").forEach(li => li.classList.remove("active"));
    } else {
      disableDesktopDropdowns();
    }
  }

  // Init
  handleResize();
  window.addEventListener("resize", handleResize);
});

const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroHeight = hero ? hero.offsetHeight : 0;

  if (scrollY >= heroHeight) {
    // Header försvinner helt
    header.classList.add('behind');
    header.classList.remove('scrolled');
  } else if (scrollY > 0) {
    // Header delvis gömd
    header.classList.add('scrolled');
    header.classList.remove('behind');
  } else {
    // Scrollat till toppen → header syns fullt
    header.classList.remove('scrolled', 'behind');
  }
});



