import { getCameras } from "../services/endpoint";
import { ERROR_TEXT } from "../services/config";

import { renderLoader } from "../components/status/loader";
import { renderErrorState } from "../components/status/error";

import { renderSidebar } from "../components/sidebar/sidebar";
import { initSidebarToggle } from "../components/sidebar/sidebar-toggle";
import { initSidebarSlider } from "../components/sidebar/sidebar-slider";

import { renderLive, initLiveSync } from "../components/live";
import { renderDonation } from "../components/donation";
import { renderInfo, loadPetInfo, initInfoSync } from "../components/info";
import { initMapModal } from "../components/map";

export const initAnimalsPage = (): void => {
  const mainSection = document.querySelector<HTMLElement>(".main");
  if (!mainSection) return;

  // Render loader
  document.body.classList.add("zoos-loading");
  renderLoader(mainSection);

  const loadData = async (): Promise<void> => {
    try {
      // Fetch data
      const camerasResponse = await getCameras();
      const cameras = camerasResponse.data;

      // Remove loader
      document.body.classList.remove("zoos-loading");

      // Render data
      const initialPetId = cameras[0]?.petId ?? 1;
      const sidebarHtml = renderSidebar(cameras);
      const liveHtml = renderLive(cameras, initialPetId);
      const donationHtml = renderDonation();
      const infoHtml = renderInfo(null);
      mainSection.innerHTML = sidebarHtml + liveHtml + donationHtml + infoHtml;

      // Init components
      initSidebarSlider();
      initSidebarToggle();
      initLiveSync();
      initInfoSync();
      initMapModal();
      loadPetInfo(initialPetId);
    } catch {
      // Render error
      renderErrorState(mainSection, ERROR_TEXT);
    }
  };

  void loadData();
};
