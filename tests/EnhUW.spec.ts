import { test, expect } from '@playwright/test';
import { selectDropdownValue } from '../utils/dropdownUtils';
import { selectAppDropdown } from '../utils/AppDropdown';

test('HDFC Life TEBT Journey', async ({ page }) => {

  // =========================
  // LOGIN
  // =========================

  await page.goto(
    'https://awsmuat.hdfclife.com/TEBTParPortal/portal.do?_portalid=sec&_pageid=sec_loginPage'
  );



  await page.locator('#sec\\.userid').fill('00800959');
  await page.locator('#password').fill('Test@123');

  await page.locator('#_loginbtn').click();

  // Wait for dashboard after login
  await page.waitForLoadState('networkidle');

  // Validate Login
  const loginError = page.locator('text=Invalid User ID / Password');

  if (await loginError.isVisible().catch(() => false)) {
    throw new Error('❌ LOGIN FAILED');
  }

  console.log('✅ LOGIN SUCCESS');

  // =========================
  // NAVIGATION
  // =========================

  await page.locator('div.name', {
    hasText: 'Approvals'
  }).click();

  await page.waitForLoadState('networkidle');

  await page.locator(':text-is("1100028050501")').click();

  await page.waitForTimeout(10000);
console.log('----- Enhanced UW Section opened successfully----');

await page.locator(
  "//input[@id='HDFCPart2Section.IdentificationMark']"
).fill('Test');

console.log('✅ Identification Mark entered successfully');


// await selectAppDropdown(
//   page,
//   "//div[@id='designation']//button[@title='Show All Items']",
//   'Assistant Manager'
// );

const count = await page.locator(
  "//select[@id='HDFCPart2Section.OccupationSection.OccupationMainSection.Occupation']/following-sibling::button"
).count();

console.log("Dropdown count:", count);



await selectAppDropdown(
  page,
  "(//select[@id='HDFCPart2Section.OccupationSection.OccupationMainSection.Occupation']/following-sibling::button)[1]",
  "Assistant Manager"
);
console.log('✅ Assistant Manager selected successfully');

await page.locator(
  'ul.ui-autocomplete:visible .ui-menu-item-wrapper'
).filter({
  hasText: /^HDFC$/
}).first().click();

console.log('✅ HDFC selected');

});