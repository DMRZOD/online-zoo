import { getStoredUser, clearSession } from "../services/auth";
import type { AuthUser } from "../types/api";

function renderButtonContent(
  btn: HTMLButtonElement,
  user: AuthUser | null,
): void {
  const span = btn.querySelector("span");
  const img = btn.querySelector("img");
  if (!span || !img) return;

  if (user) {
    span.textContent = user.name;
    span.style.display = "";
  } else {
    span.textContent = "Account";
    span.style.display = "";
  }
}

function renderGuestDropdown(container: HTMLElement): void {
  container.innerHTML = `
    <a href="/pages/sign-in.html" class="header__user-dropdown-link">Sign In</a>
    <a href="/pages/register.html" class="header__user-dropdown-link">Registration</a>
  `;
}

function renderLoggedInDropdown(container: HTMLElement, user: AuthUser): void {
  container.innerHTML = `
    <div class="header__user-dropdown-profile">
      <p class="header__user-dropdown-label">Name</p>
      <p class="header__user-dropdown-value">${escapeHtml(user.name)}</p>
      <p class="header__user-dropdown-label">Email</p>
      <p class="header__user-dropdown-value">${escapeHtml(user.email)}</p>
    </div>
    <button type="button" class="header__user-dropdown-signout">
      <span>Sign Out</span>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00A092"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-log-out-icon lucide-log-out"
        >
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        </svg>
      </span>
    </button>
  `;
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

export function initHeaderUser(): void {
  const btn = document.querySelector<HTMLButtonElement>(
    ".header__btn.button-user",
  );
  if (!btn) return;

  const wrapper = document.createElement("div");
  wrapper.className = "header__user";
  btn.parentElement?.insertBefore(wrapper, btn);
  wrapper.appendChild(btn);

  const dropdown = document.createElement("div");
  dropdown.className = "header__user-dropdown";
  wrapper.appendChild(dropdown);

  const updateUI = (): void => {
    const user = getStoredUser();
    renderButtonContent(btn, user);
    if (user) {
      renderLoggedInDropdown(dropdown, user);
      const signOut = dropdown.querySelector<HTMLButtonElement>(
        ".header__user-dropdown-signout",
      );
      signOut?.addEventListener("click", () => {
        clearSession();
        dropdown.classList.remove("header__user-dropdown_open");
        updateUI();
      });
    } else {
      renderGuestDropdown(dropdown);
    }
  };

  updateUI();

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("header__user-dropdown_open");
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("header__user-dropdown_open");
  });

  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}
