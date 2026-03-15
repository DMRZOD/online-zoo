import { validateLogin, validatePassword } from "../utils/validation";
import { login, getProfile } from "../services/endpoint";
import { setSession } from "../services/auth";
import { FORM_ERROR_TEXT } from "../services/config";

const FORM_ID = "signin-form";
const LOGIN_ID = "signin-login";
const PASSWORD_ID = "signin-password";
const LOGIN_ERROR_ID = "signin-login-error";
const PASSWORD_ERROR_ID = "signin-password-error";
const FORM_ERROR_ID = "signin-form-error";
const ERROR_CLASS = "auth__input_invalid";

function getEl<T extends Element>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function showFieldError(
  input: HTMLInputElement,
  errorEl: HTMLElement,
  message: string,
): void {
  input.classList.add(ERROR_CLASS);
  input.setAttribute("aria-invalid", "true");
  errorEl.textContent = message;
  errorEl.style.display = "block";
}

function clearFieldError(input: HTMLInputElement, errorEl: HTMLElement): void {
  input.classList.remove(ERROR_CLASS);
  input.removeAttribute("aria-invalid");
  errorEl.textContent = "";
  errorEl.style.display = "none";
}

function setFormError(message: string): void {
  const el = getEl<HTMLElement>(FORM_ERROR_ID);
  if (el) {
    el.textContent = message;
    el.style.display = "block";
  }
}

function clearFormError(): void {
  const el = getEl<HTMLElement>(FORM_ERROR_ID);
  if (el) {
    el.textContent = "";
    el.style.display = "none";
  }
}

function updateSubmitButton(loginValid: boolean, passwordValid: boolean): void {
  const form = getEl<HTMLFormElement>(FORM_ID);
  const btn = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (btn) btn.disabled = !(loginValid && passwordValid);
}

export function initSignInPage(): void {
  const form = getEl<HTMLFormElement>(FORM_ID);
  const loginInput = getEl<HTMLInputElement>(LOGIN_ID);
  const passwordInput = getEl<HTMLInputElement>(PASSWORD_ID);
  const loginError = getEl<HTMLElement>(LOGIN_ERROR_ID);
  const passwordError = getEl<HTMLElement>(PASSWORD_ERROR_ID);

  if (!form || !loginInput || !passwordInput || !loginError || !passwordError)
    return;

  let loginValid = false;
  let passwordValid = false;

  const validateLoginField = (): void => {
    const msg = validateLogin(loginInput.value);
    loginValid = !msg;
    if (msg) showFieldError(loginInput, loginError, msg);
    else clearFieldError(loginInput, loginError);
    updateSubmitButton(loginValid, passwordValid);
  };

  const validatePasswordField = (): void => {
    const msg = validatePassword(passwordInput.value);
    passwordValid = !msg;
    if (msg) showFieldError(passwordInput, passwordError, msg);
    else clearFieldError(passwordInput, passwordError);
    updateSubmitButton(loginValid, passwordValid);
  };

  loginInput.addEventListener("blur", validateLoginField);
  loginInput.addEventListener("focus", () => {
    clearFieldError(loginInput, loginError);
  });

  passwordInput.addEventListener("blur", validatePasswordField);
  passwordInput.addEventListener("focus", () => {
    clearFieldError(passwordInput, passwordError);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearFormError();

    validateLoginField();
    validatePasswordField();
    if (!loginValid || !passwordValid) return;

    try {
      const res = await login({
        login: loginInput.value.trim(),
        password: passwordInput.value,
      });
      const { user, token } = res.data;
      const profile = user ?? (await getProfile(token)).data;
      setSession(profile, token);
      window.location.href = "/";
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      if (status === 401) setFormError(FORM_ERROR_TEXT);
      else setFormError("Something went wrong. Please try again.");
    }
  });
}
