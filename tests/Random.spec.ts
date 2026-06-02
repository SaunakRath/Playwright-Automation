import { test, expect } from '@playwright/test';

test('Verify Playwright website search', async ({ page }) => {
  await page.goto('https://playwright.dev');

  await page.getByRole('link', { name: 'Docs' }).click();

  await expect(page).toHaveTitle(/Playwright/);
});