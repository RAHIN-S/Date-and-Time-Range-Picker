module.exports = {
  root: true,

  env: {
    browser: true,
    es2020: true,
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
  ],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],

  settings: {
    react: {
      version: "detect",
    },
  },

  rules: {
    /* Safety */
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],

    /* React */
    "react/react-in-jsx-scope": "off",
  },
};
