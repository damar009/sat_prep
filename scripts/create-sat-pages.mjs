#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const registryPath = path.join(rootDir, "data", "pages.json");
const pagesDir = path.join(rootDir, "pages");

const infoContent = {
  page_Info_1: {
    eyebrow: "SAT Information / 01",
    title: "SAT overview and structure",
    subtitle: "Build a mental map of the test before building a study plan.",
    materi: [
      {
        judul: "What this page is for",
        icon: "fa-compass",
        tipe: "basic",
        isi: [
          "Start here when the SAT still feels like a collection of unfamiliar terms. The goal is to understand the shape of the test, the role of each section, and the difference between learning a concept and practicing a question type.",
          {
            type: "note",
            content: "Use this page as an orientation checklist. Exact test policies and dates should always be checked against the official College Board source before test day.",
          },
        ],
      },
      {
        judul: "A simple study map",
        icon: "fa-map",
        tipe: "table",
        isi: [
          {
            type: "table",
            table: {
              headers: ["Layer", "Question to ask", "Output"],
              leftAlign: [0, 1, 2],
              rows: [
                ["Understand", "What skill is being tested?", "A short concept note"],
                ["Model", "What relationship connects the information?", "An equation or diagram"],
                ["Practice", "Can I solve a similar question?", "A timed attempt"],
                ["Review", "Why did my first approach fail?", "An error log entry"],
              ],
            },
          },
        ],
      },
      {
        judul: "The two study modes",
        icon: "fa-people-arrows",
        tipe: "basic",
        isi: [
          "For independent learning, read the concept note, attempt the examples without opening the solution, and record the exact step where you became uncertain.",
          "For tutor-led learning, use the same page as a shared agenda. The tutor can open the discussion after the learner has committed to a first approach.",
        ],
      },
    ],
    latihan: [
      {
        type: "multiple-choice",
        question: "Which sequence best describes a productive learning loop?",
        options: ["Guess, skip, repeat", "Understand, model, practice, review", "Memorize, rush, compare", "Read, copy, finish"],
        answer: "B",
        discussion: [
          "A productive loop moves from understanding the idea to building a model, practicing it, and reviewing the result.",
        ],
      },
    ],
  },
  page_Info_2: {
    eyebrow: "SAT Information / 02",
    title: "Study strategy and pacing",
    subtitle: "Turn a large target into small, repeatable study actions.",
    materi: [
      {
        judul: "Plan from evidence",
        icon: "fa-chart-line",
        tipe: "basic",
        isi: [
          "A useful plan is built from evidence: the kinds of questions you miss, the time you need, and the concepts that still feel unstable.",
          {
            type: "formula",
            content: "\\[\\text{Weekly focus} = \\text{priority skill} + \\text{targeted practice} + \\text{error review}\\]",
          },
        ],
      },
      {
        judul: "A compact practice rhythm",
        icon: "fa-clock",
        tipe: "table",
        isi: [
          {
            type: "table",
            table: {
              headers: ["Session", "Purpose", "Suggested output"],
              leftAlign: [0, 1, 2],
              rows: [
                ["Preview", "Recall the concept and inspect examples.", "Three key ideas"],
                ["Drill", "Solve a small set with one focus.", "Marked attempts"],
                ["Review", "Classify the reason for each miss.", "Error log"],
                ["Transfer", "Solve a new context without prompts.", "One clean solution"],
              ],
            },
          },
        ],
      },
      {
        judul: "Pacing without panic",
        icon: "fa-gauge-high",
        tipe: "basic",
        isi: [
          "Pacing is not simply working faster. It is deciding which questions deserve immediate attention, which need a marked return, and which can be simplified with a model or estimation.",
          {
            type: "note",
            content: "When time feels tight, protect accuracy on questions whose structure you understand. Use the review step to study the questions that exposed a real gap.",
          },
        ],
      },
    ],
    latihan: [
      {
        type: "open",
        question: "A learner completes 18 focused practice questions in 3 sessions. What is the average number of questions per session?",
        answer: "\\(6\\)",
        discussion: [
          "Divide the total number of questions by the number of sessions.",
          "\\(18 \\div 3 = 6\\), so the average is \\(6\\) questions per session.",
        ],
      },
    ],
  },
  page_Info_3: {
    eyebrow: "SAT Information / 03",
    title: "Tools and resources",
    subtitle: "Keep the right tools close without letting tools replace reasoning.",
    materi: [
      {
        judul: "Tool before button",
        icon: "fa-toolbox",
        tipe: "basic",
        isi: [
          "A calculator, reference sheet, or graphing tool is most useful after you identify the relationship in the problem. First decide what the question is asking; then choose the tool that reduces unnecessary work.",
          {
            type: "example",
            title: "A good tool decision",
            content: "If a question asks when two quantities are equal, model the relationship first. For example, if \\(f(x) = 2x + 3\\) and \\(g(x) = 11\\), the useful question is \\(2x + 3 = 11\\), not simply which button to press.",
          },
        ],
      },
      {
        judul: "Build a personal reference shelf",
        icon: "fa-bookmark",
        tipe: "grid",
        isi: [
          {
            type: "grid",
            items: [
              { title: "Formula notes", content: "Keep formulas with one example and one common trap." },
              { title: "Error log", content: "Record the reason a choice failed, not only the correct answer." },
              { title: "Timed sets", content: "Use short sets to practice switching between question types." },
            ],
          },
        ],
      },
      {
        judul: "Source hygiene",
        icon: "fa-shield-halved",
        tipe: "basic",
        isi: [
          "Separate official information from tutor notes and personal shortcuts. When a policy, schedule, or test feature matters, verify it with the current official source before relying on it.",
        ],
      },
    ],
    latihan: [
      {
        type: "multiple-choice",
        question: "What should happen before choosing a calculator strategy?",
        options: ["Identify the mathematical relationship", "Try random buttons", "Skip the variables", "Copy a previous answer"],
        answer: "A",
        discussion: [
          "The relationship tells you whether a calculator, graph, estimation, or algebraic manipulation is the most efficient next step.",
        ],
      },
    ],
  },
};

