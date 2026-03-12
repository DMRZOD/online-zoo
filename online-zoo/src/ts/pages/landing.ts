import { getFeedback, getPets } from "../services/endpoint";
import { renderFeedback, renderPets } from "../components/cards";
import { renderLoader } from "../components/loader";
import { renderErrorState } from "../components/error";
import { ERROR_TEXT } from "../services/config";

export const initLandingPage = (): void => {
  const petsTrack = document.querySelector<HTMLElement>(".pets__slider-track");
  const reviewTrack = document.querySelector<HTMLElement>(
    ".review__slider-track",
  );

  if (!petsTrack || !reviewTrack) {
    return;
  }

  // Render loader
  renderLoader(petsTrack);
  renderLoader(reviewTrack);

  const loadData = async (): Promise<void> => {
    try {
      // Fetch data
      const [petsResponse, feedbackResponse] = await Promise.all([
        getPets(),
        getFeedback(),
      ]);

      // Render data
      renderPets(petsTrack, petsResponse.data);
      renderFeedback(reviewTrack, feedbackResponse.data);
    } catch {
      // Render error
      renderErrorState(petsTrack, ERROR_TEXT);
      renderErrorState(reviewTrack, ERROR_TEXT);
    }
  };

  void loadData();
};
