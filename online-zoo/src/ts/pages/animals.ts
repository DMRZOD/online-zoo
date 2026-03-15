import { getCameras } from "../services/endpoint";
import { ERROR_TEXT } from "../services/config";
import { renderLoader } from "../components/status/loader";
import { renderErrorState } from "../components/status/error";
import { renderSidebar } from "../components/sidebar/sidebar";
import { initSidebarToggle } from "../components/sidebar/sidebar-toggle";
import { animalsPageHtml } from "../components/animals-content";
import { initSidebarSlider } from "../components/sidebar/sidebar-slider";
import { renderLive, initLiveSync } from "../components/live";
import { renderDonation } from "../components/donation";

export const initAnimalsPage = (): void => {
  const mainSection = document.querySelector<HTMLElement>(".main");

  if (!mainSection) return;

  document.body.classList.add("zoos-loading");
  renderLoader(mainSection);

  const loadData = async (): Promise<void> => {
    try {
      const camerasResponse = await getCameras();
      document.body.classList.remove("zoos-loading");

      const cameras = camerasResponse.data;
      const initialPetId = cameras[0]?.petId ?? "1";

      const sidebarHtml = renderSidebar(cameras);
      const liveHtml = renderLive(cameras, initialPetId);
      const donationHtml = renderDonation();

      const restHtml = animalsPageHtml();

      mainSection.innerHTML = sidebarHtml + liveHtml + donationHtml + restHtml;

      initSidebarSlider();
      initSidebarToggle();
      initLiveSync();
    } catch {
      renderErrorState(mainSection, ERROR_TEXT);
    }
  };

  void loadData();
};
