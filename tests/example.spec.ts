import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Toppi/);
});

test('has työaikalaskuri', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByRole('button')).toHaveText('Lähetä tarkistettavaksi')
});
