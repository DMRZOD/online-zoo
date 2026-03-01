export function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const toggleButton = document.querySelector(".sidebar__toggle");

  if (!sidebar || !toggleButton) return;

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
}

const sidebar = document.querySelector(".sidebar");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 110) {
    sidebar.classList.add("sidebar_fixed");
  } else {
    sidebar.classList.remove("sidebar_fixed");
  }
});
