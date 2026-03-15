import petData from "../../../data/data.json";
import type { Feedback, Pet } from "../../types/api";
import type { PetAssetMap } from "../../types/common";

const assets: PetAssetMap = petData as PetAssetMap;

const createPetCard = (pet: Pet): string => {
  const zoosUrl = `/pages/animals.html?pet=${pet.id}`;
  return `
    <a href="${zoosUrl}" class="pets-card">
      <div class="pets-card__label">${pet.name}</div>
      <div class="pets-card__image">
        <img src="${assets[String(pet.id)].cardImage}" alt="${pet.commonName}" />
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

export const renderPets = (track: HTMLElement, pets: Pet[]): void => {
  track.innerHTML = pets.map(createPetCard).join("");
};

export const renderFeedback = (
  track: HTMLElement,
  feedback: Feedback[],
): void => {
  track.innerHTML = feedback.map(createFeedbackCard).join("");
};
