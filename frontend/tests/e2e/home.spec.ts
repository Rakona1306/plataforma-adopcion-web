import { test, expect } from '@playwright/test';

test('la aplicación debe cargar correctamente', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL('/');
});