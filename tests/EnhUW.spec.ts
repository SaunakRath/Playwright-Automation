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

  await page.locator(':text-is("1100028054433")').click();

  await page.waitForTimeout(10000);
console.log('----- Enhanced UW Section opened successfully----');

await page.locator(
  "//input[@id='HDFCPart2Section.IdentificationMark']"
).fill('Test');

console.log('✅ Identification Mark entered successfully');


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


await page.locator("//input[@id='HDFCPart2Section.OccupationSection.OccupationMainSection.OccPresentEmployer']").fill('HDFC');
console.log('✅ HDFC entered');

await page.locator("//input[@id='HDFCPart2Section.OccupationSection.OccupationMainSection.OccWorkPlaceCity']").fill('Mumbai');
console.log('✅ Workplace City entered');

await page.locator("//input[@id='HDFCPart2Section.OccupationSection.OccupationMainSection.OccOfficeAddress']").fill('Mumbai');
console.log('✅ Office Address entered');

await selectAppDropdown(
  page,
  "//div[@class='form-field width-200']//button[@title='Show All Items']",
  'Accounts'
);

console.log('✅ Accounts selected successfully');

await page.locator("//div[@id='medieasyq2']//span[2]//a[1]").click();
console.log('✅ 1st No selected successfully');

await page.locator("//div[@id='medieasyq4']//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ 2nd No selected successfully');

await page.locator("//div[@class='section']//div[5]//div[1]//span[2]//a[1]").click();
console.log('✅ 3rd No selected successfully');

await page.locator("//div[@class='Yesbank']//div[9]//div[1]//span[2]//a[1]").click();
console.log('✅ 4th No selected successfully');

await page.locator("//form[@id='rapiddetails']//div[13]//div[1]//span[2]//a[1]").click();
console.log('✅ 5th No selected successfully');

await page.locator("//form[@id='rapiddetails']//div[17]//div[1]//span[2]//a[1]").click();
console.log('✅ 6th No selected successfully');

await page.locator("//div[@class='section']//div[4]//div[2]//div[1]//span[2]//a[1]").click();
console.log('✅ 7th No selected successfully');

await page.locator("//body//div[@id='_portal']//div[@class='section']//div[@class='section']//div[6]//div[1]//span[2]//a[1]").click();
console.log('✅ 8th No selected successfully');

await page.locator("//div[8]//div[2]//div[1]//span[2]//a[1]").click();
console.log('✅ 9th No selected successfully');

await page.locator("//body//div[@id='_portal']//div[@class='Yesbank']//div[@class='Yesbank']//div[@class='section']//span[2]//a[1]").click();
console.log('✅ 10th No selected successfully');

await page.locator("//div[@id='feamlequestionarie0']//div[2]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ 11th No selected successfully');

await page.locator("//form[@id='rapiddetails']//div[6]//div[1]//div[1]//span[2]//a[1]").click();
// await page.locator("body > div:nth-child(22) > div:nth-child(3) > div:nth-child(1) > div:nth-child(10) > div:nth-child(1) > div:nth-child(16) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(14) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(10) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > span:nth-child(3) > a:nth-child(1)").click();
console.log('✅ 12th No selected successfully');

await page.locator("//form[@id='rapiddetails']//div[10]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ 13th No selected successfully');

await page.locator("//form[@id='rapiddetails']//div[14]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ 14th No selected successfully');

await page.locator("//input[@id='HDFCPart3aSection.UsualDoctorQuestionnaire.UsualDoctorDetails']").fill('Test');
console.log('✅ Usual Doctor Details entered successfully');


await selectAppDropdown(
  page,
  "//div[@class='section']//div[@class='Yesbank']//button[@title='Show All Items']",
  'Residence'
);
console.log('✅ Residence selected successfully');

await selectAppDropdown(
  page,
  "//body//div[@id='_portal']//div[@class='Yesbank']//div[@class='Yesbank']//div[@class='section']//div[3]//div[1]//button[1]",
  "1ft 0ins = 30cms"
);
console.log('✅ Height selected successfully');

await selectAppDropdown(
  page,
  "//body//div[@id='_portal']//div[@class='Yesbank']//div[@class='Yesbank']//div[4]//div[1]//button[1]",
  "02"
);
console.log('✅ 02 selected successfully');

await page.locator("//body//div[@id='_portal']//div[@class='Yesbank']//div[@class='Yesbank']//div[@class='Yesbank']//div[2]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ 15th No selected successfully');

await page.locator("//form[@id='rapiddetails']//div[8]//div[1]//div[1]//div[1]//span[2]//a[1]").click();
console.log('✅ 16th No selected successfully');

await page.locator("//body//div[@id='_portal']//div[@class='Yesbank']//div[@class='Yesbank']//div[@class='Yesbank']//div[@class='radio-but margin-top-5']//span[2]//a[1]").click();
console.log('✅ 17th No selected successfully');

await page.locator(
  "(//input[@name='body.lifeassured[0].uwdetails[72].questionans']/preceding-sibling::a[contains(@class,'jqTransformRadio')])[2]"
).click();
console.log('✅ 18th No selected successfully');

await page.locator("#rapid-continue").click();
console.log('✅ Continue clicked successfully');

await page.waitForTimeout(3000);

await page.locator("#rapid-Submit").click();
console.log('✅Submit clicked successfully');

await page.waitForTimeout(15000);



});