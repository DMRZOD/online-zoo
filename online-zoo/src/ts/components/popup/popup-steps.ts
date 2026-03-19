let totalSteps = 3;
let currentStep = 1;
let onBackFromFirstStep: (() => void) | null = null;

const getSteps = (): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>(".popup-step[data-step]"));

export const goToStep = (step: number): void => {
  const steps = getSteps();

  if (step < 1 || step > totalSteps || steps.length === 0) return;

  currentStep = step;

  steps.forEach((el, i) => {
    const stepNum = i + 1;
    el.classList.toggle("popup-step_visible", stepNum === step);
  });

  const activeStepEl = steps[step - 1];
  const items = activeStepEl
    ? Array.from(
        activeStepEl.querySelectorAll<HTMLElement>(".popup-step__pag-item"),
      )
    : [];
  items.forEach((el, i) => {
    el.classList.toggle("popup-step__pag-item_active", i < step);
  });
};

let onBeforeStepChange: ((fromStep: number, toStep: number) => void) | null =
  null;

const handleNext = (e: Event): void => {
  const target = (e.target as HTMLElement).closest(".popup-step__next");
  if (!target) return;

  e.preventDefault();
  if ((target as HTMLButtonElement).disabled) return;
  if (currentStep < totalSteps) {
    onBeforeStepChange?.(currentStep, currentStep + 1);
    goToStep(currentStep + 1);
  }
};

const handleBack = (e: Event): void => {
  const target = (e.target as HTMLElement).closest(".popup-step__back");
  if (!target) return;

  e.preventDefault();

  if (currentStep === 1) {
    onBackFromFirstStep?.();
    return;
  }

  goToStep(currentStep - 1);
};

export const initDonationPopupSteps = (
  backFromFirstStep?: () => void,
  beforeStepChange?: (fromStep: number, toStep: number) => void,
): void => {
  onBackFromFirstStep = backFromFirstStep ?? null;
  onBeforeStepChange = beforeStepChange ?? null;

  const popup = document.querySelector(".popup");
  if (!popup) return;

  goToStep(1);

  popup.addEventListener("click", handleNext);
  popup.addEventListener("click", handleBack);
};
