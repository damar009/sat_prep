const materialRoot = document.getElementById("material-grid");
const exerciseRoot = document.getElementById("exercise-list");
const exerciseSection = document.getElementById("latihan");
const additionalPracticeRoot = document.getElementById("additional-practice-list");
const additionalPracticeSection = document.getElementById("additional-practice");

const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function renderMath() {
  if (window.MathJax?.typesetPromise) {
    return window.MathJax.typesetPromise();
  }
  return Promise.resolve();
}

function renderIcon(icon = "fa-book-open") {
  return String(icon).startsWith("fa-")
    ? `<i class="fa-solid ${escapeHtml(icon)}" aria-hidden="true"></i>`
    : escapeHtml(icon);
}

function normalizeTable(tableOrBlock) {
  if (!tableOrBlock) return null;
  if (tableOrBlock.headers && tableOrBlock.rows) return tableOrBlock;
  if (tableOrBlock.table?.headers && tableOrBlock.table?.rows) return tableOrBlock.table;
  return null;
}

function renderTable(tableOrBlock) {
  const table = normalizeTable(tableOrBlock);
  if (!table) return "";

  const headers = table.headers.map((header, index) => {
    const alignClass = table.leftAlign?.includes(index) ? ' class="text-left"' : "";
    return `<th${alignClass}>${header}</th>`;
  }).join("");

  const rows = table.rows.map((row) => {
    const cells = row.map((cell, index) => {
      const alignClass = table.leftAlign?.includes(index) ? ' class="text-left"' : "";
      return `<td${alignClass}>${cell}</td>`;
    }).join("");
    return `<tr>${cells}</tr>`;
  }).join("");

  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderGrid(gridOrBlock = []) {
  const items = Array.isArray(gridOrBlock)
    ? gridOrBlock
    : gridOrBlock.grid || gridOrBlock.items || [];

  if (!items.length) return "";

  return `
    <div class="info-grid">
      ${items.map((item) => `
        <article class="info-card">
          <h4>${escapeHtml(item.title)}</h4>
          <div>${item.content}</div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderDiagram(name) {
  if (name !== "triangle-9") return "";

  return `
    <div class="diagram-wrap" aria-label="Triangle diagram">
      <svg class="triangle-diagram" viewBox="0 0 320 260" role="img">
        <polygon points="160,12 28,236 292,236" fill="#fff" stroke="#172d46" stroke-width="4"/>
        <line x1="116" y1="87" x2="204" y2="87" stroke="#172d46" stroke-width="4"/>
        <line x1="72" y1="162" x2="248" y2="162" stroke="#172d46" stroke-width="4"/>
        <line x1="116" y1="87" x2="72" y2="162" stroke="#172d46" stroke-width="4"/>
        <line x1="204" y1="87" x2="248" y2="162" stroke="#172d46" stroke-width="4"/>
        <line x1="116" y1="87" x2="160" y2="162" stroke="#172d46" stroke-width="4"/>
        <line x1="204" y1="87" x2="160" y2="162" stroke="#172d46" stroke-width="4"/>
        <line x1="72" y1="162" x2="116" y2="236" stroke="#172d46" stroke-width="4"/>
        <line x1="160" y1="162" x2="160" y2="236" stroke="#172d46" stroke-width="4"/>
        <line x1="248" y1="162" x2="204" y2="236" stroke="#172d46" stroke-width="4"/>
      </svg>
    </div>
  `;
}

function renderDiscussionToggle(content, index, showSolutionToggle) {
  if (!showSolutionToggle) return `<div class="example-box">${content}</div>`;

  const id = `discussion-${index}`;
  return `
    <div class="discussion-panel">
      <button class="solution-toggle" type="button" aria-expanded="false" aria-controls="${id}">
        <span class="solution-toggle__label">Show ▼</span>
      </button>
      <div class="solution-box" id="${id}" hidden>${content}</div>
    </div>
  `;
}

function renderQuizBlock(block, index, showSolutionToggle) {
  const question = `
    <div class="content-block">
      <p><strong>${escapeHtml(block.title || "Quiz")}</strong></p>
      ${block.prompt ? `<p>${block.prompt}</p>` : ""}
    </div>
    ${block.statements?.length ? `
      <div class="quiz-statements">
        <ol type="a">
          ${block.statements.map((statement) => `<li>${statement}</li>`).join("")}
        </ol>
      </div>
    ` : ""}
    ${block.table ? renderTable(block.table) : ""}
    ${block.options ? renderOptions(block.options) : ""}
  `;

  if (!showSolutionToggle) return `<div class="example-box">${question}</div>`;

  const solutionId = `quiz-discussion-${index}`;
  const solution = `
    <strong>Answer: ${escapeHtml(block.answer || "See discussion")}</strong>
    ${(block.discussion || []).length
      ? `<ol>${block.discussion.map((step) => `<li>${step}</li>`).join("")}</ol>`
      : ""}
  `;

  return `
    <div class="quiz-block">
      ${question}
      <button class="solution-toggle" type="button" aria-expanded="false" aria-controls="${solutionId}">
        <span class="solution-toggle__label">Show ▼</span>
      </button>
      <div class="solution-box" id="${solutionId}" hidden>${solution}</div>
    </div>
  `;
}

function renderOptions(options = []) {
  return `
    <ol class="option-list" type="A">
      ${options.map((option) => `<li>${option}</li>`).join("")}
    </ol>
  `;
}

function renderBlock(block, index, showSolutionToggle) {
  if (typeof block === "string") {
    return `<div class="content-block"><p>${block}</p></div>`;
  }

  switch (block.type) {
    case "paragraph":
      return `<div class="content-block"><p>${block.content}</p></div>`;
    case "list":
      return `<ul class="styled-list">${(block.items || []).map((item) => `<li>${item}</li>`).join("")}</ul>`;
    case "ordered-list":
      return `<ol class="styled-list">${(block.items || []).map((item) => `<li>${item}</li>`).join("")}</ol>`;
    case "grid":
      return renderGrid(block);
    case "formula":
      return `<div class="formula-box">${block.content}</div>`;
    case "note":
      return `<aside class="note-box"><strong>Note:</strong><div>${block.content}</div></aside>`;
    case "quiz":
      return renderQuizBlock(block, `block-${index}`, showSolutionToggle);
    case "example": {
      const content = `
        ${block.title ? `<strong>${escapeHtml(block.title)}</strong>` : ""}
        <div>${block.content || ""}</div>
        ${block.diagram ? renderDiagram(block.diagram) : ""}
        ${block.options ? renderOptions(block.options) : ""}
        ${block.table ? renderTable(block.table) : ""}
      `;
      const showExampleSolution = showSolutionToggle && block.showSolutionButton !== false;
      return block.diagram || block.options || block.table
        ? renderDiscussionToggle(content, `block-${index}`, showExampleSolution)
        : `<div class="example-box">${content}</div>`;
    }
    case "table":
      return renderTable(block);
    default:
      return "";
  }
}

function normalizeMaterials(data) {
  if (Array.isArray(data.materi)) return data.materi;
  if (Array.isArray(data.sections)) {
    return data.sections.map((section) => ({
      judul: section.heading,
      icon: "fa-file-lines",
      isi: [{ type: "paragraph", content: section.body }],
    }));
  }
  return [];
}

function sectionEnabled(data, sectionName) {
  return data.settings?.sections?.[sectionName] !== false;
}

function setSectionVisibility(section, visible) {
  if (!section) return;
  section.toggleAttribute("hidden", !visible);
}

function renderMaterials(data, showSolutionToggle) {
  if (!materialRoot) return;
  const materials = normalizeMaterials(data);
  const visible = sectionEnabled(data, "material") && materials.length > 0;
  setSectionVisibility(document.getElementById("materi"), visible);
  if (!visible) return;

  materialRoot.innerHTML = materials.map((item, itemIndex) => `
    <article class="material-card" data-tipe="${escapeHtml(item.tipe || "basic")}">
      <div class="material-card__header">
        <div class="material-icon">${renderIcon(item.icon)}</div>
        <h3>${escapeHtml(item.judul || "Material")}</h3>
      </div>
      ${(item.isi || []).map((block, blockIndex) => renderBlock(block, `${itemIndex}-${blockIndex}`, showSolutionToggle)).join("")}
      ${renderTable(item.table)}
      ${renderGrid(item.grid)}
    </article>
  `).join("");
}

function renderQuestionCard(item, index, showSolutionToggle, idPrefix) {
  const solutionId = `${idPrefix}-solution-${index}`;
  const showSolutionButton = showSolutionToggle && item.showSolutionButton !== false;

  return `
    <article class="exercise-card">
      <div class="exercise-card__header">
        <span class="exercise-number">${index + 1}</span>
        <p>${item.question}</p>
      </div>
      ${item.prompt ? `<div class="content-block">${item.prompt}</div>` : ""}
      ${item.table ? renderTable(item.table) : ""}
      ${item.options ? renderOptions(item.options) : ""}
      ${showSolutionButton ? `
        <button class="solution-toggle" type="button" aria-expanded="false" aria-controls="${solutionId}">
          <span class="solution-toggle__label">Show ▼</span>
        </button>
        <div class="solution-box" id="${solutionId}" hidden>
          <strong>Answer: ${escapeHtml(item.answer)}</strong>
          ${item.intro ? `<p>${item.intro}</p>` : ""}
          <ol>${(item.discussion || []).map((step) => `<li>${step}</li>`).join("")}</ol>
        </div>
      ` : ""}
    </article>
  `;
}

function renderQuestionSection(data, root, section, questions, showSolutionToggle, idPrefix, dataKey) {
  if (!root) return;
  const visible = sectionEnabled(data, dataKey) && questions.length > 0;
  setSectionVisibility(section, visible);
  if (!visible) return;

  root.innerHTML = questions
    .map((item, index) => renderQuestionCard(item, index, showSolutionToggle, idPrefix))
    .join("");
}

function renderExercises(data, showSolutionToggle) {
  const exercises = Array.isArray(data.latihan) ? data.latihan : [];
  renderQuestionSection(data, exerciseRoot, exerciseSection, exercises, showSolutionToggle, "practice", "practice");
}

function renderAdditionalPractice(data, showSolutionToggle) {
  const exercises = Array.isArray(data.additionalPractice) ? data.additionalPractice : [];
  renderQuestionSection(
    data,
    additionalPracticeRoot,
    additionalPracticeSection,
    exercises,
    showSolutionToggle,
    "additional-practice",
    "additionalPractice",
  );
}

function bindSolutionToggles() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".solution-toggle");
    if (!button) return;

    const box = document.getElementById(button.getAttribute("aria-controls"));
    if (!box) return;

    const shouldOpen = button.getAttribute("aria-expanded") !== "true";
    const label = button.querySelector(".solution-toggle__label");

    button.classList.add("is-pressed");
    window.setTimeout(() => button.classList.remove("is-pressed"), 180);
    button.setAttribute("aria-expanded", String(shouldOpen));

    if (shouldOpen) {
      box.hidden = false;
      box.setAttribute("aria-hidden", "false");
      box.classList.remove("is-closing");
      box.style.maxHeight = "0px";
      requestAnimationFrame(() => {
      box.classList.add("is-open");
      box.style.maxHeight = `${box.scrollHeight}px`;
      });
      if (label) label.textContent = "Hide▲";
      renderMath().then(() => {
        if (button.getAttribute("aria-expanded") === "true") {
          box.style.maxHeight = `${box.scrollHeight}px`;
        }
      });
      return;
    }

    box.classList.remove("is-open");
    box.classList.add("is-closing");
    box.style.maxHeight = `${box.scrollHeight}px`;
    requestAnimationFrame(() => {
      box.style.maxHeight = "0px";
    });
    if (label) label.textContent = "Show ▼";

    const finishClosing = () => {
      if (button.getAttribute("aria-expanded") === "false") {
        box.hidden = true;
        box.setAttribute("aria-hidden", "true");
        box.classList.remove("is-closing");
      }
      box.removeEventListener("transitionend", finishClosing);
    };
    box.addEventListener("transitionend", finishClosing);
    window.setTimeout(finishClosing, 320);
  });
}

async function loadContent() {
  try {
    const response = await fetch("data.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load data.json (${response.status})`);

    const data = await response.json();
    const showSolutionToggle = data.settings?.showSolutionToggle !== false;
    renderMaterials(data, showSolutionToggle);
    renderExercises(data, showSolutionToggle);
    renderAdditionalPractice(data, showSolutionToggle);
    renderMath();
  } catch (error) {
    if (materialRoot) {
      materialRoot.innerHTML = `
        <div class="error-state">
          The material could not be loaded. Run the site through a local server so data.json can be read.
          <br>${escapeHtml(error.message)}
        </div>
      `;
    }
  }
}

bindSolutionToggles();
loadContent();
