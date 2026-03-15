const loaderClass = "loader";
const loaderSpinnerClass = "loader__spinner";

export const renderLoader = (container: HTMLElement): void => {
  container.innerHTML = `
    <div class="${loaderClass}">
      <div class="${loaderSpinnerClass}"></div>
    </div>
  `;
};
