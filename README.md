# SAT Pradita

Static learning website for SAT preparation, designed for independent study and tutor-led sessions.

## Structure

```text
.
├── index.html
├── data/
│   └── pages.json
├── pages/
│   ├── page_Info/
│   │   ├── page_Info_1/
│   │   ├── page_Info_2/
│   │   └── page_Info_3/
│   ├── page_mat/
│   │   ├── page_mat_1/
│   │   ├── ...
│   │   └── page_mat_20/
│   ├── page_eng/
│   │   ├── page_eng_1/
│   │   ├── ...
│   │   └── page_eng_20/
├── scripts/
├── shared/
└── styles/
```

Every hub and lesson page contains:

- `index.html`
- `data.json`

All lesson pages use the universal styles in `shared/content-page.css` and the
universal renderer in `shared/content-page.js`. Hub pages use
`shared/hub-page.css` and `shared/hub-page.js`. There are no redundant
per-page CSS or JavaScript files. Each lesson's material data stays inside that
lesson's own folder.

The page dimensions and responsive spacing follow the same general rhythm as
the Bahan Ajar Penalaran Umum project: a large responsive hero, constrained
content width, section bands, readable cards, horizontal table scrolling, and
mobile breakpoints. The visual language is intentionally different.

## Active / Non-active Pages

Page visibility is controlled centrally in `data/pages.json`:

```json
{
  "id": "page_mat_5",
  "active": false,
  "url": "pages/page_mat/page_mat_5/index.html"
}
```

Set `active` to `true` when a page is ready to be opened from the active study
path. Non-active pages remain visible in the catalogue as planned structure.

Each content page stores content-level settings in its own `data.json`:

```json
{
  "settings": {
    "showSolutionToggle": true,
    "sections": {
      "material": true,
      "practice": true,
      "additionalPractice": true
    }
  }
}
```

The three section settings control whether Material, Practice, and Additional
Practice Questions are rendered. A section with `false` is hidden even when
its data exists.

Every practice question can independently control its discussion button:

```json
{
  "question": "What is the value of x?",
  "answer": "\\(6\\)",
  "showSolutionButton": false
}
```

Set `showSolutionButton` to `false` to hide that question's solution button.
The page-level `showSolutionToggle` setting can hide all solution buttons on
the page at once.

The data keys are:

- `materi`: Material section content.
- `latihan`: meeting Practice questions.
- `additionalPractice`: extra questions for additional practice.

Pages without prepared questions currently receive dummy Practice and
Additional Practice questions so the page structure is ready for later
content replacement.

## LaTeX

Math pages load MathJax through `shared/math-render.js`. Write equations only
with LaTeX delimiters:

```text
Inline: \(y = mx + b\)

Display:
\[
m = \frac{y_2-y_1}{x_2-x_1}
\]
```

## Generate the Page Structure

The complete page tree can be regenerated from `data/pages.json`:

```bash
node scripts/create-sat-pages.mjs
```

This creates the three hub pages and all 43 lesson pages without replacing the
central registry. The only source of truth for page activation is
`data/pages.json`.

## Preview

Run a local server from the project folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```
