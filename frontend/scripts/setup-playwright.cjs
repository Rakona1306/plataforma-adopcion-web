#!/usr/bin/env node
/**
 * Instala los navegadores de Playwright con la lógica correcta
 * según el entorno donde se ejecute (CI, Docker, local Linux/Mac/Windows).
 *
 * Uso: node scripts/setup-playwright.js
 * O como script de package.json: "pretest:e2e": "node scripts/setup-playwright.js"
 */

const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");

const BROWSER = "chromium"; // cambia o agrega ("chromium firefox webkit") según necesites

function run(cmd) {
    console.log(`\n▶ ${cmd}`);
    execSync(cmd, { stdio: "inherit" });
}

function isCI() {
    // Cubre GitHub Actions, GitLab CI, CircleCI, Jenkins, Travis, etc.
    return !!(
        process.env.CI ||
        process.env.GITHUB_ACTIONS ||
        process.env.GITLAB_CI ||
        process.env.JENKINS_URL ||
        process.env.TRAVIS
    );
}

function isDocker() {
    // Heurística estándar: existe /.dockerenv o cgroup menciona "docker"
    try {
        if (fs.existsSync("/.dockerenv")) return true;
        const cgroup = fs.readFileSync("/proc/self/cgroup", "utf8");
        return cgroup.includes("docker") || cgroup.includes("containerd");
    } catch {
        return false; // no es Linux o no se pudo leer -> asumimos que no
    }
}

function hasPasswordlessSudo() {
    try {
        execSync("sudo -n true", { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

function browsersAlreadyInstalled() {
    try {
        // playwright expone esto desde v1.28+: no falla si ya está todo instalado
        execSync(`pnpm exec playwright install ${BROWSER} --dry-run`, { stdio: "pipe" });
        return true;
    } catch {
        return false;
    }
}

function main() {
    const platform = os.platform(); // 'linux' | 'darwin' | 'win32'
    console.log(`Entorno detectado: platform=${platform} ci=${isCI()} docker=${isDocker()}`);

    // 1. CI o Docker: entorno descartable con privilegios -> instalación completa sin preguntar
    if (isCI() || isDocker()) {
        console.log("→ CI/Docker detectado: instalando navegador + dependencias del sistema.");
        run(`pnpm exec playwright install --with-deps ${BROWSER}`);
        return;
    }

    // 2. Mac o Windows: --with-deps no aplica (esas libs son solo de Linux)
    if (platform !== "linux") {
        console.log("→ macOS/Windows: instalando navegador (no requiere libs del sistema).");
        run(`pnpm exec playwright install ${BROWSER}`);
        return;
    }

    // 3. Linux local: instalar el navegador siempre es seguro (no requiere sudo)
    console.log("→ Linux local: instalando navegador.");
    run(`pnpm exec playwright install ${BROWSER}`);

    // Las dependencias del sistema (libnspr4, libnss3, etc.) sí requieren sudo.
    // Solo las instalamos automáticamente si hay sudo sin contraseña disponible;
    // si no, avisamos y dejamos el comando exacto para que el dev lo corra.
    const manualHint =
        "\n⚠ Si los tests fallan con \"error while loading shared libraries\" " +
        `(ej. libnspr4.so), corre manualmente:\n\n    sudo env "PATH=$PATH" pnpm exec playwright install-deps ${BROWSER}\n`;

    if (hasPasswordlessSudo()) {
        console.log("→ sudo sin contraseña disponible: instalando dependencias del sistema.");
        try {
            // sudo limpia el PATH por defecto, así que si pnpm/node viven en un path
            // gestionado por nvm (o similar), "sudo pnpm" no lo encuentra
            // ("sudo: pnpm: command not found"). Le pasamos el PATH actual explícitamente.
            run(`sudo env "PATH=$PATH" pnpm exec playwright install-deps ${BROWSER}`);
        } catch (err) {
            // No abortamos: el navegador ya se instaló arriba, esto solo instala
            // libs del sistema que quizá ya estén presentes o se instalen a mano.
            console.warn("\n⚠ No se pudieron instalar las dependencias del sistema automáticamente.");
            console.warn(manualHint);
        }
    } else {
        console.warn("\n⚠ No se detectó sudo sin contraseña.");
        console.warn(manualHint);
    }
}

main();