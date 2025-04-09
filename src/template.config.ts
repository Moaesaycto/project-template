import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';

const languageDefs = {
  python: () => import('react-syntax-highlighter/dist/esm/languages/prism/python'),
  // javascript: () => import('react-syntax-highlighter/dist/esm/languages/prism/javascript'),
  // typescript: () => import('react-syntax-highlighter/dist/esm/languages/prism/typescript'),
  // bash: () => import('react-syntax-highlighter/dist/esm/languages/prism/bash'),
  // json: () => import('react-syntax-highlighter/dist/esm/languages/prism/json'),
};

Promise.all(
  Object.entries(languageDefs).map(async ([name, importer]) => {
    const mod = await importer();
    SyntaxHighlighter.registerLanguage(name, mod.default);
  })
);

export default SyntaxHighlighter;
