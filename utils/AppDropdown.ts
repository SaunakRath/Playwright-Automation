import { Page } from '@playwright/test';

export async function selectAppDropdown(
  page: Page,
  dropdownLocator: string,
  value: string
) {

  const dropdown = page.locator(dropdownLocator);

  // Scroll to dropdown
  await dropdown.scrollIntoViewIfNeeded();

  // Open dropdown
  await dropdown.click();

  // Wait for dropdown options to appear
  await page.locator(
    'ul.ui-autocomplete:visible .ui-menu-item-wrapper'
  ).first().waitFor({
    state: 'visible'
  });

  // Print options
  const options = await page.locator(
    'ul.ui-autocomplete:visible .ui-menu-item-wrapper'
  ).allTextContents();

  console.log('Options:', options);

  // Select value
  await page.locator(
    'ul.ui-autocomplete:visible .ui-menu-item-wrapper'
  ).filter({
    hasText: value
  }).first().click();

  console.log(`✅ ${value} selected`);
}