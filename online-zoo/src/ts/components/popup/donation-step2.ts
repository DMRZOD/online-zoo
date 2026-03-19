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

type Step2Inputs = {
  name: HTMLInputElement | null;
  email: HTMLInputElement | null;
  nameError: HTMLParagraphElement | null;
  emailError: HTMLParagraphElement | null;
};

function getInputs(step: HTMLElement): Step2Inputs {
  const inputs = step.querySelectorAll<HTMLInputElement>(".popup-step__input");
  const errors = step.querySelectorAll<HTMLParagraphElement>(
    ".popup-step__error",
  );
  return {
    name: inputs[0] ?? null,
    email: inputs[1] ?? null,
    nameError: errors[0] ?? null,
    emailError: errors[1] ?? null,
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

  const {
    name: nameInput,
    email: emailInput,
    nameError,
    emailError,
  } = getInputs(step);
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
      if (nameError) nameError.textContent = msg;
    } else {
      nameInput.classList.remove(INPUT_INVALID_CLASS);
      nameInput.removeAttribute("aria-invalid");
      if (nameError) nameError.textContent = "";
    }
    setDonationState({ name: nameInput.value.trim() });
    updateNextButton(step);
  };

  const validateEmail = (): void => {
    const msg = validateBillingEmail(emailInput.value);
    if (msg) {
      emailInput.classList.add(INPUT_INVALID_CLASS);
      emailInput.setAttribute("aria-invalid", "true");
      if (emailError) emailError.textContent = msg;
    } else {
      emailInput.classList.remove(INPUT_INVALID_CLASS);
      emailInput.removeAttribute("aria-invalid");
      if (emailError) emailError.textContent = "";
    }
    setDonationState({ email: emailInput.value.trim() });
    updateNextButton(step);
  };

  nameInput.addEventListener("blur", validateName);
  nameInput.addEventListener("focus", () => {
    nameInput.classList.remove(INPUT_INVALID_CLASS);
    nameInput.removeAttribute("aria-invalid");
    if (nameError) nameError.textContent = "";
    updateNextButton(step);
  });
  nameInput.addEventListener("input", () => {
    setDonationState({ name: nameInput.value });
    if (nameError) nameError.textContent = "";
    updateNextButton(step);
  });

  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("focus", () => {
    emailInput.classList.remove(INPUT_INVALID_CLASS);
    emailInput.removeAttribute("aria-invalid");
    if (emailError) emailError.textContent = "";
    updateNextButton(step);
  });
  emailInput.addEventListener("input", () => {
    setDonationState({ email: emailInput.value });
    if (emailError) emailError.textContent = "";
    updateNextButton(step);
  });

  getNextButton()?.setAttribute("disabled", "disabled");
  updateNextButton(step);
}

export function syncDonationStep2FromState(): void {
  const step = getStep();
  if (!step) return;
  const state = getDonationState();
  const { name, email, nameError, emailError } = getInputs(step);
  if (name) name.value = state.name;
  if (email) email.value = state.email;
  if (nameError) nameError.textContent = "";
  if (emailError) emailError.textContent = "";
  updateNextButton(step);
}

export function prefillStep2FromUser(): void {
  const step = getStep();
  if (!step) return;
  const user = getStoredUser();
  const { name, email, nameError, emailError } = getInputs(step);
  if (user) {
    if (name) name.value = user.name;
    if (email) email.value = user.email;
    setDonationState({ name: user.name, email: user.email });
  }
  if (nameError) nameError.textContent = "";
  if (emailError) emailError.textContent = "";
  getNextButton()?.setAttribute("disabled", "disabled");
  updateNextButton(step);
}

export function syncStep2ToState(): void {
  const step = getStep();
  if (!step) return;
  const { name, email, nameError, emailError } = getInputs(step);
  if (name) setDonationState({ name: name.value.trim() });
  if (email) setDonationState({ email: email.value.trim() });
  if (nameError) nameError.textContent = "";
  if (emailError) emailError.textContent = "";
}
