import { getStoredUser } from "../../services/auth";
import {
  validateBillingName,
  validateBillingEmail,
} from "../../utils/popup-validation";
import { getDonationState, setDonationState } from "./donation-state";

const STEP_SELECTOR = ".popup-step[data-step='2']";
const INPUT_INVALID_CLASS = "popup-step__input_invalid";

function getStep(): HTMLElement | null {
  return document.querySelector(STEP_SELECTOR);
}

function getNextButton(): HTMLButtonElement | null {
  return (
    getStep()?.querySelector<HTMLButtonElement>(".popup-step__next") ?? null
  );
}

function getInputs(step: HTMLElement): {
  name: HTMLInputElement | null;
  email: HTMLInputElement | null;
} {
  const inputs = step.querySelectorAll<HTMLInputElement>(".popup-step__input");
  return {
    name: inputs[0] ?? null,
    email: inputs[1] ?? null,
  };
}

function updateNextButton(step: HTMLElement): void {
  const { name, email } = getInputs(step);
  const nameValid = name ? !validateBillingName(name.value) : false;
  const emailValid = email ? !validateBillingEmail(email.value) : false;
  const enabled = nameValid && emailValid;
  const btn = getNextButton();
  if (btn) {
    if (enabled) btn.removeAttribute("disabled");
    else btn.setAttribute("disabled", "disabled");
  }
}

export function initDonationStep2(): void {
  const step = getStep();
  if (!step) return;

  const { name: nameInput, email: emailInput } = getInputs(step);
  if (!nameInput || !emailInput) return;

  const user = getStoredUser();
  if (user) {
    nameInput.value = user.name;
    emailInput.value = user.email;
    setDonationState({ name: user.name, email: user.email });
  }

  const validateName = (): void => {
    const msg = validateBillingName(nameInput.value);
    if (msg) {
      nameInput.classList.add(INPUT_INVALID_CLASS);
      nameInput.setAttribute("aria-invalid", "true");
    } else {
      nameInput.classList.remove(INPUT_INVALID_CLASS);
      nameInput.removeAttribute("aria-invalid");
    }
    setDonationState({ name: nameInput.value.trim() });
    updateNextButton(step);
  };

  const validateEmail = (): void => {
    const msg = validateBillingEmail(emailInput.value);
    if (msg) {
      emailInput.classList.add(INPUT_INVALID_CLASS);
      emailInput.setAttribute("aria-invalid", "true");
    } else {
      emailInput.classList.remove(INPUT_INVALID_CLASS);
      emailInput.removeAttribute("aria-invalid");
    }
    setDonationState({ email: emailInput.value.trim() });
    updateNextButton(step);
  };

  nameInput.addEventListener("blur", validateName);
  nameInput.addEventListener("focus", () => {
    nameInput.classList.remove(INPUT_INVALID_CLASS);
    nameInput.removeAttribute("aria-invalid");
    updateNextButton(step);
  });
  nameInput.addEventListener("input", () => {
    setDonationState({ name: nameInput.value });
    updateNextButton(step);
  });

  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("focus", () => {
    emailInput.classList.remove(INPUT_INVALID_CLASS);
    emailInput.removeAttribute("aria-invalid");
    updateNextButton(step);
  });
  emailInput.addEventListener("input", () => {
    setDonationState({ email: emailInput.value });
    updateNextButton(step);
  });

  getNextButton()?.setAttribute("disabled", "disabled");
  updateNextButton(step);
}

export function syncDonationStep2FromState(): void {
  const step = getStep();
  if (!step) return;
  const state = getDonationState();
  const { name, email } = getInputs(step);
  if (name) name.value = state.name;
  if (email) email.value = state.email;
  updateNextButton(step);
}

export function prefillStep2FromUser(): void {
  const step = getStep();
  if (!step) return;
  const user = getStoredUser();
  const { name, email } = getInputs(step);
  if (user) {
    if (name) name.value = user.name;
    if (email) email.value = user.email;
    setDonationState({ name: user.name, email: user.email });
  }
  getNextButton()?.setAttribute("disabled", "disabled");
  updateNextButton(step);
}

export function syncStep2ToState(): void {
  const step = getStep();
  if (!step) return;
  const { name, email } = getInputs(step);
  if (name) setDonationState({ name: name.value.trim() });
  if (email) setDonationState({ email: email.value.trim() });
}
