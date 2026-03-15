import petData from "../../../data/data.json";
import type { Camera } from "../../types/api";
import type { PetAssetMap } from "../../types/common";

const assets: PetAssetMap = petData as PetAssetMap;

const renderSidebarItem = (camera: Camera, index: number): string => {
  const petId = camera?.petId ?? index + 1;
  const asset = assets[String(petId)];
  const iconSrc = asset?.sidebarIcon;
  const text = camera?.text ?? "";
  return `
    <li class="sidebar__item" data-pet-id="${petId}" data-camera-id="${camera?.id ?? ""}" data-index="${index}">
      <span class="sidebar__item-icon">
        <img src="${iconSrc}" alt="" />
      </span>
      <span class="sidebar__item-text">${text}</span>
    </li>
  `;
};

export const renderSidebar = (cameras: Camera[]): string => {
  if (cameras.length === 0) {
    return `
    <aside class="sidebar sidebar_collapsed">
      <div class="sidebar__top">
        <span class="sidebar__live">
          Live
          <img src="/icons/live-cam.svg" alt="Live Camera" />
        </span>
        <button class="sidebar__toggle">
          <img src="/icons/double-arrow.svg" alt="Double Arrow" />
        </button>
      </div>
      <div class="sidebar__list-wrap">
        <ul class="sidebar__list"></ul>
      </div>
      <div class="sidebar__bottom">
        <button class="sidebar__down">
          <img src="/icons/arrow-bottom.svg" alt="Arrow Down" />
        </button>
      </div>
    </aside>
  `;
  }

  const listItemsFirst = cameras
    .map((camera, i) => renderSidebarItem(camera, i))
    .join("");
  const listItemsSecond = cameras
    .map((camera, i) => renderSidebarItem(camera, i))
    .join("");
  return `
    <aside class="sidebar sidebar_collapsed">
      <div class="sidebar__top">
        <span class="sidebar__live">
          Live
          <img src="/icons/live-cam.svg" alt="Live Camera" />
        </span>
        <button class="sidebar__toggle">
          <img src="/icons/double-arrow.svg" alt="Double Arrow" />
        </button>
      </div>
      <div class="sidebar__list-wrap">
        <ul class="sidebar__list">${listItemsFirst}${listItemsSecond}</ul>
      </div>
      <div class="sidebar__bottom">
        <button class="sidebar__down">
          <img src="/icons/arrow-bottom.svg" alt="Arrow Down" />
        </button>
      </div>
    </aside>
  `;
};