const mathContent = {
  page_mat_1: {
    eyebrow: "SAT Math / 01",
    title: "Introduction and fundamentals",
    subtitle: "Learn the language of SAT Math: structure, models, tools, and habits.",
    materi: [
      {
        judul: "What we will build",
        icon: "fa-layer-group",
        tipe: "basic",
        isi: [
          "This first unit creates the foundation for every later topic. We will connect the test workflow to four habits: identify the quantity, model the relationship, calculate carefully, and verify the result.",
          {
            type: "list",
            items: [
              "Recognize the question type before calculating.",
              "Translate words into a relationship or equation.",
              "Use a tool only after the mathematical structure is clear.",
              "Check whether the answer fits the context.",
            ],
          },
        ],
      },
      {
        judul: "Mathematical modeling",
        icon: "fa-diagram-project",
        tipe: "basic",
        isi: [
          "Modeling means translating a situation into mathematics and translating the result back into the situation.",
          {
            type: "formula",
            content: "\\[\\text{total cost} = (\\text{number of items})(\\text{price per item})\\]",
          },
          {
            type: "example",
            title: "A direct model",
            content: "If one notebook costs \\(d\\) dollars and a student buys \\(n\\) notebooks, the total cost is \\(nd\\) dollars.",
          },
        ],
      },
      {
        judul: "Notation that appears often",
        icon: "fa-code",
        tipe: "table",
        isi: [
          {
            type: "table",
            table: {
              headers: ["Words", "Model", "Meaning"],
              leftAlign: [0, 1, 2],
              rows: [
                ["double", "\\(2x\\)", "two times a quantity"],
                ["3 more than \\(x\\)", "\\(x + 3\\)", "add 3 to the quantity"],
                ["3 less than \\(x\\)", "\\(x - 3\\)", "subtract 3 from the quantity"],
                ["no more than 30", "\\(x \\le 30\\)", "30 is the maximum"],
              ],
            },
          },
        ],
      },
    ],
    latihan: [
      {
        type: "open",
        question: "Andy’s height is \\(x\\), and Bryan is 3 cm taller than Andy. What is Bryan’s height?",
        answer: "\\(x + 3\\)",
        discussion: [
          "The phrase “3 cm taller than” means add 3 to Andy’s height.",
          "Bryan’s height is \\(x + 3\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "A school accepts no more than 1,000 students. If \\(b\\) students are boys and \\(g\\) students are girls, which model is correct?",
        options: ["\\(b + g = 1{,}000\\)", "\\(b + g \\le 1{,}000\\)", "\\(b + g \\ge 1{,}000\\)", "\\(b - g \\le 1{,}000\\)"],
        answer: "B",
        discussion: [
          "The total number of students is \\(b + g\\).",
          "“No more than” means the total can be at most 1,000, so \\(b + g \\le 1{,}000\\).",
        ],
      },
    ],
  },
  page_mat_2: {
    eyebrow: "SAT Math / 02",
    title: "Strategies, reference sheet, and Desmos",
    subtitle: "Make accurate decisions under time pressure: identify the goal, choose an efficient representation, and verify the result.",
    materi: [
      {
        judul: "The SAT Math decision loop",
        icon: "fa-compass",
        tipe: "basic",
        isi: [
          "Strong SAT Math performance is not only about knowing formulas. It is also about deciding what the question is asking, what information matters, and which method reaches the target with the least unnecessary work.",
          {
            type: "ordered-list",
            items: [
              "Focus on the goal: name the exact quantity or claim the question asks for.",
              "Choose a representation: equation, sketch, table, graph, easy numbers, or calculator.",
              "Estimate or eliminate: predict the sign and rough size before calculating exactly.",
              "Calculate and verify: check the answer against the original conditions, units, and domain.",
            ],
          },
          {
            type: "note",
            content: "These strategies support mathematical understanding. They do not replace reading the question carefully or checking whether a result makes sense.",
          },
        ],
      },
      {
        judul: "Focus on the goal and important details",
        icon: "fa-crosshairs",
        tipe: "basic",
        isi: [
          "Many SAT questions give more information than you need. Read the final question first, identify the target, and keep only the details that affect it.",
          {
            type: "example",
            title: "Example: solve only the requested expression",
            content: "If \\(16x-2=30\\), then \\(16x=32\\), so \\(x=2\\). The question does not ask for \\(x\\) alone; it asks for \\(8x-1\\). Therefore, \\(8(2)-1=15\\).",
          },
          {
            type: "grid",
            items: [
              { title: "Target", content: "What quantity, expression, or statement must be reported?" },
              { title: "Details", content: "Which numbers, labels, units, or conditions actually influence the target?" },
              { title: "Check", content: "Does the result have the correct sign, size, unit, and domain?" },
            ],
          },
        ],
      },
      {
        judul: "Sketch the information",
        icon: "fa-pen-ruler",
        tipe: "basic",
        isi: [
          "A quick sketch can turn a long description into visible relationships. Draw only what helps: label known lengths, mark the relevant angle or diagonal, and keep the diagram proportional enough to reveal the structure.",
          {
            type: "example",
            title: "Example: rectangle and diagonal",
            content: "A rectangle has area \\(540\\) square feet and length \\(36\\) feet. Its width is \\(540\\div36=15\\). A diagonal forms a right triangle, so \\(d=\\sqrt{36^2+15^2}=\\sqrt{1521}=39\\) feet.",
          },
          {
            type: "note",
            content: "A sketch is a model, not proof that the picture is drawn to scale. Trust the labels and relationships given in the question.",
          },
        ],
      },
      {
        judul: "Eliminate impossible options",
        icon: "fa-filter-circle-xmark",
        tipe: "table",
        isi: [
          "Before doing exact algebra, use the context to reject choices that cannot work. This is especially useful for multiple-choice questions.",
          {
            type: "table",
            table: {
              headers: ["Check", "Question to ask", "Typical consequence"],
              leftAlign: [0, 1, 2],
              rows: [
                ["Sign", "Can the quantity be negative?", "A length, area, or count is usually nonnegative."],
                ["Size", "Is the answer near the expected magnitude?", "An estimate can remove choices that are far too large or small."],
                ["Units", "Does the choice measure the requested quantity?", "A perimeter cannot be reported in square units."],
                ["Domain", "Does the value satisfy the original condition?", "A denominator cannot be zero, and a square-root input must be nonnegative."],
              ],
            },
          },
        ],
      },
      {
        judul: "Pick easy numbers",
        icon: "fa-dice-five",
        tipe: "basic",
        isi: [
          "When a problem describes a relationship involving an unspecified total or a variable with a simple restriction, choose a convenient value that preserves the relationship. This can make the structure visible.",
          {
            type: "example",
            title: "Example: nested percentages",
            content: "Suppose \\(40\\%\\) of students have blue eyes and \\(20\\%\\) of those students also have brown hair. Imagine \\(100\\) students: \\(40\\) have blue eyes, and \\(20\\%\\) of \\(40\\) is \\(8\\). Therefore, \\(8\\%\\) of the original group has both characteristics.",
          },
          {
            type: "note",
            content: "Choose easy numbers only when the problem gives a proportional relationship. Do not replace a fixed value or a condition that determines a unique total.",
          },
        ],
      },
      {
        judul: "Use 10 or 100 for percentage problems",
        icon: "fa-percent",
        tipe: "basic",
        isi: [
          "For a percentage question, make the base explicit. Using \\(100\\) is often fastest when the problem asks for a percentage of an original group; using \\(10\\) can make decimal percentages easy to visualize.",
          {
            type: "formula",
            content: "\\[\\text{new amount}=\\left(1\\pm\\frac{p}{100}\\right)(\\text{original amount})\\]",
          },
          {
            type: "example",
            title: "Example: percent of a percent",
            content: "If a triangle's base is \\(40\\%\\) less than a rectangle's length and its height is \\(50\\%\\) greater than the rectangle's width, let the rectangle dimensions be \\(L\\) and \\(W\\). Then \\(b=0.6L\\), \\(h=1.5W\\), and \\(A_T=\\frac12(0.6L)(1.5W)=0.45LW\\). The triangle's area is \\(45\\%\\) of the rectangle's area.",
          },
          {
            type: "note",
            content: "“20% of the blue-eyed students” is different from “20% of all students.” Always name the base before multiplying.",
          },
        ],
      },
      {
        judul: "Know the SAT reference sheet",
        icon: "fa-book-open",
        tipe: "table",
        isi: [
          "The reference sheet is a tool for recall, but it is only useful when you recognize the variables and the situation that matches a formula.",
          {
            type: "table",
            table: {
              headers: ["Shape or relationship", "Formula", "Variables"],
              leftAlign: [0, 1, 2],
              rows: [
                ["Triangle area", "\\(A=\\frac12bh\\)", "\\(b\\) is base; \\(h\\) is perpendicular height"],
                ["Circle area", "\\(A=\\pi r^2\\)", "\\(r\\) is radius"],
                ["Circle circumference", "\\(C=2\\pi r\\)", "\\(r\\) is radius"],
                ["Cylinder volume", "\\(V=\\pi r^2h\\)", "\\(r\\) is radius; \\(h\\) is height"],
                ["Pythagorean theorem", "\\(a^2+b^2=c^2\\)", "\\(c\\) is the hypotenuse"],
              ],
            },
          },
          {
            type: "example",
            title: "Example: estimate a cylinder volume",
            content: "For radius \\(2\\) inches and height between \\(7.75\\) and \\(8\\) inches, \\(V=\\pi(2)^2h=4\\pi h\\). Choosing \\(h=8\\) gives about \\(32\\pi\\approx101\\) cubic inches, so a possible volume rounded to the nearest cubic inch is \\(101\\).",
          },
          {
            type: "note",
            content: "Before substituting, check whether the problem gives a radius or diameter and whether the requested unit is linear, square, or cubic.",
          },
        ],
      },
      {
        judul: "Get comfortable with Desmos",
        icon: "fa-chart-line",
        tipe: "basic",
        isi: [
          "Desmos is most helpful when the question is naturally numerical or graphical. Enter the mathematical relationship first, then use the tool to calculate, graph, compare, or confirm.",
          {
            type: "table",
            table: {
              headers: ["Task", "Desmos move", "What to inspect"],
              leftAlign: [0, 1, 2],
              rows: [
                ["Evaluate", "Type an expression such as \\(23+40\\) or \\(\\sqrt{36}\\).", "The numerical result and its units."],
                ["Intersection", "Graph both equations.", "The shared point, especially its \\(x\\)-coordinate."],
                ["Intercept", "Graph the function and select the intercept.", "Where the graph crosses an axis."],
                ["Table", "Enter a function and open its table.", "Output values for selected inputs."],
                ["Check a point", "Graph the equation and inspect whether the point lies on it.", "Whether the coordinates satisfy the relationship."],
              ],
            },
          },
          {
            type: "note",
            content: "Estimate before pressing Enter. A calculator can evaluate the expression you typed, but it cannot repair a misread question or an incorrect model.",
          },
        ],
      },
      {
        judul: "A practical SAT Math checklist",
        icon: "fa-clipboard-check",
        tipe: "basic",
        isi: [
          {
            type: "list",
            items: [
              "Read the final question and underline the target mentally.",
              "Translate the important information into an equation, sketch, table, or graph.",
              "Estimate the answer's sign and size.",
              "Use answer choices, easy numbers, the reference sheet, or Desmos when they reduce work.",
              "Re-read the question and report the requested quantity with the correct unit.",
              "Record recurring mistakes as sign, unit, interpretation, or calculator-entry errors.",
            ],
          },
        ],
      },
    ],
    latihan: [
      {
        type: "multiple-choice",
        question: "If \\(16x-2=30\\), what is the value of \\(8x-1\\)?",
        options: ["12", "15", "16", "28"],
        answer: "B",
        discussion: [
          "Add 2 to both sides: \\(16x=32\\), so \\(x=2\\).",
          "The question asks for \\(8x-1\\), not just \\(x\\). Substitute: \\(8(2)-1=15\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "A rectangle has area \\(540\\) square feet and length \\(36\\) feet. A fence is built along its diagonal. How many feet of fence are needed?",
        options: ["39", "51", "60", "81"],
        answer: "A",
        discussion: [
          "The width is \\(540\\div36=15\\) feet.",
          "The diagonal is the hypotenuse of a right triangle: \\(d=\\sqrt{36^2+15^2}=\\sqrt{1521}=39\\) feet.",
        ],
      },
      {
        type: "multiple-choice",
        question: "Forty percent of a class has blue eyes. Twenty percent of that group has brown hair. What percentage of the entire class has both characteristics?",
        options: ["4%", "8%", "16%", "20%"],
        answer: "B",
        discussion: [
          "Imagine 100 students. Then 40 students have blue eyes.",
          "Twenty percent of 40 is \\(0.20(40)=8\\), so 8 students out of 100 have both characteristics: \\(8\\%\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "Given \\(E=\\frac{O+4M+P}{6}\\), which expression gives \\(P\\) in terms of \\(E\\), \\(O\\), and \\(M\\)?",
        options: ["\\(P=6E-O-4M\\)", "\\(P=-6E+O+4M\\)", "\\(P=\\frac{O+4M+E}{6}\\)", "\\(P=\\frac{O+4M-E}{6}\\)"],
        answer: "A",
        discussion: [
          "Multiply both sides by 6: \\(6E=O+4M+P\\).",
          "Subtract \\(O+4M\\) from both sides to obtain \\(P=6E-O-4M\\).",
        ],
      },
      {
        type: "open",
        question: "What is the mean of the data set \\(25,28,23,36,29\\)?",
        answer: "\\(28.2\\)",
        discussion: [
          "Add the values: \\(25+28+23+36+29=141\\).",
          "Divide by the five data values: \\(141\\div5=28.2\\).",
          "In Desmos, you can enter the list and calculate its mean to confirm the result.",
        ],
      },
      {
        type: "multiple-choice",
        question: "If 40% of the students in a class have blue eyes, and 20% of those students with blue eyes have brown hair, then what percent of the original total number of students have brown hair and blue eyes?",
        options: ["4%", "8%", "16%", "20%", "32%"],
        answer: "B",
        discussion: [
          "Imagine 100 students. Then 40 students have blue eyes.",
          "Twenty percent of those 40 students is \\(0.20(40)=8\\).",
          "Therefore, 8 students out of the original 100 have both characteristics, or \\(8\\%\\).",
        ],
      },
      {
        type: "open",
        question: "What is the mean of the following data? \\(25,\\ 28,\\ 23,\\ 36,\\ 29\\)",
        answer: "\\(28.2\\)",
        discussion: [
          "Add the five values: \\(25+28+23+36+29=141\\).",
          "Divide by the number of values: \\(141\\div5=28.2\\).",
        ],
      },
      {
        type: "open",
        question: "Using Desmos, calculate \\(23+40\\).",
        answer: "\\(63\\)",
        discussion: [
          "Enter \\(23+40\\) in the expression list.",
          "Desmos gives \\(63\\).",
        ],
      },
      {
        type: "open",
        question: "Using Desmos, calculate \\(9.8-2.1\\).",
        answer: "\\(7.7\\)",
        discussion: [
          "Enter \\(9.8-2.1\\) in the expression list.",
          "Desmos gives \\(7.7\\).",
        ],
      },
      {
        type: "open",
        question: "Using Desmos, calculate \\(23\\times12\\).",
        answer: "\\(276\\)",
        discussion: [
          "Enter \\(23\\times12\\) in the expression list.",
          "Desmos gives \\(276\\).",
        ],
      },
      {
        type: "open",
        question: "Using Desmos, calculate \\(\\frac{12}{60}\\).",
        answer: "\\(0.2\\)",
        discussion: [
          "Enter \\(12/60\\) in the expression list.",
          "Desmos gives \\(0.2\\), which is also equal to \\(\\frac15\\).",
        ],
      },
      {
        type: "open",
        question: "Using Desmos, calculate \\(4^5\\).",
        answer: "\\(1024\\)",
        discussion: [
          "Enter \\(4^5\\) in the expression list.",
          "Desmos gives \\(1024\\).",
        ],
      },
      {
        type: "open",
        question: "Using Desmos, calculate \\(\\sqrt{36}\\).",
        answer: "\\(6\\)",
        discussion: [
          "Enter \\(\\sqrt{36}\\) in the expression list.",
          "Desmos gives \\(6\\).",
        ],
      },
      {
        type: "open",
        question: "Using Desmos, calculate \\(\\sqrt[10]{1024}\\). You may enter it as \\(1024^{1/10}\\).",
        answer: "\\(2\\)",
        discussion: [
          "Enter \\(1024^{1/10}\\) in the expression list.",
          "Because \\(2^{10}=1024\\), Desmos gives \\(2\\).",
        ],
      },
      {
        type: "open",
        question: "Using Desmos, calculate \\(\\frac{2\\times15}{6}\\).",
        answer: "\\(5\\)",
        discussion: [
          "Enter \\((2\\times15)/6\\) in the expression list.",
          "Desmos gives \\(5\\).",
        ],
      },
      {
        type: "open",
        question: "Using Desmos, calculate \\((4^6+3)-12\\).",
        answer: "\\(3987\\)",
        discussion: [
          "Evaluate the exponent first: \\(4^6=4096\\).",
          "Then \\((4096+3)-12=3987\\).",
        ],
      },
      {
        type: "open",
        question: "Using Desmos, calculate \\(5\\pi+4\\).",
        answer: "\\(19.708\\) approximately",
        discussion: [
          "Enter \\(5\\pi+4\\) in the expression list.",
          "Desmos gives approximately \\(19.708\\).",
        ],
      },
    ],
    additionalPractice: [
      {
        type: "multiple-choice",
        question: "If \\(x\\) represents an even integer, which expression must represent an odd integer?",
        options: ["\\(3x\\)", "\\(2x+1\\)", "\\(3x+2\\)", "\\(4x-2\\)"],
        answer: "B",
        discussion: [
          "An even integer can be written as \\(x=2k\\).",
          "Then \\(2x+1=2(2k)+1=4k+1\\), which is odd.",
        ],
      },
      {
        type: "multiple-choice",
        question: "A graduated cylinder has radius \\(2\\) inches and height between \\(7.75\\) and \\(8\\) inches. Which is one possible volume, rounded to the nearest cubic inch?",
        options: ["25 cubic inches", "50 cubic inches", "101 cubic inches", "201 cubic inches"],
        answer: "C",
        discussion: [
          "Use the cylinder formula \\(V=\\pi r^2h\\).",
          "With \\(r=2\\) and \\(h=8\\), \\(V=4\\pi(8)=32\\pi\\approx100.5\\), which rounds to \\(101\\) cubic inches.",
          "Because the height can be any value between \\(7.75\\) and \\(8\\), a value near 101 cubic inches is possible.",
        ],
      },
      {
        type: "multiple-choice",
        question: "Which Desmos action is most direct for finding where \\(y=2x+3\\) and \\(y=11\\) have the same value?",
        options: [
          "Graph both equations and select their intersection",
          "Open a blank table without entering an equation",
          "Calculate only the \\(y\\)-intercept of \\(y=2x+3\\)",
          "Enter \\(2+3+11\\) as a single expression",
        ],
        answer: "A",
        discussion: [
          "The two quantities have the same value at the point where their graphs intersect.",
          "Graph \\(y=2x+3\\) and \\(y=11\\), then select the intersection to read the solution.",
        ],
      },
      {
        type: "multiple-choice",
        question: "The base of a triangle is \\(40\\%\\) less than the length of a rectangle, and the triangle's height is \\(50\\%\\) greater than the rectangle's width. What percent of the rectangle's area is the triangle's area?",
        options: ["10%", "45%", "90%", "110%"],
        answer: "B",
        discussion: [
          "Let the rectangle have length \\(L\\) and width \\(W\\). Then the triangle has base \\(0.6L\\) and height \\(1.5W\\).",
          "Its area is \\(\\frac12(0.6L)(1.5W)=0.45LW\\).",
          "Since the rectangle's area is \\(LW\\), the triangle's area is \\(45\\%\\) of it.",
        ],
      },
      {
        type: "open",
        question: "Write one mistake category you should record after missing an SAT Math question, and explain what it helps you notice.",
        answer: "Answers may vary. Useful categories include sign, unit, interpretation, and calculator-entry errors.",
        discussion: [
          "A useful error log names the cause, not only the correct answer.",
          "For example, a unit error reminds you to distinguish length, area, and volume before selecting a choice.",
        ],
      },
      {
        type: "multiple-choice",
        question: "If \\(7x=42\\), what is the value of \\(x\\)?",
        options: ["\\(5\\)", "\\(6\\)", "\\(7\\)", "\\(8\\)"],
        answer: "B",
        discussion: [
          "Divide both sides by 7: \\(x=42\\div7=6\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "What is the mean of \\(8\\), \\(10\\), \\(12\\), and \\(14\\)?",
        options: ["\\(10\\)", "\\(11\\)", "\\(12\\)", "\\(13\\)"],
        answer: "B",
        discussion: [
          "Add the values: \\(8+10+12+14=44\\).",
          "Divide by 4: \\(44\\div4=11\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "What is \\(25\\%\\) of \\(80\\)?",
        options: ["\\(15\\)", "\\(20\\)", "\\(25\\)", "\\(30\\)"],
        answer: "B",
        discussion: [
          "Convert \\(25\\%\\) to \\(0.25\\) and multiply: \\(0.25(80)=20\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "Which formula should be used to find the area of a circle with radius \\(r\\)?",
        options: ["\\(A=2\\pi r\\)", "\\(A=\\pi r^2\\)", "\\(A=\\frac12\\pi r\\)", "\\(A=4\\pi r^2\\)"],
        answer: "B",
        discussion: [
          "The area of a circle is \\(A=\\pi r^2\\).",
          "The formula \\(2\\pi r\\) gives circumference, not area.",
        ],
      },
      {
        type: "multiple-choice",
        question: "Which value is closest to \\(\\sqrt{50}\\)?",
        options: ["\\(5\\)", "\\(6\\)", "\\(7\\)", "\\(8\\)"],
        answer: "C",
        discussion: [
          "Since \\(49<50<64\\), \\(7<\\sqrt{50}<8\\).",
          "Also, \\(\\sqrt{50}\\approx7.07\\), so 7 is closest.",
        ],
      },
      {
        type: "multiple-choice",
        question: "A quantity increases from \\(120\\) to \\(150\\). What is the percent increase?",
        options: ["\\(20\\%\\)", "\\(25\\%\\)", "\\(30\\%\\)", "\\(35\\%\\)"],
        answer: "B",
        discussion: [
          "The increase is \\(150-120=30\\).",
          "Relative to the original amount, \\(30\\div120=0.25=25\\%\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "The mean of five numbers is \\(18\\). Four of the numbers are \\(12\\), \\(15\\), \\(20\\), and \\(21\\). What is the fifth number?",
        options: ["\\(18\\)", "\\(20\\)", "\\(22\\)", "\\(24\\)"],
        answer: "C",
        discussion: [
          "The total of all five numbers is \\(5(18)=90\\).",
          "The four known numbers total \\(12+15+20+21=68\\).",
          "The fifth number is \\(90-68=22\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "A rectangle has area \\(180\\) square units and length \\(15\\) units. What is its perimeter?",
        options: ["\\(36\\)", "\\(54\\)", "\\(60\\)", "\\(66\\)"],
        answer: "B",
        discussion: [
          "The width is \\(180\\div15=12\\) units.",
          "The perimeter is \\(2(15+12)=54\\) units.",
        ],
      },
      {
        type: "multiple-choice",
        question: "If \\(40\\%\\) of a number is \\(28\\), what is the number?",
        options: ["\\(56\\)", "\\(60\\)", "\\(70\\)", "\\(72\\)"],
        answer: "C",
        discussion: [
          "Let the number be \\(n\\). Then \\(0.40n=28\\).",
          "Divide by \\(0.40\\): \\(n=28\\div0.40=70\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "The data set is \\(4,7,7,9,13\\). Which statement is true?",
        options: ["The mean is \\(7\\).", "The median is \\(8\\).", "The mode is \\(7\\).", "The range is \\(7\\)."],
        answer: "C",
        discussion: [
          "The value 7 appears more often than any other value, so the mode is 7.",
          "The mean is 8, the median is 7, and the range is \\(13-4=9\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "A rectangle has length \\(20\\%\\) greater than its width. If its area is \\(270\\) square units, what is its perimeter?",
        options: ["\\(54\\)", "\\(60\\)", "\\(66\\)", "\\(72\\)"],
        answer: "C",
        discussion: [
          "Let the width be \\(w\\). The length is \\(1.2w\\).",
          "Area: \\(1.2w^2=270\\), so \\(w^2=225\\) and \\(w=15\\).",
          "The length is 18, so the perimeter is \\(2(15+18)=66\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "A data set contains \\(n\\) values with mean \\(24\\). If each value is increased by \\(5\\), what is the new mean?",
        options: ["\\(24\\)", "\\(29\\)", "\\(5n+24\\)", "\\(120\\)"],
        answer: "B",
        discussion: [
          "Adding 5 to every data value adds 5 to the mean.",
          "The new mean is \\(24+5=29\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "The mean of six test scores is \\(82\\). After one score is removed, the mean of the remaining five scores is \\(79\\). What was the removed score?",
        options: ["\\(87\\)", "\\(92\\)", "\\(97\\)", "\\(102\\)"],
        answer: "C",
        discussion: [
          "The original total is \\(6(82)=492\\).",
          "The total of the remaining five scores is \\(5(79)=395\\).",
          "The removed score is \\(492-395=97\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "A cylinder has radius \\(3\\) inches and height \\(h\\) inches. Its volume is between \\(180\\pi\\) and \\(216\\pi\\) cubic inches. Which interval describes \\(h\\)?",
        options: ["\\(20\\le h\\le24\\)", "\\(10\\le h\\le12\\)", "\\(6\\le h\\le8\\)", "\\(3\\le h\\le6\\)"],
        answer: "A",
        discussion: [
          "Use \\(V=\\pi r^2h\\): \\(V=9\\pi h\\).",
          "Thus \\(180\\pi\\le9\\pi h\\le216\\pi\\).",
          "Divide by \\(9\\pi\\): \\(20\\le h\\le24\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "A quantity is multiplied by \\(1.2\\) and then by \\(0.9\\). Compared with the original quantity, the final quantity is:",
        options: ["\\(8\\%\\) greater", "\\(8\\%\\) less", "\\(10\\%\\) greater", "unchanged"],
        answer: "A",
        discussion: [
          "The combined multiplier is \\(1.2(0.9)=1.08\\).",
          "A multiplier of 1.08 means the final quantity is \\(8\\%\\) greater than the original.",
        ],
      },
      {
        type: "multiple-choice",
        question: "A survey of \\(500\\) students finds that \\(62\\%\\) prefer option A. If the survey has a margin of error of 4 percentage points, which interval is most reasonable for the population percentage?",
        options: ["\\(54\\%\\le p\\le58\\%\\)", "\\(58\\%\\le p\\le66\\%\\)", "\\(62\\%\\le p\\le70\\%\\)", "\\(66\\%\\le p\\le70\\%\\)"],
        answer: "B",
        discussion: [
          "A margin of error of 4 percentage points means use \\(62\\%-4\\%\\) to \\(62\\%+4\\%\\).",
          "The interval is \\(58\\%\\le p\\le66\\%\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "A graphing calculator shows that the intersection of \\(y=3x-5\\) and \\(y=-x+11\\) is \\((4,7)\\). Which expression directly verifies the y-coordinate using the first equation?",
        options: ["\\(3(4)-5\\)", "\\(3(7)-5\\)", "\\(-4+11\\)", "\\(4-11\\)"],
        answer: "A",
        discussion: [
          "The first equation is \\(y=3x-5\\).",
          "Substitute \\(x=4\\): \\(y=3(4)-5=7\\), confirming the y-coordinate.",
        ],
      },
      {
        type: "multiple-choice",
        question: "A quantity is increased by \\(15\\%\\) and then increased by another \\(15\\%\\). What is the total percent increase?",
        options: ["\\(15\\%\\)", "\\(30\\%\\)", "\\(32.25\\%\\)", "\\(35\\%\\)"],
        answer: "C",
        discussion: [
          "Use the combined multiplier \\(1.15(1.15)=1.3225\\).",
          "The final quantity is \\(32.25\\%\\) greater than the original.",
        ],
      },
      {
        type: "multiple-choice",
        question: "A data set has mean \\(40\\) and standard deviation \\(6\\). Each data value is multiplied by \\(3\\). What are the new mean and standard deviation?",
        options: ["Mean \\(43\\), standard deviation \\(9\\)", "Mean \\(120\\), standard deviation \\(18\\)", "Mean \\(120\\), standard deviation \\(6\\)", "Mean \\(40\\), standard deviation \\(18\\)"],
        answer: "B",
        discussion: [
          "Multiplying every data value by 3 multiplies both the mean and standard deviation by 3.",
          "The new mean is \\(3(40)=120\\), and the new standard deviation is \\(3(6)=18\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "A rectangular garden has perimeter \\(80\\) meters. Its length is \\(6\\) meters greater than its width. A path of uniform width is built inside the garden, reducing the usable area to \\(364\\) square meters. If the path has width \\(w\\), which equation can be used to determine \\(w\\)?",
        options: ["\\((23-2w)(17-2w)=364\\)", "\\((23-w)(17-w)=364\\)", "\\((40-w)(40+w)=364\\)", "\\((23+2w)(17+2w)=364\\)"],
        answer: "A",
        discussion: [
          "From the perimeter, \\(l+w=40\\). Since the length is 6 greater than the width, the garden dimensions are 23 meters by 17 meters.",
          "A path of width \\(w\\) on both sides reduces each dimension by \\(2w\\).",
          "The usable-area equation is \\((23-2w)(17-2w)=364\\).",
        ],
      },
    ],
  },
  page_mat_3: {
    eyebrow: "SAT Math / 03",
    title: "Linear functions and graphs",
    subtitle: "Read slope, intercepts, tables, and graphs to build linear models.",
    materi: [
      {
        judul: "Slope and initial value",
        icon: "fa-chart-line",
        tipe: "basic",
        isi: [
          "The form \\(y = mx + b\\) contains two important pieces of information: \\(m\\) is the slope, and \\(b\\) is the value of \\(y\\) when \\(x = 0\\).",
          {
            type: "formula",
            content: "\\[m = \\frac{y_2 - y_1}{x_2 - x_1}\\]",
          },
        ],
      },
      {
        judul: "How to read a graph",
        icon: "fa-magnifying-glass-chart",
        tipe: "basic",
        isi: [
          "Choose two points that are easy to read. Calculate the change in \\(y\\) divided by the change in \\(x\\) to find the slope, then use one point to find the intercept.",
          {
            type: "note",
            content: "A positive slope means the output increases as the input increases. A negative slope means the output decreases as the input increases.",
          },
        ],
      },
      {
        judul: "Representations of a line",
        icon: "fa-table",
        tipe: "table",
        isi: [
          {
            type: "table",
            table: {
              headers: ["Representation", "What to inspect"],
              leftAlign: [0, 1],
              rows: [
                ["Equation", "Slope and intercept"],
                ["Table", "Constant change in output for equal input changes"],
                ["Graph", "Rise, run, and axis intercepts"],
                ["Context", "Units and meaning of the rate"],
              ],
            },
          },
        ],
      },
    ],
    latihan: [
      {
        type: "open",
        question: "A line passes through \\((2, 5)\\) and \\((6, 13)\\). What is its slope?",
        answer: "\\(2\\)",
        discussion: [
          "The change in \\(y\\) is \\(13 - 5 = 8\\).",
          "The change in \\(x\\) is \\(6 - 2 = 4\\).",
          "Therefore, \\(m = \\frac{8}{4} = 2\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "What is the \\(y\\)-intercept of \\(y = -6x - 32\\)?",
        options: ["\\((-6, 0)\\)", "\\((0, -32)\\)", "\\((0, 32)\\)", "\\((-32, 0)\\)"],
        answer: "B",
        discussion: [
          "The \\(y\\)-intercept occurs when \\(x = 0\\).",
          "Substituting \\(x = 0\\) gives \\(y = -32\\), so the point is \\((0, -32)\\).",
        ],
      },
    ],
  },
  page_mat_4: {
    eyebrow: "SAT Math / 04",
    title: "Fractions, percentages, ratios, and proportions",
    subtitle: "Translate between representations and model quantitative relationships with confidence.",
    materi: [
      {
        judul: "Fractions: simplify first",
        icon: "fa-divide",
        tipe: "basic",
        isi: [
          "Fractions, decimals, and percentages describe the same part-to-whole relationship in different forms. Before performing a calculation, simplify and keep the numerator and denominator connected to their meaning.",
          {
            type: "formula",
            content: "\\[\\frac{a}{b}+\\frac{c}{d}=\\frac{ad+bc}{bd},\\qquad \\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{ac}{bd},\\qquad \\frac{a}{b}\\div\\frac{c}{d}=\\frac{a}{b}\\cdot\\frac{d}{c}\\]",
          },
          {
            type: "example",
            title: "Worked example",
            content: "To simplify \\(\\frac{11}{5}\\div\\frac{2}{5}\\), multiply by the reciprocal: \\(\\frac{11}{5}\\cdot\\frac{5}{2}=\\frac{11}{2}\\).",
          },
        ],
      },
      {
        judul: "Convert between forms",
        icon: "fa-arrows-rotate",
        tipe: "table",
        isi: [
          "Choose the form that makes the question easiest to read. A decimal becomes a percent by multiplying by 100, while a percent becomes a decimal by dividing by 100.",
          {
            type: "formula",
            content: "\\[0.75=\\frac{3}{4}=75\\%\\]",
          },
          {
            type: "table",
            table: {
              headers: ["Representation", "How to convert", "Example"],
              leftAlign: [0, 1, 2],
              rows: [
                ["Decimal to percent", "Multiply by 100", "\\(0.36=36\\%\\)"],
                ["Percent to decimal", "Divide by 100", "\\(18\\%=0.18\\)"],
                ["Fraction to percent", "Divide, then multiply by 100", "\\(\\frac{3}{4}=75\\%\\)"],
              ],
            },
          },
        ],
      },
      {
        judul: "Percent of a number",
        icon: "fa-percent",
        tipe: "basic",
        isi: [
          "Identify the whole before calculating. The basic model is part = percent × whole, where the percentage is written as a decimal.",
          {
            type: "formula",
            content: "\\[\\text{part}=\\frac{p}{100}\\cdot\\text{whole}\\]",
          },
          {
            type: "example",
            title: "Worked example",
            content: "If \\(18\\) is what percent of \\(90\\), write \\(18=\\frac{p}{100}(90)\\). Dividing by \\(90\\) gives \\(p=20\\), so the answer is \\(20\\%\\).",
          },
        ],
      },
      {
        judul: "Percent increase and decrease",
        icon: "fa-arrow-trend-up",
        tipe: "basic",
        isi: [
          "Percent change compares the change with the original amount. The original value is the denominator, even when the new value is larger or smaller.",
          {
            type: "formula",
            content: "\\[\\text{percent change}=\\frac{\\text{new}-\\text{original}}{\\text{original}}\\cdot100\\%\\]",
          },
          {
            type: "grid",
            items: [
              { title: "Discount", content: "Multiply by \\(1-r\\). A 20% discount uses factor \\(0.80\\)." },
              { title: "Tax or growth", content: "Multiply by \\(1+r\\). A 7% tax uses factor \\(1.07\\)." },
              { title: "Sequential changes", content: "Multiply factors. Do not simply add or subtract the percentages." },
            ],
          },
          {
            type: "example",
            title: "Discount followed by tax",
            content: "A USD 100 sweater discounted by 20% and taxed at 7% costs \\(100(0.80)(1.07)=\\text{USD }85.60\\).",
          },
          {
            type: "note",
            content: "A 10% increase followed by a 10% decrease does not return to the original value: \\(1.10\\cdot0.90=0.99\\), so the final amount is 1% lower.",
          },
        ],
      },
      {
        judul: "Ratios and proportions",
        icon: "fa-scale-balanced",
        tipe: "basic",
        isi: [
          "A ratio \\(a:b\\) describes two quantities in a fixed order. Represent the quantities as \\(ak\\) and \\(bk\\), where \\(k\\) is the common scale factor.",
          {
            type: "formula",
            content: "\\[a:b\\Rightarrow ak:bk,\\qquad \\frac{a}{b}=\\frac{c}{d}\\]",
          },
          {
            type: "example",
            title: "Ratio model",
            content: "If girls to boys is \\(2:5\\), then \\(G=2k\\) and \\(B=5k\\). If there are 28 girls, \\(2k=28\\), so \\(k=14\\) and \\(B=70\\).",
          },
          {
            type: "note",
            content: "The total number of parts is \\(2+5=7\\). If the total is known, divide the total by 7 before finding each group.",
          },
        ],
      },
      {
        judul: "Rates, direct variation, and inverse variation",
        icon: "fa-gauge-high",
        tipe: "table",
        isi: [
          "Rates compare quantities with different units. Convert units first, then use the rate. For variation questions, decide whether the product or the quotient stays constant.",
          {
            type: "formula",
            content: "\\[\\text{rate}=\\frac{\\text{quantity}}{\\text{time}},\\qquad y=kx,\\qquad y=\\frac{k}{x}\\;\\text{or}\\;xy=k\\]",
          },
          {
            type: "table",
            table: {
              headers: ["Relationship", "Model", "What stays constant"],
              leftAlign: [0, 1, 2],
              rows: [
                ["Direct variation", "\\(y=kx\\)", "\\(\\frac{y}{x}=k\\)"],
                ["Inverse variation", "\\(y=\\frac{k}{x}\\)", "\\(xy=k\\)"],
                ["Unit rate", "\\(r=\\frac{q}{t}\\)", "The rate for one unit of time"],
              ],
            },
          },
          {
            type: "example",
            title: "Worked example",
            content: "A student writes 5 pages in 20 minutes. In 5 hours, there are 300 minutes. The rate is \\(\\frac{5}{20}=\\frac14\\) page per minute, so the student writes \\(300\\cdot\\frac14=75\\) pages.",
          },
        ],
      },
      {
        judul: "SAT translation checklist",
        icon: "fa-list-check",
        tipe: "basic",
        isi: [
          {
            type: "list",
            items: [
              "Name the whole, part, original value, and new value.",
              "Preserve the order of a ratio exactly as stated.",
              "Use compatible units before applying a rate.",
              "Use a factor below 1 for a discount or decrease and above 1 for tax, growth, or increase.",
              "Estimate before calculating so an unreasonable result is easy to catch.",
            ],
          },
        ],
      },
    ],
    latihan: [
      {
        type: "open",
        question: "Simplify \\(\\frac{3}{4}+\\frac{1}{8}\\).",
        answer: "\\(\\frac{7}{8}\\)",
        discussion: [
          "Use a common denominator of 8: \\(\\frac{3}{4}=\\frac{6}{8}\\).",
          "Then \\(\\frac{6}{8}+\\frac{1}{8}=\\frac{7}{8}\\).",
        ],
      },
      {
        type: "open",
        question: "Convert \\(0.36\\) to a fraction and a percent.",
        answer: "\\(\\frac{9}{25}\\) and \\(36\\%\\)",
        discussion: [
          "Write \\(0.36=\\frac{36}{100}\\) and simplify by dividing by 4.",
          "Multiply \\(0.36\\) by 100 to obtain \\(36\\%\\).",
        ],
      },
      {
        type: "multiple-choice",
        question: "A jacket priced at USD 80 is discounted by 15%. What is the sale price?",
        options: ["USD 12", "USD 65", "USD 68", "USD 92"],
        answer: "C",
        discussion: [
          "A 15% discount leaves 85% of the original price.",
          "Calculate \\(80(0.85)=68\\), so the sale price is USD 68.",
        ],
      },
      {
        type: "open",
        question: "The ratio of red to blue marbles is \\(3:4\\). If there are 12 red marbles, how many blue marbles are there?",
        answer: "\\(16\\)",
        discussion: [
          "The scale factor is \\(12\\div3=4\\).",
          "Multiply the blue part by the same factor: \\(4\\cdot4=16\\).",
        ],
      },
      {
        type: "open",
        question: "A population increases from 2,500 to 2,875. What is the percent increase?",
        answer: "\\(15\\%\\)",
        discussion: [
          "The increase is \\(2{,}875-2{,}500=375\\).",
          "Compare with the original: \\(\\frac{375}{2{,}500}\\cdot100\\%=15\\%\\).",
        ],
      },
      {
        type: "open",
        question: "Twelve workers complete a task in 15 days. Assuming inverse variation, how many days would 20 workers need?",
        answer: "\\(9\\) days",
        discussion: [
          "For inverse variation, workers × days stays constant.",
          "Set \\(12\\cdot15=20d\\). Then \\(d=180\\div20=9\\) days.",
        ],
      },
    ],
    additionalPractice: [
      {
        type: "open",
        question: "Find 25% of 72.",
        answer: "\\(18\\)",
        discussion: [
          "Convert 25% to \\(0.25\\) and calculate \\(0.25\\cdot72=18\\).",
        ],
      },
      {
        type: "open",
        question: "A car travels 180 miles in 3 hours. At the same rate, how far will it travel in 4.5 hours?",
        answer: "\\(270\\) miles",
        discussion: [
          "The rate is \\(180\\div3=60\\) miles per hour.",
          "Then \\(60\\cdot4.5=270\\) miles.",
        ],
      },
      {
        type: "open",
        question: "A mixture has acid to water ratio \\(2:7\\) and total mass 270 grams. How many grams of water are present?",
        answer: "\\(210\\) grams",
        discussion: [
          "There are \\(2+7=9\\) total parts, so each part is \\(270\\div9=30\\) grams.",
          "Water is 7 parts: \\(7\\cdot30=210\\) grams.",
        ],
      },
      {
        type: "open",
        question: "A price is increased by 10% and then decreased by 10%. Is the final price equal to the original price?",
        answer: "No; the final price is 1% less than the original.",
        discussion: [
          "Use multiplicative factors: \\(1.10\\cdot0.90=0.99\\).",
          "The final price is \\(99\\%\\) of the original, so it is 1% lower.",
        ],
      },
      {
        type: "open",
        question: "A recipe uses 2 cups of flour for 4 cookies. How many cups are needed for 30 cookies?",
        answer: "\\(15\\) cups",
        discussion: [
          "The recipe uses \\(2\\div4=\\frac12\\) cup per cookie.",
          "For 30 cookies, \\(30\\cdot\\frac12=15\\) cups.",
        ],
      },
      {
        type: "open",
        question: "One quantity is 40% less than \\(x\\), while another is 50% greater than \\(x\\). What is the ratio of the first quantity to the second?",
        answer: "\\(2:5\\)",
        discussion: [
          "The first quantity is \\(0.60x\\), and the second is \\(1.50x\\).",
          "The ratio is \\(0.60x:1.50x=0.60:1.50=2:5\\).",
        ],
      },
    ],
  },
};

function inactiveContent(sectionKey, page) {
  const title = page.title;
  const sectionLabel = sectionKey === "math" ? "SAT Math" : "SAT English / Verbal";
  return {
    eyebrow: `${sectionLabel} / ${page.number}`,
    title,
    subtitle: "This page is part of the learning map and will be opened when its lesson content is ready.",
    materi: [
      {
        judul: "Page structure ready",
        icon: "fa-hourglass-half",
        tipe: "basic",
        isi: [
          `This page already has the same structure as every lesson page: concept notes, examples, exercises, and discussion controls.`,
          {
            type: "note",
            content: "This lesson can be published when its content has been reviewed.",
          },
        ],
      },
      {
        judul: "Planned focus",
        icon: sectionKey === "math" ? "fa-square-root-variable" : "fa-language",
        tipe: "basic",
        isi: [
          `${sectionLabel} unit ${page.number} is reserved for: ${title}.`,
        ],
      },
    ],
    latihan: [],
    additionalPractice: [],
  };
}

function dummyQuestion(sectionKey, page, kind) {
  const sectionLabel = sectionKey === "math" ? "SAT Math" : sectionKey === "info" ? "SAT Information" : "SAT English / Verbal";
  const isAdditional = kind === "additional";

  return {
    type: "open",
    question: isAdditional
      ? `Before solving a new ${sectionLabel} question, what should you identify first?`
      : `What is the first useful step when beginning the ${sectionLabel} unit "${page.title}"?`,
    answer: "Identify what the question is asking and the information that matters.",
    discussion: [
      "Read the question carefully and name the quantity, claim, or skill being tested.",
      "Then choose a representation or strategy that matches the information given.",
    ],
    showSolutionButton: true,
  };
}

function pageData(sectionKey, page) {
  const localPageDataPath = path.join(pagesDir, "page_mat", page.id, "data.json");
  const content = ["page_mat_4", "page_mat_5"].includes(page.id) && fs.existsSync(localPageDataPath)
    ? JSON.parse(fs.readFileSync(localPageDataPath, "utf8"))
    : sectionKey === "info"
    ? infoContent[page.id]
    : sectionKey === "math"
      ? mathContent[page.id]
      : null;
  const source = content || inactiveContent(sectionKey, page);
  const latihan = (source.latihan?.length ? source.latihan : [dummyQuestion(sectionKey, page, "practice")])
    .map((question) => ({ showSolutionButton: true, ...question }));
  const additionalPractice = (source.additionalPractice?.length
    ? source.additionalPractice
    : [dummyQuestion(sectionKey, page, "additional")])
    .map((question) => ({ showSolutionButton: true, ...question }));

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
    ...source,
    latihan,
    additionalPractice,
  };
}

function pageIndex(sectionKey, page, data) {
  const title = data.title;
  const subtitle = data.subtitle;
  const sharedPath = "../../../shared";
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
      <p class="hero__eyebrow">${data.eyebrow}</p>
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
    <p>SAT Pradita / ${sectionKey} / ${page.number}</p>
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
  const sectionFolder = {
    info: "page_Info",
    math: "page_mat",
    english: "page_eng",
  }[sectionKey];

  if (!sectionFolder) {
    throw new Error(`Unknown section folder for "${sectionKey}"`);
  }

  const pageDir = path.join(pagesDir, sectionFolder, page.id);
  fs.mkdirSync(pageDir, { recursive: true });
  const data = pageData(sectionKey, page);
  writeFile(path.join(pageDir, "index.html"), pageIndex(sectionKey, page, data));
  writeFile(path.join(pageDir, "data.json"), `${JSON.stringify(data, null, 2)}\n`);
}

function createHubSupport(section) {
  const pageDir = path.join(pagesDir, section.key);
  fs.mkdirSync(pageDir, { recursive: true });
}

function main() {
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  for (const section of registry.sections || []) {
    createHubSupport(section);
    for (const page of section.pages || []) {
      createLessonPage(section.id, page);
    }
  }
  console.log("SAT page structure generated.");
}

main();
