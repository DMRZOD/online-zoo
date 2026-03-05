export function initMobileMenu() {
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");
  const overlay = document.querySelector(".header__overlay");

  if (!burger || !nav || !overlay) return;

  const closeMenu = () => {
    burger.classList.remove("header__burger_active");
    nav.classList.remove("header__nav_open");
    overlay.classList.remove("header__overlay_visible");
    document.body.classList.remove("no-scroll");
  };

  const openMenu = () => {
    burger.classList.add("header__burger_active");
    nav.classList.add("header__nav_open");
    overlay.classList.add("header__overlay_visible");
    document.body.classList.add("no-scroll");
  };

  burger.addEventListener("click", () => {
    const isMenuOpen = burger.classList.contains("header__burger_active");
    if (isMenuOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  overlay.addEventListener("click", closeMenu);
}
