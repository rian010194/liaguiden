// header-mobile.js
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileDropdownLinks = mobileMenu.querySelectorAll(".has-dropdown > a");

  // Öppna/stäng sidomeny
  hamburger.addEventListener("click", () => {
    const isActive = mobileMenu.classList.toggle("active");
    gsap.to(mobileMenu, {
      x: isActive ? 0 : "100%",
      duration: 0.4,
      ease: "power2.out"
    });
  });

  // Expandera/collapsa mobil-dropdowns
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
              onComplete: () => dropdown.style.height = "auto"
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

  // Reset på resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 950) {
      mobileMenu.classList.remove("active");
      gsap.set(mobileMenu, { x: "100%" });
      mobileMenu.querySelectorAll(".mega-dropdown").forEach(dd => {
        gsap.set(dd, { height: 0, opacity: 0 });
        dd.classList.remove("active");
      });
      mobileMenu.querySelectorAll(".has-dropdown").forEach(li => li.classList.remove("active"));
    }
  });
});
