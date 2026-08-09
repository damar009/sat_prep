const mount = document.querySelector("[data-page-nav]");

function absoluteSiteUrl(path) {
  return new URL(`../${path}`, import.meta.url).href;
}

function stripHtml(value = "") {
  const wrapper = document.createElement("span");
  wrapper.innerHTML = value;
  return wrapper.textContent.trim();
}

async function initPageNav() {
  if (!mount) return;

  try {
    const response = await fetch(absoluteSiteUrl("data/pages.json"), { cache: "no-store" });
    const registry = await response.json();
    const currentPath = new URL(window.location.href).pathname;
    const activeSections = (registry.sections || []).filter((section) => section.active !== false);
    const links = activeSections.map((section) => {
      const href = absoluteSiteUrl(section.hubUrl);
      const isActive = new URL(href).pathname === currentPath;
      return `
        <a class="${isActive ? "is-active" : ""}" href="${href}">
          <span>${section.title}</span>
          <small>${stripHtml(section.description)}</small>
        </a>
      `;
    }).join("");

    mount.innerHTML = `
      <nav class="page-nav" aria-label="Page navigation">
        <a class="page-nav__brand" href="${absoluteSiteUrl("index.html")}">
          <strong>SAT <span>PREPARATION</span></strong>
          <small>Independent learning studio</small>
        </a>
        <div class="page-nav__actions">
          <a class="page-nav__home" href="${absoluteSiteUrl("index.html")}"><i class="fa-solid fa-house" aria-hidden="true"></i> Home</a>
          <div class="page-nav__dropdown">
            <button class="page-nav__toggle" type="button" aria-expanded="false">
              Study paths <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
            </button>
            <div class="page-nav__menu">${links}</div>
          </div>
        </div>
      </nav>
    `;

    const dropdown = mount.querySelector(".page-nav__dropdown");
    const toggle = mount.querySelector(".page-nav__toggle");
    toggle.addEventListener("click", () => {
      const isOpen = dropdown.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  } catch (error) {
    console.error(error);
    mount.innerHTML = `<nav class="page-nav page-nav--fallback"><a class="page-nav__home" href="${absoluteSiteUrl("index.html")}">Home</a></nav>`;
  }
}

initPageNav();
