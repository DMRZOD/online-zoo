import "normalize.css";
import "../scss/main.scss";

import { initPetsSlider } from "./slider";
import { initReviewSlider } from "./slider";

document.addEventListener("DOMContentLoaded", () => {
  initPetsSlider();
  initReviewSlider();
});
