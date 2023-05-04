import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Toppi/);
});

test('has työaikalaskuri', async ({ page }) => {
  await expect(page.getByRole('button')).toHaveText('Lähetä tarkistettavaksi')
});
