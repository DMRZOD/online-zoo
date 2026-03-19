import { SAVED_CARDS_KEY } from "../../services/config";
import { getStoredUser } from "../../services/auth";
import { submitDonation } from "../../services/endpoint";
import type { SavedCard } from "../../types/api";
import {
  validateCardNumber,
  validateCvv,
  validateExpiry,
} from "../../utils/popup-validation";
import { getDonationState, setDonationState } from "./donation-state";
import { showDonationNotification } from "./donation-notification";
import { closeDonationPopup } from "./popup";
import { SUCCESS_TEXT, ERROR_TEXT } from "../../services/config";

const STEP_SELECTOR = ".popup-step[data-step='3']";
const INPUT_INVALID_CLASS = "popup-step__input_invalid";

function getStep(): HTMLElement | null {
  return document.querySelector(STEP_SELECTOR);
}

function getSavedCards(): SavedCard[] {
  try {
    const raw = localStorage.getItem(SAVED_CARDS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedCard[];
  } catch {
    return [];
  }
}

function saveCard(card: SavedCard): void {
  const list = getSavedCards();
  list.push(card);
  localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(list));
}

function maskCardNumber(num: string): string {
  const digits = num.replace(/\s/g, "");
  if (digits.length < 8) return digits;
  return `${digits.slice(0, 4)} **** **** ${digits.slice(-4)}`;
}

function getInputs(step: HTMLElement): {
  card: HTMLInputElement | null;
  cvv: HTMLInputElement | null;
  expiry: HTMLInputElement | null;
} {
  const row = step.querySelector(".popup-step__row");
  const expiryBlock = step.querySelector(".popup-step__expiry");
  const card = row?.querySelector<HTMLInputElement>(
    ".popup-step__field .popup-step__input",
  );
  const cvv = row?.querySelector<HTMLInputElement>(
    ".popup-step__field_cvv .popup-step__input",
  );
  const expiry = expiryBlock?.querySelector<HTMLInputElement>(
    ".popup-step__input_expiry",
  );
  return { card: card ?? null, cvv: cvv ?? null, expiry: expiry ?? null };
}

function getCompleteButton(): HTMLButtonElement | null {
  return (
    getStep()?.querySelector<HTMLButtonElement>(".popup-step__complete") ?? null
  );
}

function updateCompleteButton(step: HTMLElement): void {
  const { card, cvv, expiry } = getInputs(step);
  const cardValid = card ? !validateCardNumber(card.value) : false;
  const cvvValid = cvv ? !validateCvv(cvv.value) : false;
  const expiryValid = expiry ? !validateExpiry(expiry.value) : false;
  const enabled = cardValid && cvvValid && expiryValid;
  const btn = getCompleteButton();
  if (btn) {
    if (enabled) btn.removeAttribute("disabled");
    else btn.setAttribute("disabled", "disabled");
  }
}

function formatExpiryInput(value: string): string {
  const v = value.replace(/\D/g, "").slice(0, 4);
  if (v.length <= 2) return v;
  return `${v.slice(0, 2)}/${v.slice(2)}`;
}

