export default [
  {
    ignores: [".next/**", "node_modules/**", "*.config.ts", "**/*.ts", "**/*.tsx"],
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
  },
]
