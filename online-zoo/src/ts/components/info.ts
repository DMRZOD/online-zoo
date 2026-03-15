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
          <li class="info__item-btn">
            <button type="button" class="button-card info__btn info__btn-map" data-lat="${pet.latitude}" data-lng="${pet.longitude}">
              <span>View Map</span>
              <svg
                width="28"
                height="25"
                viewBox="0 0 28 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.878 0.135121C14.6728 0.224325 14.4865 0.355065 14.3296 0.519851C14.1723 0.684221 14.0476 0.879485 13.9624 1.09446C13.8773 1.30944 13.8335 1.5399 13.8335 1.77265C13.8335 2.00539 13.8773 2.23586 13.9624 2.45083C14.0476 2.66581 14.1723 2.86107 14.3296 3.02544L21.1185 10.1365H1.80205C1.32411 10.1365 0.865757 10.3738 0.527808 10.7963C0.189858 11.2187 0 11.7917 0 12.3891C0 12.9865 0.189858 13.5594 0.527808 13.9819C0.865757 14.4043 1.32411 14.6416 1.80205 14.6416H21.1193L14.3296 21.7536C14.0125 22.0859 13.8344 22.5366 13.8344 23.0064C13.8344 23.4763 14.0125 23.927 14.3296 24.2592C14.6467 24.5915 15.0767 24.7782 15.5252 24.7782C15.9736 24.7782 16.4037 24.5915 16.7208 24.2592L26.8527 13.6423C27.01 13.478 27.1348 13.2827 27.2199 13.0677C27.305 12.8528 27.3489 12.6223 27.3489 12.3895C27.3489 12.1568 27.305 11.9263 27.2199 11.7114C27.1348 11.4964 27.01 11.3011 26.8527 11.1367L16.7208 0.519851C16.5639 0.355065 16.3775 0.224325 16.1724 0.135121C15.9672 0.0459159 15.7473 0 15.5252 0C15.3031 0 15.0831 0.0459159 14.878 0.135121Z"
                  fill="#F58021"
                />
              </svg>
            </button>
          </li>
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
