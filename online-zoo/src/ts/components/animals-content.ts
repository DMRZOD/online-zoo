/**
 * Статичная разметка секций Live, Donation, Info для страницы Zoos.
 * Позже live и info можно заменить на рендер из данных (getLiveHtml, getInfoHtml).
 */
export const animalsPageHtml = (): string => {
  return `
      <section class="donation donation_zoos">
        <div class="donation__container">
          <div class="donation__content">
            <h4 class="donation__title">Make the Bamboo Donation!</h4>
            <p class="donation__text">
              Our process for bamboo donations first starts with a site
              evaluation. It is important that our team sees where the bamboo is
              growing, then determining if the bamboo is a species that our
              animals are currently eating. Thank you for your interest in
              donating bamboo for our pandas.
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

      <section class="info">
        <div class="info__container">
          <div class="info__header">
            <h3 class="info__title">Did you know?</h3>
            <p class="info__subtitle">
              Pandas are often seen eating in a relaxed sitting posture, with
              their hind legs stretched out before them. They may appear
              sedentary, but they are skilled tree-climbers and efficient
              swimmers.
            </p>
          </div>

          <div class="info__content">
            <ul class="info__list">
              <li class="info__item"><span>Common name:</span>Giant Panda</li>
              <li class="info__item">
                <span>Scientific name:</span>Ailuropoda melanoleuca
              </li>
              <li class="info__item"><span>Type:</span>Herbivore</li>
              <li class="info__item"><span>Size:</span>4 to 5 feet</li>
              <li class="info__item"><span>Diet:</span>Omnivore</li>
              <li class="info__item"><span>Habitat:</span>Forests</li>
              <li class="info__item"><span>Range:</span>Eastern Asia</li>
              <li class="info__item-btn">
                <button class="button-card info__btn">
                  <span>View Live Cam</span>
                  <svg
                    width="28"
                    height="25"
                    viewBox="0 0 28 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.878 0.135121C14.6728 0.224325 14.4865 0.355065 14.3296 0.519851C14.1723 0.684221 14.0476 0.879485 13.9624 1.09446C13.8773 1.30944 13.8335 1.5399 13.8335 1.77265C13.8335 2.00539 13.8773 2.23586 13.9624 2.45083C14.0476 2.66581 14.1723 2.86107 14.3296 3.02544L21.1185 10.1365H1.80205C1.32411 10.1365 0.865757 10.3738 0.527808 10.7963C0.189858 11.2187 0 11.7917 0 12.3891C0 12.9865 0.189858 13.5594 0.527808 13.9819C0.865757 14.4043 1.32411 14.6416 1.80205 14.6416H21.1193L14.3296 21.7536C14.0125 22.0859 13.8344 22.5366 13.8344 23.0064C13.8344 23.4763 14.0125 23.927 14.3296 24.2592C14.6467 24.5915 15.0767 24.7782 15.5252 24.7782C15.9736 24.7782 16.4037 24.5915 16.7208 24.2592L26.8527 13.6423C27.01 13.478 27.1348 13.2827 27.2199 13.0677C27.305 12.8528 27.3489 12.6223 27.3489 12.3895C27.3489 12.1568 27.305 11.9263 27.2199 11.7114C27.1348 11.4964 27.01 11.3011 26.8527 11.1367L16.7208 0.519851C16.5639 0.355065 16.3775 0.224325 16.1724 0.135121C15.9672 0.0459159 15.7473 0 15.5252 0C15.3031 0 15.0831 0.0459159 14.878 0.135121Z"
                      fill="#F58021"
                    />
                  </svg>
                </button>
              </li>
            </ul>

            <div class="info__image">
              <img src="/images/zoos/panda.jpg" alt="Panda" />
            </div>
          </div>

          <p class="info__descr">
            Giant pandas are very unusual animals that eat almost exclusively
            bamboo, which is very low in nutrients. Because of this, they have
            many unique adaptations for their low-energy lifestyle. Giant pandas
            are solitary. They have a highly developed sense of smell that males
            use to avoid each other and to find females for mating in the
            spring. After a five-month pregnancy, females give birth to a cub or
            two, though they cannot care for both twins. The blind infants weigh
            only 5 ounces at birth and cannot crawl until they reach three
            months of age. They are born white, and develop their much loved
            coloring later. Habitat loss is the primary threat to this species.
            Its popularity around the world has helped the giant panda become
            the focus of successful conservation programs.
          </p>
        </div>
      </section>
  `;
};
