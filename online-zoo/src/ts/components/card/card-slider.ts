import type { SliderOptions, SliderMetrics } from "../../types/common";
import {
  TRANSITION_DURATION_MS,
  WHEEL_STEP_THRESHOLD,
} from "../../services/config";

const navButtonsSelector = ".slider__nav .slider__nav-btn";

// Enable/Disable Nav Buttons
const setButtonsState = (
  buttons: HTMLButtonElement[],
  enabled: boolean,
): void => {
  buttons.forEach((button) => {
    button.disabled = !enabled;
  });
};

// Calculates step width
const getSliderMetrics = (
  track: HTMLElement,
  cardSelector: string,
): SliderMetrics => {
  const items = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
  if (items.length < 2) {
    return { groupSize: items.length, stepWidth: 0 };
  }

  const firstLeft = items[0]?.offsetLeft ?? 0;
  const leftValues = items.map((item) => item.offsetLeft);
  const uniqueLefts = Array.from(new Set(leftValues)).sort((a, b) => a - b);
  const secondLeft = uniqueLefts[1];
  const stepWidth =
    secondLeft !== undefined ? Math.max(0, secondLeft - firstLeft) : 0;
  const groupSize = leftValues.filter((left) => left === firstLeft).length || 1;

  return { groupSize, stepWidth };
};

// Moves first element to end
const moveFirstGroupToEnd = (
  track: HTMLElement,
  cardSelector: string,
  groupSize: number,
): void => {
  const items = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
  if (items.length === 0 || groupSize <= 0) return;
  items.slice(0, groupSize).forEach((item) => track.append(item));
};

// Moves last element to start
const moveLastGroupToStart = (
  track: HTMLElement,
  cardSelector: string,
  groupSize: number,
): void => {
  const items = Array.from(track.querySelectorAll<HTMLElement>(cardSelector));
  if (items.length === 0 || groupSize <= 0) return;
  const lastGroup = items.slice(-groupSize);
  lastGroup.reverse().forEach((item) => track.prepend(item));
};

// Reset transform to neutral position
const resetTransformInstant = (track: HTMLElement): void => {
  track.style.transition = "none";
  track.style.transform = "translateX(0)";
  void track.offsetHeight;
  track.style.transition = `transform ${TRANSITION_DURATION_MS}ms ease`;
};

// Performs animated transform
const animateTo = (
  track: HTMLElement,
  transformValue: string,
  onDone: () => void,
  onStart: () => void,
): void => {
  onStart();
  track.style.transition = `transform ${TRANSITION_DURATION_MS}ms ease`;
  track.style.transform = transformValue;
  track.addEventListener("transitionend", onDone, { once: true });
};

export const initInfiniteSlider = ({
  section,
  track,
  card,
}: SliderOptions): void => {
  const navButtons = Array.from(
    section.querySelectorAll<HTMLButtonElement>(navButtonsSelector),
  );
  if (navButtons.length < 2) return;

  const [prevButton, nextButton] = navButtons;
  let metrics = getSliderMetrics(track, card);
  let isAnimating = false;
  let wheelDeltaAccumulator = 0;

  const refreshMetrics = (): void => {
    metrics = getSliderMetrics(track, card);
    const itemCount = track.querySelectorAll(card).length;
    const enabled = metrics.stepWidth > 0 && itemCount > metrics.groupSize;
    setButtonsState(navButtons, enabled);
  };

  const canSlide = (): boolean => {
    const itemCount = track.querySelectorAll(card).length;
    return metrics.stepWidth > 0 && itemCount > metrics.groupSize;
  };

  const moveNext = (): void => {
    if (!canSlide() || isAnimating) return;

    animateTo(
      track,
      `translateX(-${metrics.stepWidth}px)`,
      () => {
        isAnimating = false;
        moveFirstGroupToEnd(track, card, metrics.groupSize);
        resetTransformInstant(track);
      },
      () => {
        isAnimating = true;
      },
    );
  };

  const movePrev = (): void => {
    if (!canSlide() || isAnimating) return;

    moveLastGroupToStart(track, card, metrics.groupSize);
    track.style.transition = "none";
    track.style.transform = `translateX(-${metrics.stepWidth}px)`;
    void track.offsetHeight;

    animateTo(
      track,
      "translateX(0)",
      () => {
        isAnimating = false;
      },
      () => {
        isAnimating = true;
      },
    );
  };

  refreshMetrics();
  resetTransformInstant(track);

  prevButton.addEventListener("click", movePrev);
  nextButton.addEventListener("click", moveNext);

  section.addEventListener(
    "wheel",
    (event: WheelEvent) => {
      if (!canSlide() || isAnimating) return;

      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);

      if (absX === 0 || absX <= absY) return;

      event.preventDefault();
      wheelDeltaAccumulator += event.deltaX;

      while (
        Math.abs(wheelDeltaAccumulator) >= WHEEL_STEP_THRESHOLD &&
        !isAnimating
      ) {
        if (wheelDeltaAccumulator > 0) {
          moveNext();
          wheelDeltaAccumulator -= WHEEL_STEP_THRESHOLD;
        } else {
          movePrev();
          wheelDeltaAccumulator += WHEEL_STEP_THRESHOLD;
        }
      }
    },
    { passive: false },
  );

  window.addEventListener("resize", () => {
    if (isAnimating) return;
    resetTransformInstant(track);
    refreshMetrics();
    wheelDeltaAccumulator = 0;
  });
};
