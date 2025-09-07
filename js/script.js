document.addEventListener("DOMContentLoaded", () => {
  const dropdownLinks = document.querySelectorAll(".has-dropdown");
  const header = document.querySelector(".site-header");
  let activeDropdown = null;

  // ================= Funktioner för dropdown =================
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

  // ================= Desktop hover =================
  function setupHover() {
    dropdownLinks.forEach(li => {
      const dropdown = li.querySelector(".mega-dropdown");

      // Ta bort tidigare event listeners för att undvika dubblering
      li.onmouseenter = null;
      li.onmouseleave = null;

      if (window.innerWidth > 950) {
        // Hover visar dropdown
        li.addEventListener("mouseenter", () => showDropdown(dropdown));
        // Hover lämnar header = stäng dropdown
        header.addEventListener("mouseleave", () => {
          if (activeDropdown) hideDropdown(activeDropdown);
        });
      }
    });
  }

  setupHover();

  // ================= Klick på desktop =================
  dropdownLinks.forEach(li => {
    const link = li.querySelector("a");
    const dropdown = li.querySelector(".mega-dropdown");

    link.addEventListener("click", e => {
      if (window.innerWidth > 950) {
        e.preventDefault(); // Hindra länk-navigering
        if (activeDropdown === dropdown) {
          hideDropdown(dropdown);
        } else {
          showDropdown(dropdown);
        }
      }
    });
  });

  // Klick utanför header stänger dropdown (desktop)
  document.addEventListener("click", e => {
    if (!e.target.closest(".site-header") && activeDropdown && window.innerWidth > 950) {
      hideDropdown(activeDropdown);
    }
  });

// ================= Hamburger / mobil =================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileDropdownLinks = mobileMenu.querySelectorAll('.has-dropdown > a');

// Klick på hamburger togglar mobilmeny
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Dropdownar på mobil
mobileDropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 950) {
      e.preventDefault();
      // Hitta rätt dropdown-box
      const parentLi = link.parentElement;
      const dropdown = parentLi.querySelector('.mega-dropdown');
      dropdown.classList.toggle('active');
      parentLi.classList.toggle('active');
    }
  });
});

  // ================= Resize =================
  window.addEventListener('resize', () => {
    // Om skärmen blir större än 950px -> stäng mobilmeny
    if (window.innerWidth > 950) {
      mobileMenu.classList.remove('active');

      const mobileDropdowns = mobileMenu.querySelectorAll('.mega-dropdown');
      mobileDropdowns.forEach(dd => dd.classList.remove('active'));

      const mobileDropdownParents = mobileMenu.querySelectorAll('.has-dropdown');
      mobileDropdownParents.forEach(li => li.classList.remove('active'));

      // Återställ hover för desktop
      setupHover();
    }
  });
});
