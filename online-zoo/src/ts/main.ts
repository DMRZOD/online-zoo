import "normalize.css";
import "../scss/main.scss";

import { initMobileMenu } from "./menu";

const initApp = (): void => {
  initMobileMenu();
};

document.addEventListener("DOMContentLoaded", initApp);
