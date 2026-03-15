export const renderDonation = (): string => {
  return `
    <section class="donation donation_zoos">
      <div class="donation__container">
        <div class="donation__content">
          <h4 class="donation__title">Your donation makes a difference!</h4>
          <p class="donation__text">
            The Online Zoo's animal webcams are some of the most famous on the internet. Tune in to watch your favourite animals — live, 24/7!
          </p>
        </div>
        <div class="donation__action">
          <span class="donation__label">Quick Donate</span>
          <button class="button-donation donation__btn">
            <span class="button-donation__text">$ Donation Amount</span>
            <span class="button-donation__icon">
              <img src="/icons/arrow-right.svg" alt="Arrow Right" />
            </span>
          </button>
        </div>
      </div>
    </section>
  `;
};
