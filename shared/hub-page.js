const body = document.body;
const sectionId = body.dataset.sectionId;
const hubList = document.querySelector("#hub-list");
const activeCountRoot = document.querySelector("#active-count");
const totalCountRoot = document.querySelector("#total-count");
const titleRoot = document.querySelector("#hub-title");
const descriptionRoot = document.querySelector("#hub-description");
const filterButtons = document.querySelectorAll("[data-hub-filter]");
let sectionPages = [];

function absoluteSiteUrl(path) {
  return new URL(`../${path}`, import.meta.url).href;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderCards(filter = "all") {
  const pages = sectionPages.filter((page) => {
    if (filter === "active") return page.active !== false;
    if (filter === "upcoming") return page.active === false;
    return true;
  });

  if (!pages.length) {
    hubList.innerHTML = '<p class="hub-empty">Belum ada page pada filter ini.</p>';
    return;
  }

  hubList.innerHTML = pages.map((page) => {
    const active = page.active !== false;
    const card = `
        <div class="hub-card__top">
          <span class="hub-card__tag">Page ${escapeHtml(page.number)}</span>
          <span class="hub-status ${active ? "" : "hub-status--muted"}">${active ? "Active" : "Non-active"}</span>
        </div>
        <div>
          <h3>${escapeHtml(page.title)}</h3>
          <p>${escapeHtml(page.summary)}</p>
        </div>
        <span class="hub-card__action">${active ? "Open page" : "Preview structure"} <span aria-hidden="true">↗</span></span>
    `;

    if (!active) {
      return `<article class="hub-card is-inactive" data-number="${escapeHtml(page.number)}">${card}</article>`;
    }

    return `<a class="hub-card" href="${absoluteSiteUrl(page.url)}" data-number="${escapeHtml(page.number)}">${card}</a>`;
  }).join("");
}

async function initHub() {
  if (!sectionId || !hubList) return;

  try {
    const response = await fetch(absoluteSiteUrl("data/pages.json"), { cache: "no-store" });
    const registry = await response.json();
    const section = (registry.sections || []).find((item) => item.id === sectionId);
    if (!section) throw new Error(`Section ${sectionId} tidak ditemukan`);

    sectionPages = section.pages || [];
    titleRoot.textContent = section.title;
    descriptionRoot.textContent = section.description;
    activeCountRoot.textContent = sectionPages.filter((page) => page.active !== false).length;
    totalCountRoot.textContent = sectionPages.length;
    renderCards();
  } catch (error) {
    console.error(error);
    hubList.innerHTML = `<p class="hub-empty">Daftar page belum dapat dimuat.</p>`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderCards(button.dataset.hubFilter);
  });
});

initHub();
