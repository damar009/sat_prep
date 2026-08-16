#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const registryPath = path.join(rootDir, "data", "pages.json");
const pagesDir = path.join(rootDir, "pages");

const sectionFolders = {
  info: "page_Info",
  math: "page_mat",
  english: "page_eng",
};

const sectionLabels = {
  info: "SAT Information",
  math: "SAT Math",
  english: "SAT English / Verbal",
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function dummyQuestion(sectionKey, page, kind) {
  const sectionLabel = sectionLabels[sectionKey];
  const isAdditional = kind === "additional";

  return {
    type: "open",
    question: isAdditional
      ? `Dummy additional practice question for ${sectionLabel} unit ${page.number}.`
      : `Dummy practice question for ${sectionLabel} unit ${page.number}.`,
    answer: "Dummy answer. Replace this question and solution later.",
    discussion: [
      "This is temporary placeholder content.",
      "Replace the question, answer, and discussion with the new lesson list.",
    ],
    showSolutionButton: true,
  };
}

function dummyContent(sectionKey, page) {
  const sectionLabel = sectionLabels[sectionKey];

  return {
    eyebrow: `${sectionLabel} / ${page.number}`,
    title: page.title,
    subtitle: "Temporary placeholder content. This page will be rewritten using the new lesson list.",
    materi: [
      {
        judul: "Dummy material",
        icon: sectionKey === "math" ? "fa-square-root-variable" : "fa-file-lines",
        tipe: "basic",
        isi: [
          `This is temporary material for ${sectionLabel} unit ${page.number}: ${page.title}.`,
          {
            type: "note",
            content: "Replace this placeholder with the new material list.",
          },
        ],
      },
    ],
    latihan: [dummyQuestion(sectionKey, page, "practice")],
    additionalPractice: [dummyQuestion(sectionKey, page, "additional")],
  };
}

function pageData(sectionKey, page) {
  return {
    settings: {
      showSolutionToggle: true,
      sections: {
        material: true,
        practice: true,
        additionalPractice: true,
      },
    },
    meta: {
      section: sectionKey,
      pageId: page.id,
      number: page.number,
    },
    ...dummyContent(sectionKey, page),
  };
}

function pageIndex(sectionKey, page, data) {
  const sharedPath = "../../../shared";
  const title = escapeHtml(data.title);
  const subtitle = escapeHtml(data.subtitle);
  const eyebrow = escapeHtml(data.eyebrow);

  return `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>${title} | SAT Pradita</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <script src="${sharedPath}/math-render.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
  <link rel="stylesheet" href="${sharedPath}/page-nav.css">
  <link rel="stylesheet" href="${sharedPath}/content-page.css">
</head>

<body class="page-body">
  <div data-page-nav></div>

  <header class="hero">
    <div class="hero__inner">
      <p class="hero__eyebrow">${eyebrow}</p>
      <h1>${title}</h1>
      <p class="hero__subtitle">${subtitle}</p>
    </div>
  </header>

  <main>
    <section id="materi" class="section-band">
      <div class="section-inner">
        <div class="section-title">
          <p>Material</p>
          <h2>Learning summary</h2>
        </div>
        <div id="material-grid" class="material-stack" aria-live="polite"></div>
      </div>
    </section>

    <section id="latihan" class="section-band section-band--alt" hidden>
      <div class="section-inner">
        <div class="section-title">
          <p>Practice</p>
          <h2>Questions and solutions</h2>
        </div>
        <div id="exercise-list" class="exercise-list"></div>
      </div>
    </section>

    <section id="additional-practice" class="section-band section-band--additional" hidden>
      <div class="section-inner">
        <div class="section-title">
          <p>Additional practice questions</p>
          <h2>Extra questions by topic</h2>
        </div>
        <div id="additional-practice-list" class="exercise-list"></div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>SAT Pradita / ${escapeHtml(sectionKey)} / ${escapeHtml(page.number)}</p>
  </footer>

  <script src="${sharedPath}/page-nav.js" type="module"></script>
  <script src="${sharedPath}/content-page.js" type="module"></script>
</body>

</html>
`;
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function createLessonPage(sectionKey, page) {
  const sectionFolder = sectionFolders[sectionKey];
  if (!sectionFolder) {
    throw new Error(`Unknown section folder for "${sectionKey}"`);
  }

  const pageDir = path.join(pagesDir, sectionFolder, page.id);
  fs.mkdirSync(pageDir, { recursive: true });

  const data = pageData(sectionKey, page);
  writeFile(path.join(pageDir, "index.html"), pageIndex(sectionKey, page, data));
  writeFile(path.join(pageDir, "data.json"), `${JSON.stringify(data, null, 2)}\n`);
}

function main() {
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

  for (const section of registry.sections || []) {
    fs.mkdirSync(path.join(pagesDir, section.key), { recursive: true });
    for (const page of section.pages || []) {
      createLessonPage(section.id, page);
    }
  }

  console.log("SAT dummy page content generated.");
}

main();
