export function initDonationPopup() {
  const introPopup = document.querySelector(".donation-popup");
  if (!introPopup) return;

  const stepPopup = document.querySelector(".donation-steps-popup");
  const introTriggerButtons = document.querySelectorAll(".footer__btn");

  const introCloseButton = introPopup.querySelector(".donation-popup__close");
  const introOverlay = introPopup.querySelector(".donation-popup__overlay");
  const introAmountButtons = introPopup.querySelectorAll(
    ".donation-popup__amount",
  );

  const stepOverlay = stepPopup
    ? stepPopup.querySelector(".donation-steps-popup__overlay")
    : null;

  const openModal = (modal, openClassName) => {
    modal.classList.add(openClassName);
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("popup-open");
  };

  const closeModal = (modal, openClassName) => {
    modal.classList.remove(openClassName);
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("popup-open");
  };

  const openIntroPopup = () => {
    openModal(introPopup, "donation-popup_open");
  };

  const closeIntroPopup = () => {
    closeModal(introPopup, "donation-popup_open");
  };

  const openStepPopup = () => {
    if (!stepPopup) return;
    openModal(stepPopup, "donation-steps-popup_open");
  };

  const closeStepPopup = () => {
    if (!stepPopup) return;
    closeModal(stepPopup, "donation-steps-popup_open");
  };

  const donationTriggerButtons = Array.from(
    document.querySelectorAll("button"),
  ).filter((button) => {
    if (
      button.closest(".donation-popup") ||
      button.closest(".donation-steps-popup")
    ) {
      return false;
    }

    if (button.classList.contains("footer__btn")) {
      return false;
    }

    const buttonText = button.textContent
      ? button.textContent.trim().replace(/\s+/g, " ").toLowerCase()
      : "";

    return (
      buttonText.includes("donate") || buttonText.includes("donation amount")
    );
  });

  let showStep = () => {};
  let setStepAmount = () => {};

  if (stepPopup) {
    const steps = stepPopup.querySelectorAll(".donation-steps-popup__step");
    const dots = stepPopup.querySelectorAll(".donation-steps-popup__dot");
    const nextButtons = stepPopup.querySelectorAll(
      ".donation-steps-popup__next",
    );
    const backButtons = stepPopup.querySelectorAll(
      ".donation-steps-popup__back",
    );
    const completeButton = stepPopup.querySelector(
      ".donation-steps-popup__complete",
    );

    const amountButtons = stepPopup.querySelectorAll(
      ".donation-steps-popup__amount",
    );
    const otherAmountButton = stepPopup.querySelector(
      ".donation-steps-popup__other-button",
    );
    const otherAmountInput = stepPopup.querySelector(
      ".donation-steps-popup__other-input",
    );

    const petDropdown = stepPopup.querySelector(
      ".donation-steps-popup__dropdown",
    );
    const petToggle = stepPopup.querySelector(
      ".donation-steps-popup__dropdown-toggle",
    );
    const petText = stepPopup.querySelector(
      ".donation-steps-popup__dropdown-text",
    );
    const petItems = stepPopup.querySelectorAll(
      ".donation-steps-popup__dropdown-item",
    );

    showStep = (stepNumber) => {
      steps.forEach((step) => {
        const isActive = Number(step.dataset.step) === stepNumber;
        step.classList.toggle("donation-steps-popup__step_active", isActive);
      });

      dots.forEach((dot) => {
        const isActive = Number(dot.dataset.step) <= stepNumber;
        dot.classList.toggle("donation-steps-popup__dot_active", isActive);
      });
    };

    setStepAmount = (amount) => {
      amountButtons.forEach((button) => {
        const isActive = button.dataset.amount === amount;
        button.classList.toggle(
          "donation-steps-popup__amount_active",
          isActive,
        );
      });

      if (!otherAmountButton) return;

      if (amount === "other") {
        otherAmountButton.classList.add(
          "donation-steps-popup__other-button_active",
        );
        return;
      }

      otherAmountButton.classList.remove(
        "donation-steps-popup__other-button_active",
      );
      if (otherAmountInput) {
        otherAmountInput.value = "";
      }
    };

    nextButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const nextStep = Number(button.dataset.nextStep);
        showStep(nextStep);
      });
    });

    backButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const backStep = Number(button.dataset.backStep);
        showStep(backStep);
      });
    });

    if (completeButton) {
      completeButton.addEventListener("click", () => {
        closeStepPopup();
        showStep(1);
      });
    }

    amountButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const amount = button.dataset.amount || "";
        setStepAmount(amount);
      });
    });

    if (otherAmountButton) {
      otherAmountButton.addEventListener("click", () => {
        setStepAmount("other");
        if (otherAmountInput) {
          otherAmountInput.focus();
        }
      });
    }

    if (otherAmountInput) {
      otherAmountInput.addEventListener("input", () => {
        if (otherAmountInput.value.trim() !== "") {
          setStepAmount("other");
        }
      });
    }

    if (petDropdown && petToggle) {
      petToggle.addEventListener("click", () => {
        const isOpen = petDropdown.classList.contains(
          "donation-steps-popup__dropdown_open",
        );
        petDropdown.classList.toggle(
          "donation-steps-popup__dropdown_open",
          !isOpen,
        );
        petToggle.setAttribute("aria-expanded", String(!isOpen));
      });

      petItems.forEach((item) => {
        item.addEventListener("click", () => {
          petItems.forEach((currentItem) => {
            currentItem.classList.remove(
              "donation-steps-popup__dropdown-item_selected",
            );
          });

          item.classList.add("donation-steps-popup__dropdown-item_selected");
          if (petText) {
            petText.textContent = item.textContent
              ? item.textContent.trim()
              : "";
          }

          petDropdown.classList.remove("donation-steps-popup__dropdown_open");
          petToggle.setAttribute("aria-expanded", "false");
        });
      });

      document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Node)) return;

        if (!petDropdown.contains(target)) {
          petDropdown.classList.remove("donation-steps-popup__dropdown_open");
          petToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  introTriggerButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      closeStepPopup();
      openIntroPopup();
    });
  });

  donationTriggerButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      setStepAmount("10");
      showStep(1);
      closeIntroPopup();
      openStepPopup();
    });
  });

  if (introCloseButton) {
    introCloseButton.addEventListener("click", closeIntroPopup);
  }

  if (introOverlay) {
    introOverlay.addEventListener("click", closeIntroPopup);
  }

  if (stepOverlay) {
    stepOverlay.addEventListener("click", () => {
      closeStepPopup();
      showStep(1);
    });
  }

  introAmountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      introAmountButtons.forEach((amountButton) => {
        amountButton.classList.remove("donation-popup__amount_active");
      });

      button.classList.add("donation-popup__amount_active");

      const amountText = button.textContent ? button.textContent.trim() : "";
      const isOtherAmount = amountText.toUpperCase().includes("OTHER");
      const amount = isOtherAmount ? "other" : amountText.replace("$", "");

      setStepAmount(amount);
      showStep(1);
      closeIntroPopup();
      openStepPopup();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (
      stepPopup &&
      stepPopup.classList.contains("donation-steps-popup_open")
    ) {
      closeStepPopup();
      showStep(1);
      return;
    }

    if (introPopup.classList.contains("donation-popup_open")) {
      closeIntroPopup();
    }
  });
}
