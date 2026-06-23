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

 await page.locator("//input[@id='sec.userid']").fill('00800959');
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
    hasText: 'New Leads'
  }).click();

  await page.waitForLoadState('networkidle');
  console.log('✅ New Lead page SUCCESS');

  
  await page.locator("//input[@id='mobno']").fill('9776426425');
  console.log('✅ Mobile number entered');

  await page.locator("//input[@id='sendotp']").click();
  console.log('✅ OTP sent');

  //wait for 30 seconds for OTP to be received
  await page.waitForTimeout(40000);
  console.log('✅ Lead capture page opened successfully');

  await page.getByText('Customer IDs have been fetched successfully.', { exact: true }).isVisible();
  console.log('✅ Customer IDs fetched successfully');

  await page.locator("//div[@id='bbcustid']//span[@class='ui-button-icon ui-icon ui-icon-triangle-1-s']").click();
  await page.locator('a').filter({ hasText: '323233228' }).first().click();
  console.log('✅ Customer ID selected successfully');

  await page.locator("//input[@id='fetchbandhandata']").click();
  console.log('✅ Bandhan data fetched successfully');
  // wait for 5 seconds for the data to be fetched
  await page.waitForTimeout(5000);

  await page.locator("//input[@id='LFSearch']").click();
  console.log('✅ LF ID search initiated');
  await page.locator("//a[normalize-space()='201953']").click();
  console.log('✅ LF ID selected successfully');

  await page.locator("//input[@id='LGSearch']").click();
  console.log('✅ LG ID search initiated');
  await page.locator("//a[normalize-space()='BB133087']").click();
  console.log('✅ LG ID selected successfully');

  await page.locator("//div[@id='defaultbc']//div[@class='jqTransformInputWrapper']//div[@class='jqTransformInputInner']//div//input[@class='ui-autocomplete-input ui-widget ui-widget-content ui-corner-left jqtranformdone jqTransformInput']").fill('1011');
  console.log('✅ branchcode  filled successfully');


  await page.locator("//div[@id='lead-header']//span[6]//a[1]").click();
  await page.locator("//div[@id='div_leadheader_productplatform']//span[2]//a[1]").click();
  console.log('✅ Customer need and Product checkbox selected successfully');


  await page.locator("//option[@value='CA2']").click();
  console.log('✅ Product selected successfully');

  await page.locator("div[id='div_leadheader_productdiscussed'] div div p[title='Add Selected']").click();
  console.log('✅ Product added successfully');

  await page.locator("//input[@id='generate-lead']").click();
  console.log('✅ Lead generated successfully');

  




});