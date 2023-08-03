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
  await page.getByLabel('Etunimi *').fill('Veikko');
  await page.getByLabel('Sukunimi *').fill('Suhonen');
  await page.getByLabel('Syntymäaika *').fill('1984-02-03');
  await page.getByLabel('Sähköposti').fill('veijo@gmail.com');
  await page.getByLabel('Kurssin nimi').fill('Dota 2 perusteet');
  await page.getByLabel('Ensimmäinen luento *').fill('2023-05-27');
  await page.getByLabel('Viimeinen luento/tentti *').fill('2023-05-19');
  await page.getByRole('button', { name: 'Lähetä käsiteltäväksi' }).click();
  await page.getByText('Työsopimuspyyntö lähetetty').click();
});

test('Fill full contract request form', async ({ page }) => {
  await page.getByLabel('Etunimi *').fill('Pekka');
  await page.getByLabel('Sukunimi *').fill('Perhonen');
  await page.getByLabel('Syntymäaika *').fill('1984-03-02');
  await page.getByLabel('Sähköposti').fill('peggoperhonen@buttermail.com');
  await page.getByLabel('Kurssin nimi').fill('Lentämisen perusteet');
  await page.getByLabel('Ensimmäinen luento *').fill('2024-01-08');
  await page.getByLabel('Viimeinen luento/tentti *').fill('2024-01-10');
  await page.getByLabel('Muu aikaväli').check();
  await page.getByLabel('Valitse alkupäivä *').fill('2023-06-01');
  await page.getByLabel('Valitse loppupäivä *').fill('2023-06-30');
  await page.getByRole('button', { name: 'Lähetä käsiteltäväksi' }).click();
  await page.getByText('Työsopimuspyyntö lähetetty').click();
})

test('User can login and gets the form prefilled', async ({ page }) => {
  await page.getByRole('link', { name: 'Kirjaudu' }).click();
  await expect(page.getByText('kirjautunut: topias.testaaja@helsinki.fi')).toBeVisible();
  await expect(page.getByLabel('Etunimi *')).toHaveValue("Topias")
  await expect(page.getByLabel('Sukunimi *')).toHaveValue("Testaaja")
  await expect(page.getByLabel('Syntymäaika *')).toHaveValue("1991-01-01")
});
