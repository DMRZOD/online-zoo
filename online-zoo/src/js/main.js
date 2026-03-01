import "normalize.css";
import "../scss/main.scss";

import { initPetsSlider } from "./slider";
import { initReviewSlider } from "./slider";
import { initMobileMenu } from "./menu";
import { initSidebar } from "./sidebar";
import { initDonationPopup } from "./popup";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initPetsSlider();
  initReviewSlider();
  initSidebar();
  initDonationPopup();
});
