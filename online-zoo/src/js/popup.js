export function initDonationPopup() {
  const popup = document.querySelector(".donation-popup");
  const openButtons = document.querySelectorAll(".footer__btn");

  if (!popup || openButtons.length === 0) return;

  const closeButton = popup.querySelector(".donation-popup__close");
  const overlay = popup.querySelector(".donation-popup__overlay");
  const amountButtons = popup.querySelectorAll(".donation-popup__amount");

  const openPopup = () => {
    popup.classList.add("donation-popup_open");
    popup.setAttribute("aria-hidden", "false");
    document.body.classList.add("popup-open");
  };

  const closePopup = () => {
    popup.classList.remove("donation-popup_open");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("popup-open");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", openPopup);
  });

  if (closeButton) {
    closeButton.addEventListener("click", closePopup);
  }

  if (overlay) {
    overlay.addEventListener("click", closePopup);
  }

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      popup.classList.contains("donation-popup_open")
    ) {
      closePopup();
    }
  });

  amountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      amountButtons.forEach((amountButton) => {
        amountButton.classList.remove("donation-popup__amount_active");
      });

      button.classList.add("donation-popup__amount_active");
    });
  });
}
