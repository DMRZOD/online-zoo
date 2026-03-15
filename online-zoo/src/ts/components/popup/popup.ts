import { resetDonationState } from "./donation-state";
import { initDonationStep1 } from "./donation-step1";
import {
  initDonationStep2,
  prefillStep2FromUser,
  syncStep2ToState,
} from "./donation-step2";
import { initDonationStep3 } from "./donation-step3";
import { goToStep, initDonationPopupSteps } from "./popup-steps";

export const openDonationPopup = (): void => {
  const popup = document.querySelector<HTMLElement>(".popup");
  if (!popup) return;

  resetDonationState();
  prefillStep2FromUser();
  popup
    .querySelector(".popup-step__pet-button")
    ?.classList.remove("popup-step__pet-button_active");
  const placeholderPet = popup.querySelector<HTMLElement>(
    ".popup-step[data-step='1'] .popup-step__dropdown-text",
  );
  if (placeholderPet) placeholderPet.textContent = "Choose your favourite";
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

  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement).closest("a, button");
    if (!el) return;
    const text = (el.textContent ?? "").trim();
    const isDonateTrigger =
      /donate/i.test(text) ||
      el.classList.contains("donation__btn") ||
      el.classList.contains("button-donation");
    if (!isDonateTrigger) return;
    e.preventDefault();
    if (popup) {
      openDonationPopup();
    } else {
      window.location.href = "/?openDonation=1";
    }
  });

  if (!popup) return;

  popup.classList.add("popup_hidden");

  initDonationPopupSteps(closeDonationPopup, (from, to) => {
    if (from === 2 && to === 3) syncStep2ToState();
  });
  initDonationStep1();
  initDonationStep2();
  initDonationStep3();

  if (new URLSearchParams(window.location.search).get("openDonation") === "1") {
    openDonationPopup();
    const url = new URL(window.location.href);
    url.searchParams.delete("openDonation");
    window.history.replaceState({}, "", url.pathname + url.search || "?");
  }

  popup.querySelector(".popup__overlay")?.addEventListener("click", () => {
    closeDonationPopup();
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      popup &&
      !popup.classList.contains("popup_hidden")
    ) {
      closeDonationPopup();
    }
  });
};
