import {
  validateLogin,
  validatePassword,
  validateName,
  validateEmail,
  validateConfirmPassword,
} from "../services/validation";

import { register } from "../services/endpoint";

const getFieldValidators = (): {
  id: string;
  errorId: string;
  validate: (form: HTMLFormElement) => string | null;
}[] => [
  {
    id: "reg-login",
    errorId: "reg-login-error",
    validate: (f) =>
      validateLogin(
        (f.elements.namedItem("login") as HTMLInputElement)?.value?.trim() ??
          "",
      ),
  },
  {
    id: "reg-password",
    errorId: "reg-password-error",
    validate: (f) =>
      validatePassword(
        (f.elements.namedItem("password") as HTMLInputElement)?.value ?? "",
      ),
  },
  {
    id: "reg-confirm",
    errorId: "reg-confirm-error",
    validate: (f) =>
      validateConfirmPassword(
        (f.elements.namedItem("password") as HTMLInputElement)?.value ?? "",
        (f.elements.namedItem("confirmPassword") as HTMLInputElement)?.value ??
          "",
      ),
  },
  {
    id: "reg-name",
    errorId: "reg-name-error",
    validate: (f) =>
      validateName(
        (f.elements.namedItem("name") as HTMLInputElement)?.value?.trim() ?? "",
      ),
  },
  {
    id: "reg-email",
    errorId: "reg-email-error",
    validate: (f) =>
      validateEmail(
        (f.elements.namedItem("email") as HTMLInputElement)?.value?.trim() ??
          "",
      ),
  },
];

function getEl<T extends Element>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function showFieldError(
  input: HTMLInputElement,
  errorEl: HTMLElement,
  message: string,
): void {
  input.classList.add("auth__input_invalid");
  input.setAttribute("aria-invalid", "true");
  errorEl.textContent = message;
  errorEl.style.display = "block";
}

function clearFieldError(input: HTMLInputElement, errorEl: HTMLElement): void {
  input.classList.remove("auth__input_invalid");
  input.removeAttribute("aria-invalid");
  errorEl.textContent = "";
  errorEl.style.display = "none";
}

function setFormError(message: string): void {
  const el = getEl<HTMLElement>("register-form-error");
  if (el) {
    el.textContent = message;
    el.style.display = "block";
  }
}

function clearFormError(): void {
  const el = getEl<HTMLElement>("register-form-error");
  if (el) {
    el.textContent = "";
    el.style.display = "none";
  }
}

function allValid(form: HTMLFormElement): boolean {
  return getFieldValidators().every(({ validate }) => validate(form) === null);
}

export function initRegisterPage(): void {
  const form = getEl<HTMLFormElement>("register-form");
  if (!form) return;

  const updateSubmitButton = (): void => {
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) btn.disabled = !allValid(form);
  };

  getFieldValidators().forEach(({ id, errorId, validate }) => {
    const input = getEl<HTMLInputElement>(id);
    const errorEl = getEl<HTMLElement>(errorId);
    if (!input || !errorEl) return;

    input.addEventListener("blur", () => {
      const msg = validate(form);
      if (msg) showFieldError(input, errorEl, msg);
      else clearFieldError(input, errorEl);
      updateSubmitButton();
    });

    input.addEventListener("focus", () => {
      clearFieldError(input, errorEl);
      updateSubmitButton();
    });
  });

  form.addEventListener("input", updateSubmitButton);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearFormError();

    let anyInvalid = false;
    getFieldValidators().forEach(({ id, errorId, validate }) => {
      const input = getEl<HTMLInputElement>(id);
      const errorEl = getEl<HTMLElement>(errorId);
      if (!input || !errorEl) return;
      const msg = validate(form);
      if (msg) {
        showFieldError(input, errorEl, msg);
        anyInvalid = true;
      } else clearFieldError(input, errorEl);
    });
    if (anyInvalid) return;

    try {
      await register({
        login: (
          form.elements.namedItem("login") as HTMLInputElement
        ).value.trim(),
        password: (form.elements.namedItem("password") as HTMLInputElement)
          .value,
        name: (
          form.elements.namedItem("name") as HTMLInputElement
        ).value.trim(),
        email: (
          form.elements.namedItem("email") as HTMLInputElement
        ).value.trim(),
      });
      window.location.href = "/pages/sign-in.html";
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message;
      setFormError(msg || "Registration failed. Please try again.");
    }
  });
}
