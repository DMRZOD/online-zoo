import petData from "../../data/data.json";
import type { PetDetail } from "../types/api";
import type { PetAssetMap } from "../types/common";
import { getPetById } from "../services/endpoint";
import { ERROR_TEXT, EVENT_PET_SELECTED } from "../services/config";

const assets: PetAssetMap = petData as PetAssetMap;

const getZooImage = (petId: number): string => assets[String(petId)]?.zooImage;

const getInfoHtml = (pet: PetDetail | null): string => {
  if (pet === null) return "";

  const zooImage = getZooImage(pet.id);

  return `
    <div class="info__container">
      <div class="info__header">
        <h3 class="info__title">Did you know?</h3>
        <p class="info__subtitle">${pet.description}</p>
      </div>

      <div class="info__content">
        <ul class="info__list">
          <li class="info__item"><span>Common name:</span>${pet.commonName}</li>
          <li class="info__item"><span>Scientific name:</span>${pet.scientificName}</li>
          <li class="info__item"><span>Type:</span>${pet.type}</li>
          <li class="info__item"><span>Size:</span>${pet.size}</li>
          <li class="info__item"><span>Diet:</span>${pet.diet}</li>
          <li class="info__item"><span>Habitat:</span>${pet.habitat}</li>
          <li class="info__item"><span>Range:</span>${pet.range}</li>
        </ul>

        <div class="info__image">
          <img src="${zooImage}" alt="${pet.commonName}" />
        </div>
      </div>

      <p class="info__descr">${pet.detailedDescription}</p>
    </div>
  `;
};

const renderInfoError = (): string => {
  return `
    <div class="info__container info__container_error">
      <p class="info__error-text">${ERROR_TEXT}</p>
    </div>
  `;
};

const renderInfoLoading = (): string => {
  return `
    <div class="info__loading">
      <div class="loader">
        <div class="loader__spinner"></div>
      </div>
    </div>
  `;
};

export const renderInfo = (pet: PetDetail | null): string => {
  return `<section class="info">${getInfoHtml(pet)}</section>`;
};

const showInfoLoader = (section: HTMLElement): void => {
  if (section.querySelector(".info__loading")) return;
  section.insertAdjacentHTML("beforeend", renderInfoLoading());
};

const hideInfoLoader = (section: HTMLElement): void => {
  section.querySelector(".info__loading")?.remove();
};

export const loadPetInfo = (petId: number): void => {
  const section = document.querySelector<HTMLElement>(".info");
  if (!section) return;

  showInfoLoader(section);

  getPetById(petId)
    .then((res) => {
      hideInfoLoader(section);
      section.innerHTML = getInfoHtml(res.data);
    })
    .catch(() => {
      hideInfoLoader(section);
      section.innerHTML = renderInfoError();
    });
};

export const initInfoSync = (): void => {
  document.addEventListener(EVENT_PET_SELECTED, ((
    e: CustomEvent<{ petId: string }>,
  ) => {
    const raw = e.detail?.petId;
    if (raw == null || raw === "") return;
    const id = Number(raw);
    if (!Number.isInteger(id) || id < 1) return;
    loadPetInfo(id);
  }) as EventListener);
};
