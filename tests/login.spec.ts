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
 
// Click My Quote
await page.locator('#pos_myquotePage').click();

console.log('✅ My Quote clicked');

// Wait some time for page rendering
await page.waitForTimeout(10000);

// Wait for Search Icon
await page.locator('#searchicon').waitFor({
  state: 'attached',
  timeout: 120000
});

// Scroll into view
await page.locator('#searchicon')
  .scrollIntoViewIfNeeded();

// Click Search Icon
await page.locator('#searchicon').click();

console.log('✅ Search Icon clicked');


await page.waitForLoadState('networkidle');  

// =========================
// SEARCH LEAD
// =========================

// Wait for Lead ID field
await page.locator('#leadid').waitFor({
  state: 'visible',
  timeout: 60000
});

// Enter Lead ID
await page.locator('#leadid')
  .fill('1-101738637103');

console.log('✅ Lead ID entered');

// Open Lead Status dropdown

await page.locator('#status').locator('option').nth(8);

console.log('✅ Lead Status selected');

// Click Search
await page.locator('#leadSearchButton')
  .click();

console.log('✅ Search button clicked');

  // =========================
  // SELECT LEAD
  // =========================

  
  const lead = page
    .locator('#rowdata-searchlead a')
    .first();

  await lead.waitFor({
    state: 'visible'
  });

  await lead.click({ force: true });

  // Wait for suitability page
  await page.waitForLoadState('networkidle');
  console.log('✅ Lead Opened Successfully');

 
await selectDropdownValue(
  page,
  'sm_bandhan_lifestage_id',
  'Young & Single'
);
console.log('✅ young and single option selected successfully');


await selectDropdownValue(
  page,
  'sm_bandhan_protneeds_id',
  'Lumpsum Needs - Dream Home / Car / Funding Start up'
);
console.log('✅ Lumpsum Needs - Dream Home / Car / Funding Start up option selected successfully');


await selectDropdownValue(
  page,
  'sm_bandhan_invdecline_id',
  "I'm willing to accept moderate declines"
);
console.log("✅ I'm willing to accept moderate declines option selected successfully");

// Investment Objective
await selectDropdownValue(
  page,
  'sm_bandhan_invobjec_id',
  'Defensive'
);
console.log('✅ Defensive option selected successfully');

// Risk Association
await selectDropdownValue(
  page,
  'sm_bandhan_riskasso_id',
  'Oppurtunity'
);
console.log('✅ Oppurtunity option selected successfully');


// Education
await selectDropdownValue(
  page,
  'sm_bandhan_education_id',
  'BAC'
);
console.log('✅ BAC option selected successfully');


// Enter Annual Income
await page.locator(
  '#sm_bandhan_newannualincome_id'
).fill('900000');
console.log('✅ Annual Income entered successfully');

// Enter Annual Expense
await page.locator(
  '#sm_bandhan_annualexpense_id'
).fill('500000');
console.log('✅ Annual Expense entered successfully');

await page.waitForTimeout(3000);


await page.locator('span')
  .filter({ hasText: 'Submit' })
  .first()
  .click();
console.log('✅ Submit button clicked');


// Click Proceed Button
await page.locator(
  'input[onclick="proceedBandhanPopupquote()"]'
).click();
console.log('✅ Proceed button clicked');

//Qni Page
await page.waitForLoadState('networkidle');

console.log('✅ Navigated to QnI page successfully');

// Scroll down little
await page.mouse.wheel(0, 1000);

// ====================================
// QNI PAGE
// ====================================

// Scroll down
await page.mouse.wheel(0, 1000);

// Click YES button
await page.locator(
  "input[value='Yes'][name='bandhan_option']"
).click();

console.log('✅ Yes button clicked');

// Wait popup
await page.locator(
  '.bandhanNonRecomProd'
).waitFor({
  state: 'visible'
});

// Click popup YES
await page.locator(
  '[name="bandhan_nonrecom_yes_pop"]'
).click({
  force: true
});

console.log('✅ Popup Yes clicked');

// Wait for dropdown data loading
await page.waitForTimeout(5000);

// Verify dropdown options loaded
const options = await page.locator(
  '#prodcat_id option'
).allTextContents();

console.log(options);

// Validate
if (options.length < 4) {
  throw new Error(
    '❌ Product Category options not loaded'
  );
}


console.log('✅ Product Category loaded');

// Wait for UI rendering
await page.waitForTimeout(5000);

console.log('✅ Waiting completed');

// Click Product Category section first
await page.locator(
  'div',
  { hasText: 'Product Category' }
).first().click();

console.log('✅ Product Category section clicked');

