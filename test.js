function initHeader() {
  const header = document.querySelector(".site-header");
  const desktopDropdowns = document.querySelectorAll(".main-nav .has-dropdown");
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileDropdownLinks = mobileMenu.querySelectorAll(".has-dropdown > a");
  let activeDesktopDropdown = null;

  // ===== Desktop Dropdown =====
  function showDropdown(dropdown) {
    if (activeDesktopDropdown && activeDesktopDropdown !== dropdown) hideDropdown(activeDesktopDropdown);
    gsap.to(dropdown, { height: "auto", opacity: 1, pointerEvents: "auto", duration: 0.3, ease: "power1.out" });
    dropdown.classList.add("active");
    activeDesktopDropdown = dropdown;
  }

  function hideDropdown(dropdown) {
    gsap.to(dropdown, { height: 0, opacity: 0, pointerEvents: "none", duration: 0.3, ease: "power1.in" });
    dropdown.classList.remove("active");
    if (activeDesktopDropdown === dropdown) activeDesktopDropdown = null;
  }

  function enableDesktopDropdowns() {
    desktopDropdowns.forEach(li => {
      const dropdown = li.querySelector(".mega-dropdown");
      li.addEventListener("mouseenter", li._hover = () => showDropdown(dropdown));
      li.addEventListener("mouseleave", li._leave = () => hideDropdown(dropdown));
    });
  }

  function disableDesktopDropdowns() {
    desktopDropdowns.forEach(li => {
      if (li._hover) li.removeEventListener("mouseenter", li._hover);
      if (li._leave) li.removeEventListener("mouseleave", li._leave);
    });
  }

  // ===== Mobile Hamburger =====
  hamburger.addEventListener("click", () => {
    const isActive = mobileMenu.classList.toggle("active");
    gsap.to(mobileMenu, { x: isActive ? 0 : "100%", duration: 0.4, ease: "power2.out" });
  });

  mobileDropdownLinks.forEach(link => {
    link.addEventListener("click", e => {
      if (window.innerWidth <= 950) {
        e.preventDefault();
        const parentLi = link.parentElement;
        const dropdown = parentLi.querySelector(".mega-dropdown");
        const isActive = dropdown.classList.toggle("active");
        parentLi.classList.toggle("active");
        gsap.to(dropdown, { height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0, duration: 0.3 });
      }
    });
  });

  // ===== Handle Resize =====
  function handleResize() {
    if (window.innerWidth > 950) {
      enableDesktopDropdowns();
      if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        gsap.set(mobileMenu, { x: "100%" });
        mobileMenu.querySelectorAll(".mega-dropdown").forEach(dd => gsap.set(dd, { height: 0, opacity: 0 }));
      }
    } else {
      disableDesktopDropdowns();
    }
  }
  handleResize();
  window.addEventListener("resize", handleResize);
}

// Init när GSAP är laddad
if (typeof gsap !== "undefined") {
  initHeader();
} else {
  const gsapCheck = setInterval(() => {
    if (typeof gsap !== "undefined") { clearInterval(gsapCheck); initHeader(); }
  }, 50);
}
