import { getPets } from "../../services/endpoint";
import type { Pet } from "../../types/api";
import { validateOtherAmount } from "../../utils/popup-validation";
import { getDonationState, setDonationState } from "./donation-state";

const STEP_SELECTOR = ".popup-step[data-step='1']";

let onNextStateChange: ((enabled: boolean) => void) | null = null;

function getStep(): HTMLElement | null {
  return document.querySelector(STEP_SELECTOR);
}

function getNextButton(): HTMLButtonElement | null {
  return (
    getStep()?.querySelector<HTMLButtonElement>(".popup-step__next") ?? null
  );
}

function updateNextButton(): void {
  const state = getDonationState();
  const enabled = state.amount > 0 && state.petId !== null;
  const btn = getNextButton();
  if (btn) {
    if (enabled) btn.removeAttribute("disabled");
    else btn.setAttribute("disabled", "disabled");
  }
  onNextStateChange?.(enabled);
}

function parseAmountFromButton(btn: HTMLButtonElement): number {
  const text = btn.textContent?.trim() ?? "";
  const match = text.match(/\$(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function initAmountButtons(step: HTMLElement): void {
  const amounts = step.querySelectorAll<HTMLButtonElement>(
    ".popup-step__amount",
  );
  const otherButton = step.querySelector<HTMLButtonElement>(
    ".popup-step__other-button",
  );
  const otherInput = step.querySelector<HTMLInputElement>(
    ".popup-step__other-input",
  );

  if (!otherInput) return;

  const otherInputEl = otherInput;
  otherInputEl.type = "text";
  otherInputEl.inputMode = "numeric";
  otherInputEl.autocomplete = "off";
  otherInputEl.placeholder = "0";

  function selectPresetAmount(btn: HTMLButtonElement): void {
    amounts.forEach((b) => b.classList.remove("popup-step__amount_active"));
    btn.classList.add("popup-step__amount_active");
    otherInputEl.value = "";
    otherButton?.classList.remove("popup-step__other-button_active");
    const amount = parseAmountFromButton(btn);
    setDonationState({ amount });
    updateNextButton();
  }

  amounts.forEach((btn) => {
    btn.addEventListener("click", () => selectPresetAmount(btn));
  });

  otherButton?.addEventListener("click", () => {
    amounts.forEach((b) => b.classList.remove("popup-step__amount_active"));
    otherButton.classList.add("popup-step__other-button_active");
    otherInputEl.focus();
    const raw = otherInputEl.value.trim();
    const parsed = /^\d+$/.test(raw) ? parseInt(raw, 10) : 0;
    setDonationState({ amount: parsed > 0 ? parsed : 0 });
    updateNextButton();
  });

  otherInputEl.addEventListener("input", () => {
    const v = otherInputEl.value.replace(/\D/g, "").replace(/^0+/, "") || "";
    otherInputEl.value = v;
    if (/[eE.-]/.test(otherInputEl.value))
      otherInputEl.value = otherInputEl.value.replace(/[eE.-]/g, "");
    const num = v ? parseInt(v, 10) : 0;
    setDonationState({ amount: num > 0 ? num : 0 });
    updateNextButton();
  });

  otherInputEl.addEventListener("blur", () => {
    const err = validateOtherAmount(otherInputEl.value);
    if (err && otherInputEl.value.trim()) {
      otherInputEl.setAttribute("aria-invalid", "true");
      otherInputEl.classList.add("popup-step__input_invalid");
    } else {
      otherInputEl.removeAttribute("aria-invalid");
      otherInputEl.classList.remove("popup-step__input_invalid");
    }
  });
}

function initPetDropdown(step: HTMLElement): void {
  const dropdown = step.querySelector<HTMLElement>(".popup-step__dropdown");
  const trigger = dropdown?.querySelector<HTMLButtonElement>(
    ".popup-step__dropdown-button",
  );
  const textEl = dropdown?.querySelector<HTMLElement>(
    ".popup-step__dropdown-text",
  );
  const listEl = dropdown?.querySelector<HTMLUListElement>(
    ".popup-step__dropdown-list",
  );

  if (!dropdown || !trigger || !textEl || !listEl) return;

  const dropdownEl = dropdown;
  const openClass = "popup-step__dropdown_opened";

  function close(): void {
    dropdownEl.classList.remove(openClass);
  }

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    dropdownEl.classList.toggle(openClass);
  });

  const petButton = step.querySelector<HTMLButtonElement>(
    ".popup-step__pet-button",
  );
  const petButtonActiveClass = "popup-step__pet-button_active";

  listEl.addEventListener("click", (e) => {
    const item = (e.target as HTMLElement).closest("button[data-pet-id]");
    if (!item) return;
    const id = parseInt(item.getAttribute("data-pet-id") ?? "0", 10);
    const name = item.getAttribute("data-pet-name") ?? "";
    textEl.textContent = name;
    setDonationState({ petId: id, petName: name });
    petButton?.classList.add(petButtonActiveClass);
    close();
    updateNextButton();
  });

  document.addEventListener("click", (e) => {
    if (!dropdownEl.contains(e.target as Node)) close();
  });

  getPets()
    .then((res) => {
      const pets = res.data ?? [];
      listEl.innerHTML = pets
        .map(
          (p: Pet) =>
            `<li><button type="button" class="popup-step__dropdown-item" data-pet-id="${p.id}" data-pet-name="${escapeHtml(p.commonName || p.name)}">${escapeHtml(p.commonName || p.name)}</button></li>`,
        )
        .join("");
    })
    .catch(() => {
      listEl.innerHTML = "<li><span>Failed to load pets</span></li>";
    });
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

export function initDonationStep1(
  onNextEnabled?: (enabled: boolean) => void,
): void {
  onNextStateChange = onNextEnabled ?? null;

  const step = getStep();
  if (!step) return;

  step
    .querySelector(".popup-step__pet-button")
    ?.classList.remove("popup-step__pet-button_active");
  initAmountButtons(step);
  initPetDropdown(step);

  getNextButton()?.setAttribute("disabled", "disabled");
  updateNextButton();
}
