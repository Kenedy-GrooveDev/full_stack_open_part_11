const js = require("@eslint/js");
const react = require("eslint-plugin-react");
const jest = require("eslint-plugin-jest");
const globals = require("globals");

module.exports = [
  {
    ignores: [
      "webpack.config.js",
      "eslint.config.js",
      ".eslintrc.js",
      "node_modules/**",
      "dist/**",
      "playwright-report/**",
      "test-results/**",
      "blob-report/**",
      "playwright/.cache/**",
    ],
  },
  js.configs.recommended,

  // Playwright config and E2E tests
  {
    files: ["playwright.config.js", "tests/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // Allows process.env
      },
    },
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
    },
  },

  // Express production server
  {
    files: ["app.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off",
    },
  },

  // React source, Jest unit tests, and Jest setup
  {
    files: ["src/**/*.{js,jsx}", "test/**/*.{js,jsx}", "jest.setup.js"],
    plugins: {
      react,
      jest,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off",
      "react/prop-types": "off",
    },
  },
];
