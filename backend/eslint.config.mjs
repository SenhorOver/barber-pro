// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier, // Disables ESLint rules that conflict with Prettier
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error", // Enforces Prettier formatting via ESLint
    },
  },
  {
    // Optional: Exclude build or generated files from linting
    ignores: ["dist/", "node_modules/"],
  },
];