export function initDonationStep3(): void {
  const step = getStep();
  if (!step) return;

  const savedWrap = step.querySelector<HTMLElement>(
    ".popup-step__saved-cards-wrap",
  );
  const saveCheckLabel = step.querySelector<HTMLElement>(
    ".popup-step__check_save-card",
  );
  const savedDropdown = step.querySelector<HTMLElement>(
    ".popup-step__dropdown_saved",
  );
  const savedList = savedDropdown?.querySelector<HTMLUListElement>(
    ".popup-step__dropdown-list",
  );
  const savedTrigger = savedDropdown?.querySelector<HTMLButtonElement>(
    ".popup-step__dropdown-button",
  );
  const savedText = savedTrigger?.querySelector<HTMLElement>(
    ".popup-step__dropdown-text",
  );

  const user = getStoredUser();
  const cards = getSavedCards();

  if (
    cards.length > 0 &&
    savedWrap &&
    savedList &&
    savedTrigger &&
    savedText &&
    savedDropdown
  ) {
    const savedDropdownEl = savedDropdown;
    savedWrap.style.display = "";
    savedList.innerHTML = cards
      .map(
        (c, i) =>
          `<li><button type="button" class="popup-step__dropdown-item" data-saved-index="${i}">${maskCardNumber(c.cardNumber)}</button></li>`,
      )
      .join("");
    const openClass = "popup-step__dropdown_opened";
    savedTrigger.addEventListener("click", () =>
      savedDropdownEl.classList.toggle(openClass),
    );
    savedList.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest("button[data-saved-index]");
      if (!btn) return;
      const idx = parseInt(btn.getAttribute("data-saved-index") ?? "0", 10);
      const c = cards[idx];
      if (c) {
        savedText.textContent = maskCardNumber(c.cardNumber);
        const { card, cvv, expiry } = getInputs(step);
        if (card) card.value = c.cardNumber.replace(/\s/g, "");
        if (cvv) cvv.value = c.cvv;
        if (expiry) expiry.value = c.expiryDate;
        setDonationState({
          cardNumber: c.cardNumber,
          cvv: c.cvv,
          expiry: c.expiryDate,
        });
      }
      savedDropdownEl.classList.remove(openClass);
      updateCompleteButton(step);
    });
    document.addEventListener("click", (e) => {
      if (!savedDropdownEl.contains(e.target as Node))
        savedDropdownEl.classList.remove(openClass);
    });
  }

  if (user && saveCheckLabel) {
    saveCheckLabel.style.display = "flex";
  }

  const { card, cvv, expiry } = getInputs(step);
  if (!card || !cvv || !expiry) return;

  card.setAttribute("maxlength", "16");
  card.addEventListener("input", () => {
    card.value = card.value.replace(/\D/g, "").slice(0, 16);
    setDonationState({ cardNumber: card.value });
    const err = validateCardNumber(card.value);
    if (err) {
      card.classList.add(INPUT_INVALID_CLASS);
      card.setAttribute("aria-invalid", "true");
    } else {
      card.classList.remove(INPUT_INVALID_CLASS);
      card.removeAttribute("aria-invalid");
    }
    updateCompleteButton(step);
  });
  card.addEventListener("blur", () => {
    const err = validateCardNumber(card.value);
    if (err && card.value) {
      card.classList.add(INPUT_INVALID_CLASS);
      card.setAttribute("aria-invalid", "true");
    } else {
      card.classList.remove(INPUT_INVALID_CLASS);
      card.removeAttribute("aria-invalid");
    }
    updateCompleteButton(step);
  });
  card.addEventListener("focus", () => {
    card.classList.remove(INPUT_INVALID_CLASS);
    card.removeAttribute("aria-invalid");
    updateCompleteButton(step);
  });

  cvv.setAttribute("maxlength", "3");
  cvv.addEventListener("input", () => {
    cvv.value = cvv.value.replace(/\D/g, "").slice(0, 3);
    setDonationState({ cvv: cvv.value });
    const err = validateCvv(cvv.value);
    if (err) {
      cvv.classList.add(INPUT_INVALID_CLASS);
      cvv.setAttribute("aria-invalid", "true");
    } else {
      cvv.classList.remove(INPUT_INVALID_CLASS);
      cvv.removeAttribute("aria-invalid");
    }
    updateCompleteButton(step);
  });
  cvv.addEventListener("blur", () => {
    const err = validateCvv(cvv.value);
    if (err && cvv.value) {
      cvv.classList.add(INPUT_INVALID_CLASS);
      cvv.setAttribute("aria-invalid", "true");
    } else {
      cvv.classList.remove(INPUT_INVALID_CLASS);
      cvv.removeAttribute("aria-invalid");
    }
    updateCompleteButton(step);
  });
  cvv.addEventListener("focus", () => {
    cvv.classList.remove(INPUT_INVALID_CLASS);
    cvv.removeAttribute("aria-invalid");
    updateCompleteButton(step);
  });

  expiry.addEventListener("input", () => {
    expiry.value = formatExpiryInput(expiry.value);
    setDonationState({ expiry: expiry.value });
    const err = validateExpiry(expiry.value);
    if (err && expiry.value.length >= 5) {
      expiry.classList.add(INPUT_INVALID_CLASS);
      expiry.setAttribute("aria-invalid", "true");
    } else {
      expiry.classList.remove(INPUT_INVALID_CLASS);
      expiry.removeAttribute("aria-invalid");
    }
    updateCompleteButton(step);
  });
  expiry.addEventListener("blur", () => {
    const err = validateExpiry(expiry.value);
    if (err && expiry.value) {
      expiry.classList.add(INPUT_INVALID_CLASS);
      expiry.setAttribute("aria-invalid", "true");
    } else {
      expiry.classList.remove(INPUT_INVALID_CLASS);
      expiry.removeAttribute("aria-invalid");
    }
    updateCompleteButton(step);
  });
  expiry.addEventListener("focus", () => {
    expiry.classList.remove(INPUT_INVALID_CLASS);
    expiry.removeAttribute("aria-invalid");
    updateCompleteButton(step);
  });

  getCompleteButton()?.setAttribute("disabled", "disabled");
  updateCompleteButton(step);

  const completeBtn = getCompleteButton();
  completeBtn?.addEventListener("click", async () => {
    if (completeBtn.disabled) return;
    const {
      card: cardInput,
      cvv: cvvInput,
      expiry: expiryInput,
    } = getInputs(step);
    const cardNum = cardInput?.value.replace(/\s/g, "") ?? "";
    const cvvVal = cvvInput?.value ?? "";
    const expiryVal = expiryInput?.value ?? "";
    setDonationState({ cardNumber: cardNum, cvv: cvvVal, expiry: expiryVal });
    const state = getDonationState();

    const saveCheck = saveCheckLabel?.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    if (user && saveCheck?.checked) {
      saveCard({
        cardNumber: cardNum,
        expiryDate: expiryVal,
        cvv: cvvVal,
      });
    }

    try {
      await submitDonation({
        name: state.name,
        email: state.email,
        amount: state.amount,
        petId: state.petId!,
      });
      const message = SUCCESS_TEXT.replace(
        "%amount%",
        String(state.amount),
      ).replace("%pet%", state.petName || "your chosen pet");
      closeDonationPopup();
      showDonationNotification(message, false);
    } catch {
      showDonationNotification(ERROR_TEXT, true);
    }
  });
}
