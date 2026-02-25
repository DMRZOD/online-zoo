import "normalize.css";
import "../scss/main.scss";

export const initPetsSlider = () => {
  const cardWrapper = document.querySelector(".pets__wrapper");
  const cardList = document.querySelector(".pets__list");
  const card = document.querySelector(".pets__item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!cardWrapper || !cardList || !prevBtn || !nextBtn) return;

  const cardWidth = card.offsetWidth;
  const cardGap = parseFloat(window.getComputedStyle(cardList).gap);
  const move = cardWidth + cardGap;

  const prev = () => {
    cardWrapper.scrollBy({
      left: -move,
      behavior: "smooth",
    });
  };

  const next = () => {
    cardWrapper.scrollBy({
      left: move,
      behavior: "smooth",
    });
  };

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
};
