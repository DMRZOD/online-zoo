import "normalize.css";
import "../scss/main.scss";

// Pages
import { initLandingPage } from "./pages/landing";
import { initAnimalsPage } from "./pages/animals";
import { initMapPage } from "./pages/map";
import { initContactPage } from "./pages/contact";
import { initSignInPage } from "./pages/sign-in";
import { initRegisterPage } from "./pages/register";

// Components
import { initMobileMenu } from "./components/menu";

const initPage = (): void => {
  const path: string = window.location.pathname;

  if (path === "/" || path === "/index.html") {
    initLandingPage();
  }

  if (path.includes("animals")) {
    initAnimalsPage();
  }

  if (path.includes("map")) {
    initMapPage();
  }

  if (path.includes("contact")) {
    initContactPage();
  }

  if (path.includes("sign-in")) {
    initSignInPage();
  }

  if (path.includes("register")) {
    initRegisterPage();
  }
};

const initApp = (): void => {
  // Page
  initPage();

  // Components
  initMobileMenu();
};

document.addEventListener("DOMContentLoaded", initApp);
