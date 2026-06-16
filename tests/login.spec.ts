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
  'Protection'
);
console.log('✅ Protection option selected successfully');


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
// await page.locator(
//   'input[onclick="proceedBandhanPopupquote()"]'
// ).click();
// console.log('✅ Proceed button clicked');

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

await page.waitForTimeout(1000);

await selectAppDropdown(
  page,
  "//div[@id='mtitle']//button[@title='Show All Items']",
  'Dr.'
);


await page.locator("//input[@name='body.proposer.ckyc.proposerinfo.motherfname']").fill('Test');
console.log('✅ Mother First Name entered successfully');

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully');


console.log('----- Personal Details Scetion opened successfully----');

await page.locator("//input[@name='body.lifeassured[0].personalinfo.birthplace']").fill('Mumbai');
console.log('✅ Birth Place entered successfully');

await page.locator("//input[@name='body.lifeassured[0].personalinfo.panno']").fill('AAAPW9785A');
console.log('✅ PAN entered successfully');

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully');

console.log('----- Contact Information Scetion opened successfully----');

await page.locator("//input[@name='body.lifeassured[0].addressinfo[0].addressdetails.houseno']").fill('Test');
console.log('✅ House No entered successfully');

await page.locator("//input[@name='body.lifeassured[0].addressinfo[0].addressdetails.street']").fill('Test');
console.log('✅ Street entered successfully');

await page.locator("//input[@name='body.lifeassured[0].addressinfo[0].addressdetails.landmark']").fill('Test');
console.log('✅ Landmark entered successfully');

await page.locator("//input[@name='body.lifeassured[0].addressinfo[0].addressdetails.pincode']").fill('635802');
console.log('✅ Pincode entered successfully');

await page.locator("//div[@class='form-container1 fomr-scroll']//div[@class='address-div']").click();
console.log('✅ Address section clicked successfully');

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully');

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully permanent address section');

await selectAppDropdown(
  page,
  "//div[@id='conf3']//div[@class='form-field width-200 margin-bottom10']//button[@title='Show All Items']",
  'English'
);

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully');

console.log('----- Additional Details Section opened successfully----');

await page.locator("//div[@id='addDetails']//span[2]//a[1]").click();
console.log('✅ UW Decision No clicked successfully');

await page.locator("//div[@id='demat-check']//div[@class='ques dematquestion']//a[@class='jqTransformRadio']").click();
console.log('✅ Demat Account No clicked successfully');

await selectAppDropdown(
  page,
  "//div[@id='insobjective']//button[@title='Show All Items']",
  'Savings'
);
console.log('✅ Investment Objective selected successfully');

await page.locator("//div[@id='sourceoffunddiv']//div[@id='1']//a[@class='jqTransformCheckbox']").click();
console.log('✅ Source of Fund - Salary clicked successfully');

await page.locator("//input[@name='body.lifeassured[0].fundsource[0].fundpcntg']").fill('100');
console.log('✅ Source of Fund - Salary Percentage entered successfully');

await page.locator("//div[@class='ques ccd-payment-details2']//div[@class='float-left ques1']//div[@class='rwd-radio-btns radio-but margin-top-10']//div[1]//span[1]//a[1]").click();
console.log('✅ Self clicked successfully');

await page.locator("//div[@class='ques ccd-payment-details2']//div[@class='float-left']//div[@class='rwd-radio-btns radio-but margin-top-10']//div[1]//span[1]//a[1]").click();
console.log('✅ NetBanking clicked successfully');

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully');

console.log('----- NEFT Section opened successfully----');

await page.locator("//input[@id='nftacnthld']").fill('Test');
console.log('✅ NEFT Account Holder Name entered successfully');

await page.locator("//input[@id='nftacntno']").fill('12345678901234');
console.log('✅ NEFT Account Number entered successfully');

await selectAppDropdown(
  page,
  "//div[@id='neftAccountTyp']//button[@title='Show All Items']",
  'Savings'
);

console.log('✅ NEFT Savings selected successfully');

await page.locator("//input[@id='neft_ifsc']").fill('HDFC0001234');
console.log('✅ NEFT IFSC Code entered successfully');

await page.locator("//body/div[@id='_portal']/div[@id='_portalpage']/div[@id='_pageheaderbody']/div[@id='_pagebody']/div[@id='main-content']/div[@class='mobile-float float-right']/div[@class='main-content clear-both']/div[@class='portlet-content margin-bottom-none']/div[@id='app-tabs']/div[@class='content-box new-form']/div[@id='pos_customerdetails']/div[@id='customer-deatails']/div[@id='slider-code']/form[@id='details']/div[@class='viewport']/div[@id='customer_details']/div[@id='add4']/div[@class='fomr-scroll']/div[1]").click();
console.log('✅ NEFT Section clicked successfully');

await page.locator("//div[@id='enachopt1']//a[@class='jqTransformRadio']").click();
console.log('✅ ENACH Yes clicked successfully');

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully');

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully');

console.log('----- Underwriting Questions Section opened successfully----');

