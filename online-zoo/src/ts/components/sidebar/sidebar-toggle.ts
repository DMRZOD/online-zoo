export const initSidebarToggle = (): void => {
  const sidebar = document.querySelector<HTMLElement>(".sidebar");
  const toggleBtn =
    document.querySelector<HTMLButtonElement>(".sidebar__toggle");
  if (sidebar && toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar_collapsed");
    });
  }
};
