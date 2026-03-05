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

export const initLiveViewsSlider = () => {
  const carousels = document.querySelectorAll(".live__carousel");
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const camsList = carousel.querySelector(".live__cams");
    const navButtons = carousel.querySelectorAll(".live__nav");

    if (!camsList || navButtons.length < 2) return;

    const [prevButton, nextButton] = navButtons;

    prevButton.addEventListener("click", (event) => {
      event.preventDefault();
      const items = camsList.querySelectorAll(".live__cams-item");
      const lastItem = items[items.length - 1];
      if (!lastItem) return;
      camsList.prepend(lastItem);
    });

    nextButton.addEventListener("click", (event) => {
      event.preventDefault();
      const firstItem = camsList.querySelector(".live__cams-item");
      if (!firstItem) return;
      camsList.append(firstItem);
    });
  });
};