await page.locator("//div[@id='sqm-question']//div//div[2]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 1 Yes clicked successfully');

await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(16) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(32) > div:nth-child(2) > form:nth-child(4) > div:nth-child(3) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(5) > a:nth-child(1)").click();
console.log('✅ SQM Question 2 Yes clicked successfully');

await page.locator("//div[8]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 3 Yes clicked successfully');

await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(16) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(32) > div:nth-child(2) > form:nth-child(4) > div:nth-child(3) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(13) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(5) > a:nth-child(1)").click();
console.log('✅ SQM Question 4 Yes clicked successfully');

await page.locator("//div[14]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 5 Yes clicked successfully');

await page.locator("//div[17]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 6 Yes clicked successfully');

await page.locator("//div[20]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 7 Yes clicked successfully');

await page.locator("//div[23]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 8 Yes clicked successfully');

await page.locator("//div[26]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 9 Yes clicked successfully');

await page.locator("//div[29]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 10 Yes clicked successfully');

await page.locator("//div[32]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 11 Yes clicked successfully');

await page.locator("//div[35]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 12 Yes clicked successfully');

await page.locator("//div[38]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 13 Yes clicked successfully');

await page.locator("//div[41]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ SQM Question 14 Yes clicked successfully');

await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(16) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(32) > div:nth-child(2) > form:nth-child(4) > div:nth-child(3) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(5) > div:nth-child(3) > div:nth-child(2) > span:nth-child(3) > a:nth-child(1)").click();
console.log('✅ SQM Question 15 Yes clicked successfully');

await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(16) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(32) > div:nth-child(2) > form:nth-child(4) > div:nth-child(3) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(5) > div:nth-child(5) > div:nth-child(2) > span:nth-child(3) > a:nth-child(1)").click();
console.log('✅ SQM Question 16 Yes clicked successfully');

await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(16) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(32) > div:nth-child(2) > form:nth-child(4) > div:nth-child(3) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(5) > div:nth-child(7) > div:nth-child(2) > span:nth-child(3) > a:nth-child(1)").click();
console.log('✅ SQM Question 17 Yes clicked successfully');

await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(16) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(32) > div:nth-child(2) > form:nth-child(4) > div:nth-child(3) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(5) > div:nth-child(9) > div:nth-child(2) > span:nth-child(3) > a:nth-child(1)").click();
console.log('✅ SQM Question 18 Yes clicked successfully');

await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(16) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(32) > div:nth-child(2) > form:nth-child(4) > div:nth-child(3) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(5) > div:nth-child(11) > div:nth-child(2) > span:nth-child(3) > a:nth-child(1)").click();
console.log('✅ SQM Question 19 Yes clicked successfully');

await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(16) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(32) > div:nth-child(2) > form:nth-child(4) > div:nth-child(3) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(5) > div:nth-child(12) > div:nth-child(2) > span:nth-child(3) > a:nth-child(1)").click();
console.log('✅ SQM Question 20 Yes clicked successfully');

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully');

console.log('----- Nominee Section opened successfully----');

await selectAppDropdown(
  page,
  "//select[@name='body.nominee[0].personalinfo.title']/following-sibling::button",
  "Dr."
);

await page.locator("//input[@name='body.nominee[0].personalinfo.firstnm']").fill('Test');
console.log('✅ Nominee First Name entered successfully');

await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(16) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(32) > div:nth-child(2) > form:nth-child(4) > div:nth-child(3) > div:nth-child(2) > div:nth-child(13) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > div:nth-child(7) > div:nth-child(3) > div:nth-child(1) > span:nth-child(1) > a:nth-child(1)").click();
console.log('✅ Gender Male clicked successfully');

await page.locator('input.datepicker.mandatory.dateofbirth.hasDatepicker.jqtranformdone.jqTransformInput:visible').fill('01/01/1990');
console.log('✅ Nominee Date of Birth entered successfully');

await page.locator(".form-container1.nomineeothers").click();
console.log('✅ Nominee section clicked successfully');

await selectAppDropdown(
  page,
  "//select[@id='relation-status']/following-sibling::button",
  'Father'
);
console.log('✅ Nominee Relationship selected as Father');

await page.locator('input.mandatory.entitlepercent.jqtranformdone.jqTransformInput:visible').fill('100');
console.log('✅ Nominee Entitlement Percentage entered successfully');

await page.locator('a.jqTransformCheckbox:visible').click();
console.log('✅ Nominee Address checkbox clicked successfully');

await page.locator("//input[@id='continue']").click();
console.log('✅ Continue button clicked successfully');

await page.locator("#NBSubmit").click();
console.log('✅Submit clicked successfully');

await page.waitForTimeout(10000);
console.log('----- Enhanced UW Section opened successfully----');

await page.locator(
  "//input[@id='HDFCPart2Section.IdentificationMark']"
).fill('Test');

console.log('✅ Identification Mark entered successfully');


await selectAppDropdown(
  page,
  "//div[@id='designation']//button[@title='Show All Items']",
  'Assistant Manager'
);

console.log('✅ Assistant Manager selected successfully');

await page.locator(
  'ul.ui-autocomplete:visible .ui-menu-item-wrapper'
).filter({
  hasText: /^HDFC$/
}).first().click();

console.log('✅ HDFC selected');



});
