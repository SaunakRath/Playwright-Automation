import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://insurance.auuat.bank.in/');
  await page.getByText('AU RM').click();
  await page.getByRole('textbox', { name: 'Enter your AU Bank Employee ID' }).click();
  await page.getByRole('textbox', { name: 'Enter your AU Bank Employee ID' }).fill('441087');
  await page.getByRole('textbox', { name: 'Enter your AU Bank Employee ID' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your AU Bank System' }).fill('Bank@123');
  await page.getByRole('textbox', { name: 'Enter your AU Bank System' }).press('Tab');
  await page.pause();
  
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.getByRole('textbox', { name: 'Please enter OTP' }).click();
  await page.getByRole('textbox', { name: 'Please enter OTP' }).fill('123456');
  await page.getByRole('button', { name: 'Verify OTP' }).click();
  


  await page.getByRole('link', { name: 'Customer Onboarding' }).click();
  await page.locator('a').filter({ hasText: /^Customer onboarding$/ }).click();
  await page.getByLabel('Type of Onboarding *').selectOption('CustRad');
  
  await page.locator('#custidradval').click();
  await page.locator('#custidradval').fill('96');
  await page.goto('https://insurance.auuat.bank.in/');
  await page.locator('#custidradval').fill('963624');
  await page.goto('https://insurance.auuat.bank.in/');
  await page.locator('#custidradval').click();
  await page.locator('#custidradval').click();
  await page.locator('#custidradval').fill('22963624');
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.goto('https://insurance.auuat.bank.in/');
  await page.locator('#insuranceCategory').selectOption('life');
  await page.goto('https://insurance.auuat.bank.in/');
  await page.getByRole('textbox', { name: 'Please Select Product Category' }).click();
  await page.getByRole('treeitem', { name: 'Savings Plan' }).click();
  await page.getByLabel('Insurance Company', { exact: true }).selectOption('5');
  await page.goto('https://insurance.auuat.bank.in/');
  await page.getByLabel('Insurance Company Partner').selectOption('143435');
  await page.goto('https://insurance.auuat.bank.in/');
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.getByRole('button', { name: 'Start Onboarding' }).click();
  await page.locator('#drdSuitOccupation').click();
  await page.locator('#drdSuitOccupation').click();
  await page.locator('#drdSuitOccupation').click();
  await page.locator('#txtAnnualIncome').click();
  await page.locator('#txtAnnualIncome').fill('09');
  await page.locator('#txtCurrentValue').click();
  await page.locator('#txtCurrentValue').fill('60,0000');
  await page.locator('#txtPolicyTerm').click();
  await page.locator('#txtPolicyTerm').fill('20');
  await page.locator('#txtPremiumPolicyTerm').click();
  await page.locator('#txtPremiumPolicyTerm').fill('5');
  await page.locator('#drdSuitEducation').selectOption('Graduate');
  await page.locator('#drdSuitOccupation').selectOption('Salaried');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('#dv24003_00').getByRole('button', { name: 'Select New Cover -  ₹ 0 ' }).click();
  await page.getByRole('img').first().click();
  await page.getByRole('option', { name: 'Indian' }).click();
  await page.getByRole('img').nth(1).click();
  await page.getByRole('option', { name: 'Resident Indian' }).click();
  await page.getByRole('img').nth(3).click();
  await page.getByRole('option', { name: 'Immediate Income' }).click();
  await page.getByRole('img').nth(4).click();
  await page.getByRole('option', { name: 'Fixed Term' }).click();
  await page.locator('div:nth-child(8) > .MuiFormControl-root > .native-autocomplete > .autocomplete-wrapper > .no-inner-label > .text-field-root > .end-adornment-icon > div > .flex > img').click();
  await page.locator('div:nth-child(8) > .MuiFormControl-root > .native-autocomplete > .autocomplete-wrapper > .no-inner-label > .text-field-root > .end-adornment-icon > div > .flex > img').click();
  await page.locator('div:nth-child(9) > .MuiFormControl-root > .native-autocomplete > .autocomplete-wrapper > .no-inner-label > .text-field-root > .end-adornment-icon > div > .flex > img').click();
  await page.locator('div:nth-child(9) > .MuiFormControl-root > .native-autocomplete > .autocomplete-wrapper > .no-inner-label > .text-field-root > .end-adornment-icon > div > .flex > img').click();
  await page.locator('div:nth-child(10) > .MuiFormControl-root > .native-autocomplete > .autocomplete-wrapper > .no-inner-label > .text-field-root > .end-adornment-icon > div > .flex > img').click();
  await page.getByRole('option', { name: 'Annual' }).click();
  await page.locator('div:nth-child(9) > .MuiFormControl-root > .native-autocomplete > .autocomplete-wrapper > .no-inner-label > .text-field-root > .end-adornment-icon > div > .flex > img').click();
  await page.getByRole('option', { name: 'Survival Benefit', exact: true }).click();
  await page.getByText('Plan Option*Type of Term*').click();
  await page.locator('.text-field-root.css-i712t3 > .end-adornment-icon > div > .flex > img').click();
  await page.getByRole('option', { name: 'Advance' }).click();
  await page.getByText('Plan Option*Type of Term*').click();


});