import { getCameras } from "../services/endpoint";
import { ERROR_TEXT } from "../services/config";
import { renderLoader } from "../components/status/loader";
import { renderErrorState } from "../components/status/error";
import { renderSidebar } from "../components/sidebar/sidebar";
import { initSidebarToggle } from "../components/sidebar/sidebar-toggle";
import { animalsPageHtml } from "../components/animals-content";
import { initSidebarSlider } from "../components/sidebar/sidebar-slider";

export const initAnimalsPage = (): void => {
  const mainSection = document.querySelector<HTMLElement>(".main");

  if (!mainSection) return;

  document.body.classList.add("zoos-loading");
  renderLoader(mainSection);

  const loadData = async (): Promise<void> => {
    try {
      const camerasResponse = await getCameras();
      console.log(camerasResponse.data);

      const sidebarHtml = renderSidebar(camerasResponse.data);
      const restHtml = animalsPageHtml();
      mainSection.innerHTML = sidebarHtml + restHtml;
      document.body.classList.remove("zoos-loading");

      initSidebarSlider();
      initSidebarToggle();
    } catch {
      renderErrorState(mainSection, ERROR_TEXT);
    }
  };

  void loadData();
};
