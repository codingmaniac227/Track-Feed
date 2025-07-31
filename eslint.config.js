import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended, // ✅ ESLint's built-in recommended rules
  prettier,               // ✅ Turns off rules that conflict with Prettier
  {
    files: ["src/**/*.js", "vite.config.js"], // ✅ Add Vite config file
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "warn"
    },
  },
];
