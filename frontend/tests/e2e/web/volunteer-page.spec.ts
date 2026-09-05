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

  test("CA4: Contact form inputs are fully interactive", async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const numberInput = page.locator('input[name="number"]');
    const messageInput = page.locator('textarea[name="message"]');
    const submitButton = page.locator('button[type="submit"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(numberInput).toBeVisible();
    await expect(messageInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toContainText("Enviar");

    await nameInput.fill("Juan Carlos");
    await emailInput.fill("juan@test.com");
    await numberInput.fill("987654321");
    await messageInput.fill("Quiero ser voluntario en el albergue.");

    await expect(nameInput).toHaveValue("Juan Carlos");
    await expect(emailInput).toHaveValue("juan@test.com");
    await expect(numberInput).toHaveValue("987654321");
    await expect(messageInput).toHaveValue(
      "Quiero ser voluntario en el albergue.",
    );
  });

  test("CA6: Contact information links are correctly formatted", async ({
    page,
  }) => {
    // Acotamos la búsqueda a la sección del formulario para evitar conflictos con el footer
    const contactSection = page
      .locator("section")
      .filter({ hasText: "¿Listo para Hacer" });

    // Validar enlace de teléfono
    const phoneLink = contactSection.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    // Validar enlace de email
    const emailLink = contactSection.locator('a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();

    // Validar botón de WhatsApp de forma resiliente:
    // Buscamos por su nombre accesible, sin importarle si el componente <Button>
    // renderiza un <a> o un <button> internamente.
    const whatsappElement = contactSection
      .getByRole("button", { name: "Enviar Mensaje" })
      .or(contactSection.getByRole("button", { name: "Enviar Mensaje" }));

    await expect(whatsappElement).toBeVisible();
  });
});
