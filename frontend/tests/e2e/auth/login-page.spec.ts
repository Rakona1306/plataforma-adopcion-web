/**
 * E2E test for the Auth page (login / register toggle), focused on the
 * social links section acceptance criteria (CA1–CA5) plus a smoke pass
 * over the rest of the page.
 *
 * Adjust ROUTE below to match wherever this page is actually mounted
 * (e.g. "/login", "/auth", "/(web)/auth"). Assumes Playwright's
 * @playwright/test runner with a configured baseURL.
 */
import { test, expect, type Page } from "@playwright/test";

const ROUTE = "/login"; // TODO: confirm actual route for AuthPage
const FACEBOOK_URL = "https://www.facebook.com/pawsadopt";

async function gotoAuthPage(page: Page) {
  await page.goto(ROUTE);
  // Wait for the login form heading so we know client hydration finished.
  await expect(
    page.getByRole("heading", { name: /bienvenido/i }),
  ).toBeVisible();
}

test.describe("Auth page — Social links section", () => {
  test.beforeEach(async ({ page }) => {
    await gotoAuthPage(page);
  });

  test("CA1 — shows 'Síguenos en:' and not the old 'O continúa con' text", async ({
    page,
  }) => {
    await expect(page.getByText("Síguenos en:")).toBeVisible();
    await expect(page.getByText("O continúa con")).toHaveCount(0);
  });

  test("CA2 — renders a vectorized Facebook icon, no emoji icons", async ({
    page,
  }) => {
    const socialLink = page.getByRole("link", { name: /facebook/i });
    await expect(socialLink).toBeVisible();

    // icon should be an inline SVG, not text/emoji
    const svgCount = await socialLink.locator("svg").count();
    expect(svgCount).toBeGreaterThan(0);

    const bodyText = await page.locator("body").innerText();
    for (const emoji of ["🚀", "👍", "❌", "🔗"]) {
      expect(bodyText).not.toContain(emoji);
    }
  });

  test("CA3 — Facebook link has correct href, target and rel", async ({
    page,
  }) => {
    const socialLink = page.getByRole("link", { name: /facebook/i });
    await expect(socialLink).toHaveAttribute("href", FACEBOOK_URL);
    await expect(socialLink).toHaveAttribute("target", "_blank");
    await expect(socialLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("CA3 — clicking the Facebook link opens a new tab to the official page", async ({
    page,
    context,
  }) => {
    const socialLink = page.getByRole("link", { name: /facebook/i });

    const [popup] = await Promise.all([
      context.waitForEvent("page"),
      socialLink.click(),
    ]);
    await popup.waitForLoadState("domcontentloaded").catch(() => {
      // Facebook may block automated navigation; the important assertion
      // is the target URL that was requested, checked below.
    });
    expect(popup.url()).toContain("facebook.com");
    await popup.close();
  });

  test("CA4 — only one social option is rendered (no redundant buttons)", async ({
    page,
  }) => {
    // Scope to the divider section's following sibling container to avoid
    // picking up unrelated links elsewhere on the page (e.g. nav, footer).
    const dividerLabel = page.getByText("Síguenos en:");
    const socialSection = dividerLabel
      .locator("xpath=../..")
      .locator("xpath=following-sibling::*[1]");
    const links = socialSection.getByRole("link");
    await expect(links).toHaveCount(1);
  });

  test("CA5 — has the styled rounded border container", async ({ page }) => {
    const socialLink = page.getByRole("link", { name: /facebook/i });
    await expect(socialLink).toHaveClass(/rounded-xl/);
    await expect(socialLink).toHaveClass(/border-slate-200/);
    await expect(socialLink).toHaveClass(/bg-white/);
  });

  test("CA5 — border color transitions to brand blue on hover", async ({
    page,
  }) => {
    const socialLink = page.getByRole("link", { name: /facebook/i });

    const borderColorBefore = await socialLink.evaluate(
      (el) => getComputedStyle(el).borderColor,
    );

    await socialLink.hover();
    // wait for the CSS transition (duration-200 ≈ 200ms) to settle
    await page.waitForTimeout(300);

    const borderColorAfter = await socialLink.evaluate(
      (el) => getComputedStyle(el).borderColor,
    );

    expect(borderColorAfter).not.toBe(borderColorBefore);
  });

  test("is reachable and activatable via keyboard", async ({ page }) => {
    const socialLink = page.getByRole("link", { name: /facebook/i });
    await socialLink.focus();
    await expect(socialLink).toBeFocused();
  });
});

test.describe("Auth page — smoke test around the social section", () => {
  test("toggling to Register and back keeps the page functional", async ({
    page,
  }) => {
    await gotoAuthPage(page);

    // Only one match while on the login view: the toggle button.
    await page
      .getByRole("button", { name: "Crear cuenta", exact: true })
      .click();

    // The submit button on LoginForm reads "Iniciar Sesión" (capital S),
    // while the toggle button that switches back reads "Iniciar sesión"
    // (lowercase s). During the AnimatePresence exit/enter transition
    // both can briefly coexist in the DOM, so match the toggle button
    // exactly (case-sensitive) instead of the earlier case-insensitive
    // regex, which matched both and violated Playwright's strict mode.
    const toggleToLogin = page.getByRole("button", {
      name: "Iniciar sesión",
      exact: true,
    });
    await expect(toggleToLogin).toBeVisible();

    // Wait for the 0.3s AnimatePresence transition to fully settle before
    // interacting again, avoiding a click on an exiting/animating node.
    await page.waitForTimeout(400);

    await toggleToLogin.click();
    await expect(page.getByText("Síguenos en:")).toBeVisible();
  });

  test("login form fields render alongside the social section", async ({
    page,
  }) => {
    await gotoAuthPage(page);

    await expect(page.getByPlaceholder("tu@email.com")).toBeVisible();
    await expect(page.getByPlaceholder("••••••••")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /iniciar sesión/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /facebook/i })).toBeVisible();
  });
});
