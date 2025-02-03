export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["fix", "feat", "chore", "docs", "style", "refactor", "test"],
    ],
    "subject-case": [0, "never", []], // Permite qualquer formato no assunto
  },
};
