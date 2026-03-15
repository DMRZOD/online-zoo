import { goToStep, initDonationPopupSteps } from "./popup-steps";

export const openDonationPopup = (): void => {
  const popup = document.querySelector<HTMLElement>(".popup");
  if (!popup) return;

  popup.classList.remove("popup_hidden");
  document.body.style.overflow = "hidden";
  goToStep(1);
};

export const closeDonationPopup = (): void => {
  const popup = document.querySelector<HTMLElement>(".popup");
  if (!popup) return;

  popup.classList.add("popup_hidden");
  document.body.style.overflow = "";
};

export const initPopup = (): void => {
  const popup = document.querySelector<HTMLElement>(".popup");
  const trigger = document.querySelector<HTMLElement>(".footer__btn");

  if (!popup) return;

  popup.classList.add("popup_hidden");

  initDonationPopupSteps(closeDonationPopup);

  trigger?.addEventListener("click", (e) => {
    e.preventDefault();
    openDonationPopup();
  });

  popup.querySelector(".popup__overlay")?.addEventListener("click", () => {
    closeDonationPopup();
  });
};
