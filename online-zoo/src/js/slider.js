import "normalize.css";
import "../scss/main.scss";

export const initPetsSlider = () => {
  const cardList = document.querySelector("pets__list");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!cardList || !prevBtn || !nextBtn) return;

  const prev = () => {
    console.log(prevBtn);
  };

  const next = () => {
    console.log(nextBtn);
  };

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
};
