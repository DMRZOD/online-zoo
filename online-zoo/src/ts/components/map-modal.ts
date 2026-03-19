import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIcon2xUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

import { DEFAULT_ZOOM } from "../services/config";

const defaultIcon = L.icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

let mapInstance: L.Map | null = null;
let escapeHandler: ((e: KeyboardEvent) => void) | null = null;

const getModal = (): HTMLElement | null => {
  return document.querySelector<HTMLElement>(".map-modal");
};

const createModalMarkup = (): string => {
  return `
    <div class="map-modal map-modal_hidden">
      <div class="map-modal__backdrop"></div>
      <div class="map-modal__body">
        <button type="button" class="map-modal__close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="map-modal__map"></div>
      </div>
    </div>
  `;
};

const destroyMap = (): void => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
};

const removeEscapeHandler = (): void => {
  if (escapeHandler) {
    document.removeEventListener("keydown", escapeHandler);
    escapeHandler = null;
  }
};

export const closeMapModal = (): void => {
  const modal = getModal();
  if (!modal) return;

  destroyMap();
  removeEscapeHandler();
  modal.classList.add("map-modal_hidden");
  document.body.style.overflow = "";
};

const openMapModal = (lat: number, lng: number): void => {
  const modal = getModal();
  const container = modal?.querySelector<HTMLElement>(".map-modal__map");
  if (!modal || !container) return;

  destroyMap();
  modal.classList.remove("map-modal_hidden");
  document.body.style.overflow = "hidden";

  mapInstance = L.map(container).setView([lat, lng], DEFAULT_ZOOM);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapInstance);
  L.marker([lat, lng]).addTo(mapInstance);

  escapeHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeMapModal();
  };
  document.addEventListener("keydown", escapeHandler);
};

const handleCloseClick = (e: Event): void => {
  const target = e.target as HTMLElement;
  if (target.closest(".map-modal__close")) {
    closeMapModal();
    return;
  }
  if (target.closest(".map-modal__backdrop")) {
    closeMapModal();
  }
};

const handleViewMapClick = (e: Event): void => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(
    ".info__btn-map",
  );
  if (!btn) return;

  const latStr = btn.getAttribute("data-lat");
  const lngStr = btn.getAttribute("data-lng");
  if (latStr == null || lngStr == null) return;

  const lat = Number.parseFloat(latStr);
  const lng = Number.parseFloat(lngStr);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return;

  e.preventDefault();
  openMapModal(lat, lng);
};

export const initMapModal = (): void => {
  if (getModal()) return;

  document.body.insertAdjacentHTML("beforeend", createModalMarkup());
  const modal = getModal();
  if (!modal) return;

  modal.addEventListener("click", handleCloseClick);
  document.addEventListener("click", handleViewMapClick);
};
