import type { Feedback, Pet } from "../types/api";
import { getFeedback, getPets } from "../services/endpoint";

const ERROR_TEXT: string = "Something went wrong. Please, refresh the page";
const LOADER_TEXT: string = "Loading...";

const createPetCard = (pet: Pet): string => {
  return `
    <a href="#" class="pets-card">
      <div class="pets-card__label">${pet.name}</div>
      <div class="pets-card__image">
        <img src="/images/cards/panda.jpg" alt="${pet.commonName}" />
      </div>
      <div class="pets-card__content">
        <div class="pets-card__top">
          <div class="pets-card__name">${pet.commonName}</div>
          <div class="pets-card__text">${pet.description}</div>
        </div>
        <button class="button-card pets-card__btn" type="button">
          <span>View Live Cam</span>
        </button>
      </div>
    </a>
  `;
};

const createFeedbackCard = (item: Feedback): string => {
  return `
    <div class="review-card">
      <div class="review-card__icon">
        <img src="/icons/quote.svg" alt="Quote Mark" />
      </div>
      <div class="review-card__content">
        <h4 class="review-card__title">${item.city}, ${item.month} ${item.year}</h4>
        <p class="review-card__text">${item.text}</p>
      </div>
      <span class="review-card__author">${item.name}</span>
    </div>
  `;
};

const renderPets = (track: HTMLElement, pets: Pet[]): void => {
  track.innerHTML = pets.map(createPetCard).join("");
};

const renderFeedback = (track: HTMLElement, feedback: Feedback[]): void => {
  track.innerHTML = feedback.map(createFeedbackCard).join("");
};

export const initLandingPage = (): void => {
  const petsTrack = document.querySelector<HTMLElement>(".pets__slider-track");
  const reviewTrack = document.querySelector<HTMLElement>(
    ".review__slider-track",
  );

  if (!petsTrack || !reviewTrack) {
    return;
  }

  petsTrack.textContent = LOADER_TEXT;
  reviewTrack.textContent = LOADER_TEXT;

  void loadLandingData(petsTrack, reviewTrack);
};

const loadLandingData = async (
  petsTrack: HTMLElement,
  reviewTrack: HTMLElement,
): Promise<void> => {
  try {
    const [petsResponse, feedbackResponse] = await Promise.all([
      getPets(),
      getFeedback(),
    ]);
    renderPets(petsTrack, petsResponse.data);
    renderFeedback(reviewTrack, feedbackResponse.data);
  } catch (error: unknown) {
    console.error("Landing data load error:", error);

    petsTrack.textContent = ERROR_TEXT;
    reviewTrack.textContent = ERROR_TEXT;
  }
};
