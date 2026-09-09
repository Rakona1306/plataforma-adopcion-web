import { test, expect } from "@playwright/test";

test.describe("Volunteer Page Acceptance Criteria", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/voluntariado");
  });

  test("CA2: Responsive layout and alignment for benefits cards", async ({
    page,
  }) => {
    const viewport = page.viewportSize();
    const isMobile = viewport ? viewport.width < 768 : false;

    // Usamos las clases únicas de la grilla para evitar colisiones con otras secciones
    const benefitsGrid = page
      .locator(".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4")
      .first();
    const cardContent = benefitsGrid
      .locator('[data-slot="card-content"]')
      .first();

    await expect(cardContent).toBeVisible();

    if (isMobile) {
      await expect(cardContent).toHaveClass(/text-center/);
      await expect(cardContent).toHaveClass(/items-center/);
    } else {
      await expect(cardContent).toHaveClass(/md:text-left/);
      await expect(cardContent).toHaveClass(/md:items-start/);
    }
  });

  test("CA3: Interactive FAQ accordion toggle", async ({ page }) => {
    const faqSection = page
      .locator("section")
      .filter({ hasText: "Preguntas Frecuentes" });
    const faqButtons = faqSection.locator("button");

    const firstFaq = faqButtons.nth(0);
    const firstChevron = firstFaq.locator("svg");
    await expect(firstChevron).toHaveClass(/rotate-180/);

    await firstFaq.click();
    await expect(firstChevron).not.toHaveClass(/rotate-180/);

    const secondFaq = faqButtons.nth(1);
    const secondChevron = secondFaq.locator("svg");
    await expect(secondChevron).not.toHaveClass(/rotate-180/);

    await secondFaq.click();
    await expect(secondChevron).toHaveClass(/rotate-180/);

    const secondFaqParent = secondFaq.locator("xpath=..");
    const answerContainer = secondFaqParent.locator("div.animate-fade-in");
    await expect(answerContainer).toBeVisible();
    await expect(answerContainer.locator("p")).toBeVisible();
  });
});
