import "normalize.css";
import "../scss/main.scss";

export const initPetsSlider = () => {
  const cardSlider = document.querySelector(".pets__slider");
  const cardList = document.querySelector(".pets__list");
  const card = document.querySelector(".pets__item");
  const prevBtn = document.getElementById("pets-prev-btn");
  const nextBtn = document.getElementById("pets-next-btn");

  if (!cardSlider || !cardList || !prevBtn || !nextBtn) return;

  const cardWidth = card.offsetWidth;
  const cardGap = parseFloat(window.getComputedStyle(cardList).gap);
  const move = cardWidth + cardGap;

  const prev = () => {
    cardSlider.scrollBy({
      left: -move,
      behavior: "smooth",
    });
  };

  const next = () => {
    cardSlider.scrollBy({
      left: move,
      behavior: "smooth",
    });
  };

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
};

export const initReviewSlider = () => {
  const cardSlider = document.querySelector(".review__slider");
  const cardList = document.querySelector(".review__list");
  const card = document.querySelector(".review__item");
  const prevBtn = document.getElementById("review-prev-btn");
  const nextBtn = document.getElementById("review-next-btn");

  if (!cardSlider || !cardList || !prevBtn || !nextBtn) return;

  const cardWidth = card.offsetWidth;
  const cardGap = parseFloat(window.getComputedStyle(cardList).gap);
  const move = cardWidth + cardGap;

  const prev = () => {
    cardSlider.scrollBy({
      left: -move,
      behavior: "smooth",
    });
  };

  const next = () => {
    cardSlider.scrollBy({
      left: move,
      behavior: "smooth",
    });
  };

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
};
