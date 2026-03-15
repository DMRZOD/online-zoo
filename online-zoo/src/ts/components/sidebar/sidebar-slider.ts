const WRAP_SELECTOR = ".sidebar__list-wrap";
const LIST_SELECTOR = ".sidebar__list";
const DOWN_BTN_SELECTOR = ".sidebar__down";
const ITEM_SELECTOR = ".sidebar__item";
const ACTIVE_CLASS = "sidebar__item_active";

export const initSidebarSlider = (): void => {
  const wrap = document.querySelector<HTMLElement>(WRAP_SELECTOR);
  const list = document.querySelector<HTMLElement>(LIST_SELECTOR);
  const downBtn = document.querySelector<HTMLButtonElement>(DOWN_BTN_SELECTOR);

  if (!wrap || !list || !downBtn) return;

  const items = list.querySelectorAll<HTMLElement>(ITEM_SELECTOR);
  const totalItems = items.length;

  if (totalItems === 0) return;

  const half = totalItems / 2;
  const firstItem = items[0];
  const itemHeight = firstItem.offsetHeight;

  wrap.style.setProperty("--sidebar-item-height", `${itemHeight}px`);

  const mediaLg = window.matchMedia("(max-width: 920px)");
  if (!mediaLg.matches) {
    wrap.style.height = `${4 * itemHeight}px`;
  }

  const copyHeight = itemHeight * half;
  let currentTranslate = 0;
  let selectedIndex = 0;

  const applyActiveState = (): void => {
    items.forEach((el) => el.classList.remove(ACTIVE_CLASS));
    const indexStr = String(selectedIndex);
    list
      .querySelectorAll<HTMLElement>(`[data-index="${indexStr}"]`)
      .forEach((el) => el.classList.add(ACTIVE_CLASS));
  };

  applyActiveState();

  list.addEventListener("click", (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>(ITEM_SELECTOR);
    if (!item) return;
    const index = item.getAttribute("data-index");
    if (index === null) return;
    selectedIndex = Number.parseInt(index, 10);
    if (Number.isNaN(selectedIndex)) return;
    applyActiveState();
  });

  downBtn.addEventListener("click", () => {
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
};
