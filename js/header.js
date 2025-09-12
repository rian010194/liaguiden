// header.js (Desktop + Mobile)
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const desktopDropdowns = document.querySelectorAll(".main-nav .has-dropdown");
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileDropdownLinks = mobileMenu.querySelectorAll(".has-dropdown > a");

  let activeDropdown = null;
  let hideTimeout = null;

  // ===== DESKTOP =====

  // Visa dropdown
  function showDropdown(dropdown) {
    clearTimeout(hideTimeout);

    // Om rätt dropdown redan är öppen, gör inget
    if (activeDropdown === dropdown && dropdown.classList.contains("active")) return;

    // Stäng tidigare dropdown
    if (activeDropdown && activeDropdown !== dropdown) {
      hideDropdown(activeDropdown, true);
    }

    gsap.fromTo(
      dropdown,
      { height: 0, opacity: 0, pointerEvents: "none" },
      {
        height: dropdown.scrollHeight,
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power1.out",
        onComplete: () => {
          dropdown.style.height = "auto";
        }
      }
    );

    dropdown.classList.add("active");
    activeDropdown = dropdown;
  }

  // Dölj dropdown
  function hideDropdown(dropdown, immediate = false) {
    const doHide = () => {
      gsap.to(dropdown, {
        height: 0,
        opacity: 0,
        pointerEvents: "none",
        duration: immediate ? 0 : 0.3,
        ease: "power1.in"
      });
      dropdown.classList.remove("active");
      if (activeDropdown === dropdown) activeDropdown = null;
    };

    if (immediate) {
      doHide();
    } else {
      hideTimeout = setTimeout(() => {
        if (!dropdown.matches(":hover") && !(dropdown.parentElement.matches(":hover"))) {
          doHide();
        }
      }, 250);
    }
  }

  // Event listeners för desktop-menyn
  desktopDropdowns.forEach(li => {
    const dropdown = li.querySelector(".mega-dropdown");

    // Hover öppnar
    li.addEventListener("mouseenter", () => {
      if (window.innerWidth > 950) showDropdown(dropdown);
    });

    // Lämna li
    li.addEventListener("mouseleave", () => {
      if (window.innerWidth > 950) hideDropdown(dropdown);
    });

    // Klick togglar
    li.addEventListener("click", e => {
      if (window.innerWidth > 950) {
        e.preventDefault();
        activeDropdown === dropdown ? hideDropdown(dropdown, true) : showDropdown(dropdown);
      }
    });

    // Håll öppen när musen är i dropdown
    dropdown.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    dropdown.addEventListener("mouseleave", () => hideDropdown(dropdown));
  });

  // Stäng allt när musen lämnar hela headern
  header.addEventListener("mouseleave", () => {
    if (activeDropdown && window.innerWidth > 950) hideDropdown(activeDropdown);
  });

  // ===== MOBILE =====

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    const isActive = mobileMenu.classList.toggle("active");

    gsap.to(mobileMenu, {
      x: isActive ? 0 : "100%",
      duration: 0.4,
      ease: "power2.out"
    });
  });

  // Mobil-dropdown toggle
  mobileDropdownLinks.forEach(link => {
    link.addEventListener("click", e => {
      if (window.innerWidth <= 950) {
        e.preventDefault();
        const parentLi = link.parentElement;
        const dropdown = parentLi.querySelector(".mega-dropdown");
        const isActive = parentLi.classList.toggle("active");

        if (isActive) {
          gsap.fromTo(
            dropdown,
            { height: 0, opacity: 0 },
            {
              height: dropdown.scrollHeight,
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
              onComplete: () => {
                dropdown.style.height = "auto";
              }
            }
          );
        } else {
          gsap.to(dropdown, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power1.in"
          });
        }
      }
    });
  });

  // ===== RESET VID RESIZE =====
  function handleResize() {
    if (window.innerWidth > 950) {
      // Stäng mobilmeny
      mobileMenu.classList.remove("active");
      gsap.set(mobileMenu, { x: "100%" });

      // Återställ mobil-dropdowns
      mobileMenu.querySelectorAll(".mega-dropdown").forEach(dd => {
        gsap.set(dd, { height: 0, opacity: 0 });
        dd.classList.remove("active");
      });
      mobileMenu.querySelectorAll(".has-dropdown").forEach(li =>
        li.classList.remove("active")
      );
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize();
});
