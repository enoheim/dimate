module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: "./tsconfig.json",
    sourceType: "module"
  },
  plugins: [
    "react",
    "react-hooks",
    "jest",
    "@typescript-eslint"
  ],
  root: true,
  rules: {},
  settings: {
    react: {
      version: "detect"
    }
  }
}
