const mathJaxConfig = {
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
    processEscapes: true,
  },
  svg: { fontCache: "global" },
};

window.MathJax = window.MathJax || mathJaxConfig;
