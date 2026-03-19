import { TOAST_DURATION_MS } from "../../services/config";

export function showDonationNotification(
  message: string,
  isError: boolean = false,
): void {
  const existing = document.querySelector(".popup-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "popup-toast" + (isError ? " popup-toast_error" : "");
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("popup-toast_visible"));

  const hide = (): void => {
    toast.classList.remove("popup-toast_visible");
    setTimeout(() => toast.remove(), 300);
  };

  const timeoutId = window.setTimeout(hide, TOAST_DURATION_MS);

  toast.addEventListener("click", () => {
    window.clearTimeout(timeoutId);
    hide();
  });
}
