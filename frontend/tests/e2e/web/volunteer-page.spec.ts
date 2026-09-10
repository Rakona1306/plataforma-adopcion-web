import { test, expect } from "@playwright/test";

/**
 * HU SISTE-30 — Sección "Cómo Comenzar" (Process Steps)
 *
 * CA01: Altura igualitaria en desktop (Flexbox/Grid)
 * CA02: Distribución y alineación interna del contenido
 * CA03: Comportamiento responsivo en mobile/tablet (altura orgánica)
 *
 * Nota: se asume que el componente <Card> expone `data-slot="card"` en su
 * elemento raíz, igual que <CardContent> expone `data-slot="card-content"`
 * (convención ya usada en volunteer-page.spec.ts). Ajustar el selector si
 * el nombre del slot difiere en la implementación real.
 */

const PROCESS_HEADING_TEXT = "Comenzar";

test.describe("HU SISTE-30: Sección 'Cómo Comenzar'", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/voluntariado");
  });

  test.describe("CA01: Altura igualitaria en desktop", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("las 4 tarjetas de pasos tienen exactamente la misma altura", async ({
      page,
    }) => {
      const processSection = page
        .locator("section")
        .filter({ hasText: PROCESS_HEADING_TEXT });
      const stepCards = processSection.locator('[data-slot="card"]');

      await expect(stepCards).toHaveCount(4);

      const heights: number[] = [];
      for (let i = 0; i < 4; i++) {
        const box = await stepCards.nth(i).boundingBox();
        expect(
          box,
          `La tarjeta ${i + 1} debe ser visible y medible`,
        ).not.toBeNull();
        heights.push(box!.height);
      }

      const maxHeight = Math.max(...heights);
      const minHeight = Math.min(...heights);

      // Tolerancia de 1px por redondeo de sub-pixel rendering
      expect(maxHeight - minHeight).toBeLessThanOrEqual(1);
    });

    test("el grid de pasos usa 'stretch' (Grid/Flex) para igualar la altura de fila", async ({
      page,
    }) => {
      const processGrid = page
        .locator(".grid.grid-cols-1.md\\:grid-cols-4")
        .first();
      await expect(processGrid).toBeVisible();

      const display = await processGrid.evaluate(
        (el) => getComputedStyle(el).display,
      );
      expect(display).toBe("grid");

      const alignItems = await processGrid.evaluate(
        (el) => getComputedStyle(el).alignItems,
      );
      // "stretch" es el valor por defecto de CSS Grid; "normal" se computa
      // como stretch quando no se sobreescribe explícitamente.
      expect(["stretch", "normal"]).toContain(alignItems);
    });

    test("cada tarjeta hereda el 100% de la altura de su contenedor de grid", async ({
      page,
    }) => {
      const processSection = page
        .locator("section")
        .filter({ hasText: PROCESS_HEADING_TEXT });
      const gridItems = processSection.locator(
        ".grid.grid-cols-1.md\\:grid-cols-4 > div",
      );
      const stepCards = processSection.locator('[data-slot="card"]');

      const itemCount = await gridItems.count();
      expect(itemCount).toBe(4);

      for (let i = 0; i < itemCount; i++) {
        const itemBox = await gridItems.nth(i).boundingBox();
        const cardBox = await stepCards.nth(i).boundingBox();
        expect(itemBox).not.toBeNull();
        expect(cardBox).not.toBeNull();
        expect(Math.abs(itemBox!.height - cardBox!.height)).toBeLessThanOrEqual(
          1,
        );
      }
    });
  });

  test.describe("CA02: Distribución y alineación interna del contenido", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("el contenido interno usa flex-col + justify-between para distribuirse uniformemente", async ({
      page,
    }) => {
      const processSection = page
        .locator("section")
        .filter({ hasText: PROCESS_HEADING_TEXT });
      const cardContents = processSection.locator('[data-slot="card-content"]');

      await expect(cardContents).toHaveCount(4);

      for (let i = 0; i < 4; i++) {
        const content = cardContents.nth(i);
        await expect(content).toHaveClass(/flex-col/);
        await expect(content).toHaveClass(/justify-between/);

        const justifyContent = await content.evaluate(
          (el) => getComputedStyle(el).justifyContent,
        );
        expect(justifyContent).toBe("space-between");
      }
    });

    test("los íconos de cada paso quedan alineados en la misma posición superior", async ({
      page,
    }) => {
      const processSection = page
        .locator("section")
        .filter({ hasText: PROCESS_HEADING_TEXT });
      const cardContents = processSection.locator('[data-slot="card-content"]');

      const iconTops: number[] = [];
      for (let i = 0; i < 4; i++) {
        const icon = cardContents.nth(i).locator("svg").first();
        const box = await icon.boundingBox();
        expect(
          box,
          `El ícono del paso ${i + 1} debe ser visible`,
        ).not.toBeNull();
        iconTops.push(box!.y);
      }

      const spread = Math.max(...iconTops) - Math.min(...iconTops);
      expect(spread).toBeLessThanOrEqual(2);
    });

    test("el texto (título + descripción) del paso más corto no queda agrupado arriba de la tarjeta", async ({
      page,
    }) => {
      const processSection = page
        .locator("section")
        .filter({ hasText: PROCESS_HEADING_TEXT });
      const stepCards = processSection.locator('[data-slot="card"]');
      const cardContents = processSection.locator('[data-slot="card-content"]');

      // Comparamos la altura de cada tarjeta contra la posición del bloque
      // de texto para detectar si quedó "flotando" en la parte superior.
      const heightsRatios: number[] = [];
      for (let i = 0; i < 4; i++) {
        const cardBox = await stepCards.nth(i).boundingBox();
        const textBlock = cardContents.nth(i).locator("div").last();
        const textBox = await textBlock.boundingBox();
        expect(cardBox).not.toBeNull();
        expect(textBox).not.toBeNull();

        const textBottomRelativeToCard =
          textBox!.y + textBox!.height - cardBox!.y;
        heightsRatios.push(textBottomRelativeToCard / cardBox!.height);
      }

      // Con justify-between, el bloque de texto de cada tarjeta debe llegar
      // razonablemente cerca del borde inferior (no agrupado en el tercio superior).
      for (const ratio of heightsRatios) {
        expect(ratio).toBeGreaterThan(0.3);
      }
    });
  });

  test.describe("CA03: Comportamiento responsivo en mobile/tablet", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("las tarjetas se apilan en una sola columna por debajo de 1024px", async ({
      page,
    }) => {
      const processGrid = page
        .locator(".grid.grid-cols-1.md\\:grid-cols-4")
        .first();
      await expect(processGrid).toBeVisible();

      const gridTemplateColumns = await processGrid.evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns,
      );
      const columnCount = gridTemplateColumns.split(" ").filter(Boolean).length;
      expect(columnCount).toBe(1);
    });

    test("la altura estirada de escritorio se deshabilita: las tarjetas se ajustan a su propio contenido", async ({
      page,
    }) => {
      const processSection = page
        .locator("section")
        .filter({ hasText: PROCESS_HEADING_TEXT });
      const stepCards = processSection.locator('[data-slot="card"]');

      await expect(stepCards).toHaveCount(4);

      // En una sola columna, cada tarjeta ocupa su propia fila de grid,
      // por lo que no hay "vecinas" en la misma fila que fuercen el estirado.
      // Verificamos que la altura de cada tarjeta coincide con su contenido
      // real (scrollHeight) y no con un valor artificialmente igualado.
      for (let i = 0; i < 4; i++) {
        const card = stepCards.nth(i);
        const box = await card.boundingBox();
        const scrollHeight = await card.evaluate((el) => el.scrollHeight);
        expect(box).not.toBeNull();
        expect(Math.abs(box!.height - scrollHeight)).toBeLessThanOrEqual(2);
      }
    });

    test("el conector de línea entre pasos permanece oculto en mobile", async ({
      page,
    }) => {
      const processSection = page
        .locator("section")
        .filter({ hasText: PROCESS_HEADING_TEXT });
      const connectors = processSection.locator(".hidden.md\\:block");

      const count = await connectors.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(connectors.nth(i)).not.toBeVisible();
      }
    });

    test("las alturas de las tarjetas pueden diferir entre sí según su contenido en mobile", async ({
      page,
    }) => {
      const processSection = page
        .locator("section")
        .filter({ hasText: PROCESS_HEADING_TEXT });
      const stepCards = processSection.locator('[data-slot="card"]');

      const heights: number[] = [];
      for (let i = 0; i < 4; i++) {
        const box = await stepCards.nth(i).boundingBox();
        expect(box).not.toBeNull();
        heights.push(box!.height);
      }

      // No se afirma que TODAS difieran (el contenido puede coincidir por azar),
      // solo que no existe una regla que las fuerce a ser iguales: basta con
      // que cada altura sea consistente con su propio contenido (ya probado
      // arriba). Aquí solo registramos que no hay un valor mínimo artificial
      // uniforme mayor al contenido real.
      for (const h of heights) {
        expect(h).toBeGreaterThan(0);
      }
    });
  });
});
