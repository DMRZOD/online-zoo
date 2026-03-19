import { EVENT_PET_SELECTED } from "../../services/config";

export const initSidebarSlider = (initialPetId?: number): void => {
  const sidebar = document.querySelector<HTMLElement>(".sidebar");
  const wrap = document.querySelector<HTMLElement>(".sidebar__list-wrap");
  const list = document.querySelector<HTMLElement>(".sidebar__list");
  const downBtn = document.querySelector<HTMLButtonElement>(".sidebar__down");

  if (!sidebar || !wrap || !list || !downBtn) return;

  const items = list.querySelectorAll<HTMLElement>(".sidebar__item");
  const totalItems = items.length;

  if (totalItems === 0) return;

  const half = totalItems / 2;
  const firstItem = items[0];

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 110) {
      sidebar.classList.add("sidebar_fixed");
    } else {
      sidebar.classList.remove("sidebar_fixed");
    }
  });

  const syncItemHeight = (): number => {
    const h = firstItem.offsetHeight;
    wrap.style.setProperty("--sidebar-item-height", `${h}px`);
    return h;
  };

  let currentTranslate = 0;
  let selectedIndex = 0;

  const applyActiveState = (): void => {
    items.forEach((el) => el.classList.remove("sidebar__item_active"));
    const indexStr = String(selectedIndex);
    list
      .querySelectorAll<HTMLElement>(`[data-index="${indexStr}"]`)
      .forEach((el) => el.classList.add("sidebar__item_active"));
  };

  if (initialPetId != null && initialPetId > 0) {
    const idStr = String(initialPetId);
    for (let i = 0; i < half; i++) {
      if (items[i].getAttribute("data-pet-id") === idStr) {
        selectedIndex = i;
        break;
      }
    }
  }

  syncItemHeight();
  applyActiveState();

  list.addEventListener("click", (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>(
      ".sidebar__item",
    );
    if (!item) return;
    const index = item.getAttribute("data-index");
    if (index === null) return;
    selectedIndex = Number.parseInt(index, 10);
    if (Number.isNaN(selectedIndex)) return;
    applyActiveState();

    const petId = item.getAttribute("data-pet-id");
    if (petId != null && petId !== "") {
      document.dispatchEvent(
        new CustomEvent(EVENT_PET_SELECTED, { detail: { petId } }),
      );
    }
  });

  downBtn.addEventListener("click", () => {
    const itemHeight = syncItemHeight();
    const copyHeight = itemHeight * half;

    currentTranslate += itemHeight;

    if (currentTranslate >= copyHeight) {
      currentTranslate = 0;
      list.style.transition = "none";
      list.style.transform = "translateY(0)";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          list.style.transition = "";
        });
      });
      return;
    }

    list.style.transform = `translateY(-${currentTranslate}px)`;
  });

  const resizeObserver = new ResizeObserver(() => {
    syncItemHeight();
  });
  resizeObserver.observe(wrap);
};
