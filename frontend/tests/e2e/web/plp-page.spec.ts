import { test, expect } from "@playwright/test";

/**
 * ⚠️ SUPUESTOS A VALIDAR ANTES DE CORRER ESTA SUITE:
 *
 * 1. Ruta de la página: se asume "/mascotas". Ajusta PLP_ROUTE si tu
 *    ruta real es otra (ej. "/pets", "/adopta", etc.).
 * 2. Estos tests, salvo el de "estado de error", NO mockean el backend:
 *    siguen el mismo patrón que volunteer-page.spec.ts, es decir, corren
 *    contra un servidor real (dev/test) con datos existentes. Si tu
 *    entorno de e2e no tiene datos sembrados, algunos asserts sobre
 *    resultados podrían necesitar ajuste.
 * 3. Para el test de "estado de error" se intercepta cualquier request
 *    que contenga la palabra "pet" en la URL. Si tu endpoint tiene otro
 *    nombre, actualiza el glob en `page.route(...)`.
 */

const PLP_ROUTE = "/mascotas";

test.describe("SISTE-20 - PLP", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLP_ROUTE);
  });

  test("muestra el encabezado y el buscador", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Conoce a nuestras mascotas/i }),
    ).toBeVisible();

    const searchInput = page.getByPlaceholder(
      "Busca por nombre, raza o característica...",
    );
    await expect(searchInput).toBeVisible();
  });

  test("muestra skeletons de carga antes de que lleguen los datos", async ({
    page,
  }) => {
    // Interceptamos la primera respuesta del listado para retrasarla y
    // así poder capturar el estado de carga de forma determinística.
    await page.route(/pet/i, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.continue();
    });

    await page.reload();

    const skeletons = page.locator(".mantine-Skeleton-root");
    await expect(skeletons.first()).toBeVisible();
  });

  test("permite escribir en el buscador y refleja el valor ingresado", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder(
      "Busca por nombre, raza o característica...",
    );

    await searchInput.fill("labrador");
    await expect(searchInput).toHaveValue("labrador");
  });

  test("muestra el conteo total de mascotas una vez finalizada la carga", async ({
    page,
  }) => {
    const countText = page.getByText(/Mostrando \d+ mascotas/);
    await expect(countText).toBeVisible({ timeout: 10_000 });
  });

  test("el selector de orden permite cambiar el criterio de ordenamiento", async ({
    page,
  }) => {
    const sortSelect = page.getByTestId("sort-select");
    await expect(sortSelect).toBeVisible();
    await expect(sortSelect).toHaveValue("Recomendados");

    await sortSelect.click();
    await page.getByRole("option", { name: "Nombre (A - Z)" }).click();

    await expect(sortSelect).toHaveValue("Nombre (A - Z)");
  });

  test("muestra tarjetas de mascotas o el estado vacío, nunca ambos a la vez", async ({
    page,
  }) => {
    await page.waitForSelector("text=/Mostrando \\d+ mascotas/", {
      timeout: 10_000,
    });

    const grid = page.locator(
      ".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4",
    );
    const emptyState = page.getByText("No encontramos mascotas");

    const hasCards = (await grid.locator("> *").count()) > 0;
    const isEmpty = await emptyState.isVisible().catch(() => false);

    expect(hasCards !== isEmpty || (!hasCards && isEmpty)).toBeTruthy();
    expect(hasCards || isEmpty).toBeTruthy();
  });

  test("una búsqueda sin coincidencias muestra el estado vacío con su mensaje", async ({
    page,
  }) => {
    // Se asume que este término no coincide con ninguna mascota sembrada.
    const searchInput = page.getByPlaceholder(
      "Busca por nombre, raza o característica...",
    );
    await searchInput.fill("zzzzzznoexiste9999");

    await expect(page.getByText("No encontramos mascotas")).toBeVisible({
      timeout: 10_000,
    });
    await expect(
      page.getByText("Intenta con otros criterios de búsqueda o filtros"),
    ).toBeVisible();
  });

  test("la paginación permite avanzar de página cuando hay más de una disponible", async ({
    page,
  }) => {
    await page.waitForSelector("text=/Mostrando \\d+ mascotas/", {
      timeout: 10_000,
    });

    const pageTwoButton = page.getByRole("button", { name: "2" });
    const hasMultiplePages = await pageTwoButton.isVisible().catch(() => false);

    test.skip(
      !hasMultiplePages,
      "Solo hay una página de resultados disponible",
    );

    const firstCardBefore = page
      .locator(".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 > *")
      .first();
    const beforeText = await firstCardBefore.textContent();

    await pageTwoButton.click();
    await expect(pageTwoButton).toHaveAttribute("data-active", "true");

    const firstCardAfter = page
      .locator(".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 > *")
      .first();
    await expect(firstCardAfter).not.toHaveText(beforeText ?? "");
  });

  test("muestra el estado de error con opciones para volver al inicio o reintentar", async ({
    page,
  }) => {
    await page.route(/pet/i, (route) =>
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "Internal Server Error" }),
      }),
    );

    await page.reload();

    await expect(
      page.getByText("Hemos tenido algunos problemas..."),
    ).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Vuelva a intentarlo mas tarde")).toBeVisible();

    const homeLink = page.getByRole("link", { name: "Ir a Inicio" });
    const retryButton = page.getByRole("button", { name: "Intentar denuevo" });

    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/");
    await expect(retryButton).toBeVisible();
  });
});
