import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Workhour calculator', async ({ page }) => {
  const hourInput = page.locator('div').filter({ hasText: /^tuntia$/ }).getByPlaceholder('0')
  await hourInput.fill('42')
  await expect(page.getByText('42 tuntia')).toBeVisible()
});

test('Full calculator', async ({ page }) => {
  await page.locator('div').filter({ hasText: /^tuntia$/ }).getByPlaceholder('0').click();
  await page.locator('div').filter({ hasText: /^tuntia$/ }).getByPlaceholder('0').fill('42');
  await page.getByText('42 tuntia').click();
  await page.getByRole('combobox').filter({ hasText: 'Toistuva' }).click();
  await page.getByRole('option', { name: 'Uusi' }).click();
  await page.getByRole('combobox').filter({ hasText: '1-3 op.' }).click();
  await page.getByRole('option', { name: '10 op. tai enemmän' }).click();
  await page.getByRole('combobox').filter({ hasText: '1-30' }).click();
  await page.getByRole('option', { name: 'yli 120' }).click();
  await page.getByText('Työaika yhteensä 172 tuntia').click();
  await page.locator('div').filter({ hasText: /^€\/h$/ }).getByPlaceholder('0').click();
  await page.locator('div').filter({ hasText: /^€\/h$/ }).getByPlaceholder('0').fill('55');
  await page.getByText('Palkkio yhteensä 172 tuntia X 55 €/h = 9460 €').click();
});

test('Fill required contract request form', async ({ page }) => {
  await page.getByLabel('Etunimi *').click();
  await page.getByLabel('Etunimi *').fill('Veikko');
  await page.getByLabel('Sukunimi *').click();
  await page.getByLabel('Sukunimi *').fill('Suhonen');
  await page.getByLabel('Syntymäaika *').fill('1984-02-03');
  await page.getByPlaceholder('Anna sähköpostisi').click();
  await page.getByPlaceholder('Anna sähköpostisi').fill('veijo@gmail.com');
  await page.getByPlaceholder('Anna kurssin nimi').click();
  await page.getByPlaceholder('Anna kurssin nimi').fill('Dota 2 perusteet');
  await page.getByLabel('Ensimmäinen luento *').fill('2023-05-27');
  await page.getByLabel('Viimeinen luento/tentti *').fill('2023-05-19');
  await page.getByRole('button', { name: 'Lähetä tarkistettavaksi' }).click();
  await page.getByText('Lähetetään työsopimuspyyntöä').click();
});

test('Fill full contract request form', async ({ page }) => {
  await page.getByLabel('Etunimi *').click();
  await page.getByLabel('Etunimi *').fill('Pekka');
  await page.getByLabel('Sukunimi *').click();
  await page.getByLabel('Sukunimi *').fill('Perhonen');
  await page.getByLabel('Syntymäaika *').fill('1984-02-03');
  await page.getByPlaceholder('Anna sähköpostisi').click();
  await page.getByPlaceholder('Anna sähköpostisi').fill('peggaperhonen@gmail.com');
  await page.getByPlaceholder('Anna kurssin nimi').click();
  await page.getByPlaceholder('Anna kurssin nimi').fill('Lentämisen perusteet');
  await page.getByLabel('Ensimmäinen luento *').fill('2023-06-12');
  await page.getByLabel('Viimeinen luento/tentti *').fill('2023-06-29');
  await page.getByLabel('Eri kuin kurssin aikataulu').check();
  await page.getByLabel('Alkupäivä *').fill('2023-06-13');
  await page.getByLabel('Loppupäivä *').fill('2023-06-30');
  await page.getByRole('button', { name: 'Lähetä tarkistettavaksi' }).click();
  await page.getByText('Lähetetään työsopimuspyyntöä').click();
})
