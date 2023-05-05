import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Toppi/);
});

test('has työaikalaskuri', async ({ page }) => {
  await expect(page.getByRole('button')).toHaveText('Lähetä tarkistettavaksi')
});
