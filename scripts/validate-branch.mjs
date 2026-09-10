import { execSync } from "node:child_process";

const branch = execSync("git branch --show-current")
  .toString()
  .trim();

const branchRegex =
  /^(feat|fix|refactor|chore|docs|test|style|perf)\/[A-Z]+-[0-9]+-[a-z0-9-]+$/;

if (!branchRegex.test(branch)) {
  console.error("\n❌ Nombre de rama inválido\n");

  console.error(`Rama actual: ${branch}`);

  console.error("\nFormato permitido:");
  console.error("  <tipo>/<TICKET>-<descripcion>\n");

  console.error("Ejemplos:");
  console.error("  feat/SISTE-16-login");
  console.error("  fix/SISTE-25-error-token");
  console.error("  refactor/SISTE-30-clean-architecture");
  console.error("  chore/SISTE-40-configuracion\n");

  process.exit(1);
}

console.log(`==== ✅ Rama válida: ${branch} ====`);