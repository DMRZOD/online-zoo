import { TOAST_MESSAGE, TOAST_DURATION_MS } from "../services/config";

const showToast = (message: string): void => {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast_visible"));

  const hide = (): void => {
    toast.classList.remove("toast_visible");
    setTimeout(() => toast.remove(), 300);
  };

  const timeoutId = window.setTimeout(hide, TOAST_DURATION_MS);

  toast.addEventListener("click", () => {
    window.clearTimeout(timeoutId);
    hide();
  });
};

export const initContactPage = (): void => {
  const form = document.querySelector<HTMLFormElement>(".form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    showToast(TOAST_MESSAGE);
  });
};
