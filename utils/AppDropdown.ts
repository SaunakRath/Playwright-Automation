// import { Page } from '@playwright/test';

// export async function selectAppDropdown(
//   page: Page,
//   dropdownLocator: string,
//   value: string
// ) {

//   await page.locator(dropdownLocator).click();

//   const options = await page.locator(
//     'ul.ui-autocomplete:visible .ui-menu-item-wrapper'
//   ).allTextContents();

//   console.log('Options:', options);

//   await page.locator('.ui-menu-item-wrapper')
//     .filter({
//       hasText: new RegExp(`^${value}$`)
//     })
//     .first()
//     .click();

//   console.log(`✅ ${value} selected`);
// }

// import { Page } from '@playwright/test';

// export async function selectAppDropdown(
//   page: Page,
//   dropdownLocator: string,
//   value: string
// ) {

//   const dropdown = page.locator(dropdownLocator);

//   // Scroll to dropdown
//   await dropdown.scrollIntoViewIfNeeded();

//   // Open dropdown
//   await dropdown.click();

//   // Print all options
//   const options = await page.locator(
//     'ul.ui-autocomplete:visible .ui-menu-item-wrapper'
//   ).allTextContents();

//   console.log('Options:', options);

//   // Select option
//   const option = page.locator(
//     '.ui-menu-item-wrapper'
//   ).filter({
//     hasText: new RegExp(`^${value}$`)
//   }).first();

//   await option.scrollIntoViewIfNeeded();

//   await option.click();

//   console.log(`✅ ${value} selected`);
// }

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

  // Wait for dropdown options
  await page.waitForTimeout(1000);

  const options = await page.locator(
    'ul.ui-autocomplete:visible .ui-menu-item-wrapper'
  ).allTextContents();

  console.log('Options:', options);

  // Select option
  await page.locator(
    '.ui-menu-item-wrapper'
  ).filter({
    hasText: new RegExp(`^${value}$`)
  }).first().click();

  console.log(`✅ ${value} selected`);
}