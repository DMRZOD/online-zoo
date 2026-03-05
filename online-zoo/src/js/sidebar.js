export function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const toggleButton = document.querySelector(".sidebar__toggle");
  const dropdownButton = document.querySelector(".sidebar__down");

  if (!sidebar || !toggleButton || !dropdownButton) return;

  const closeSidebar = () => {
    sidebar.classList.add("sidebar_collapsed");
  };

  const openSidebar = () => {
    sidebar.classList.remove("sidebar_collapsed");
  };

  toggleButton.addEventListener("click", () => {
    const isSideClose = sidebar.classList.contains("sidebar_collapsed");
    if (isSideClose) {
      openSidebar();
      return;
    }

    closeSidebar();
  });

  const sidebarUp = () => {
    sidebar.classList.add("sidebar_up");
  };

  const sidebarDown = () => {
    sidebar.classList.remove("sidebar_up");
  };

  dropdownButton.addEventListener("click", () => {
    const isSideUp = sidebar.classList.contains("sidebar_up");
    if (isSideUp) {
      sidebarDown();
      return;
    }

    sidebarUp();
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 110) {
      sidebar.classList.add("sidebar_fixed");
    } else {
      sidebar.classList.remove("sidebar_fixed");
    }
  });
}
