const errorClass = "error";
const errorTextClass = "error__text";

export const renderErrorState = (
  container: HTMLElement,
  message: string,
): void => {
  container.innerHTML = `
    <div class="${errorClass}">
      <p class="${errorTextClass}">${message}</p>
    </div>
  `;
};