// Wait little
await page.waitForTimeout(2000);
await page.locator('#cat-plan button').click();
console.log('✅ Product Category dropdown opened');

// Select Savings
await page.locator(
  '.ui-menu-item-wrapper'
).filter({
  hasText: /^Savings$/
}).first().click();

console.log('✅ Savings selected successfully');

// Wait popup
await page.locator(
  'input[onclick="proceedBandhanPopupquote()"]'
).waitFor({
  state: 'visible'
});

await page.locator(
  'input[onclick="proceedBandhanPopupquote()"]'
).click();
console.log('✅ Okay to Proceed clicked successfully');

await page.waitForTimeout(5000);

console.log('Waiting for Product dropdown to load...');

const products = await page.locator(
  '#product_id option'
).allTextContents();

console.log(products);

console.log('Products loaded successfully');
await page.waitForTimeout(2000);
await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div:nth-child(48) > div:nth-child(1) > div:nth-child(1) > form:nth-child(5) > div:nth-child(5) > div:nth-child(4) > div:nth-child(2) > button:nth-child(3) > span:nth-child(1)").click();
await page.waitForTimeout(2000);
await page.locator('a:has-text("HDFC Life Sanchay Plus")').click();

// Wait popup again
await page.locator(
  '#div_bandhanpopupq'
).waitFor({
  state: 'visible'
});

// Final Okay
await page.locator(
  'input[onclick="proceedBandhanPopupquote()"]'
).click();

console.log('✅ Okay to Proceed popup2 handled successfully');

await page.locator("//div[@id='div_payor']//div[@class='clear-both float-radio']//div[1]//span[1]//a[1]").click();


console.log('✅ Is life Assured same as Payor? successfully');

await page.locator("//div[@id='spl_rider']//a[@class='jqTransformCheckbox jqTransformChecked']").click();
await page.waitForTimeout(5000);

await page.locator(
  "//a[@id='calcPremium']//span[contains(text(),'Calculate Premium')]"
).click({ force: true });
console.log('✅ Calculate Premium clicked successfully');
await page.waitForTimeout(5000);

await page.locator("//div[@id='Adhaarmsg']//span[@class='jqTransformCheckboxWrapper']//span[@class='jqTransformCheckboxWrapper']//a[@class='jqTransformCheckbox']").click();
console.log('✅ Adhaar consent handled successfully');
await page.waitForTimeout(5000);

await page.locator('#AadharAgreeConsent:visible').click();
console.log('✅ Adhaar consent popup handled successfully');
await page.waitForTimeout(5000);

const buyNowBtn = page.locator(
  "//div[@id='buynow_divid']//a[@class='btn-red']"
);

if (await buyNowBtn.count() > 0) {

  await buyNowBtn.waitFor({
    state: 'visible',
    timeout: 30000
  });

  await buyNowBtn.click();

  console.log('✅ Buy Now clicked successfully');

} else {

  throw new Error('❌ Buy Now button not found');

}
await page.waitForTimeout(5000);

await page.locator('#instype_submit:visible').click();
console.log('✅ Proceed to Payment clicked successfully');
await page.waitForTimeout(5000);

await page.getByText('Proceed to Application Form', { exact: true }).click();
console.log('✅ Proceed to Application Form clicked successfully');

await page.locator('input.custom-btn.htc.float-none:visible').click();
console.log('✅ Proceed to Application Form final clicked successfully');

await page.waitForTimeout(10000);

//Application form page

await page.locator('#formpageApplicationId').waitFor({
  state: 'visible'
});

const applicationNumber = await page
  .locator('#formpageApplicationId')
  .innerText();

console.log(`✅ Application Number: ${applicationNumber}`);

await page.waitForTimeout(20000);

await selectAppDropdown(
  page,
  "//div[@id='proposermaritalstatus']//button[@title='Show All Items']",
  'Single'
);

await selectAppDropdown(
  page,
  "//div[@id='ckycoccupation']//button[@title='Show All Items']",
  'Agriculture'
);

await selectAppDropdown(
  page,
  "//div[@id='customercategory']//button[@title='Show All Items']",
  'Elite'
);

await selectAppDropdown(
  page,
  "//div[@id='ftitle']//button[@title='Show All Items']",
  'Dr.'
);

await page.locator(
  "//input[@name='body.proposer.ckyc.proposerinfo.fathfname']"
).fill('Test');

console.log('✅ Father First Name entered successfully');

await selectAppDropdown(
  page,
  "//div[@id='mtitle']//button[@title='Show All Items']",
  'Dr.'
);

await page.locator(
  "//input[@name='body.proposer.ckyc.proposerinfo.motherfname']"
).fill('Test');
console.log('✅ Mother First Name entered successfully');

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully');



});
