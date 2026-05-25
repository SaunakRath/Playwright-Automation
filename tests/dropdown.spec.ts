import { test, expect } from '@playwright/test';

test('Dropdown Handling', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  //Static Dropdown(select tag)

//   await page.locator('#country').selectOption('India'); // Select by visible text
//   await page.locator('#country').selectOption({ value: 'uk' }); // Select by value
//   await page.locator('#country').selectOption({ label: 'India' }); // Select by label
//   await page.locator('#country').selectOption({ index: 3 }); // Select by index


//check no of options in the dropdown
//   const options = await page.locator('#country option').count();
//   console.log(`Total options in dropdown: ${options}`);

//check an option present in the dropdown
// const optionsText: string[] =(await page.locator('#country option').allTextContents()).map(text => 
//     text.trim());

// console.log(optionsText);

// expect(optionsText).toContain('Japan');

//   await page.waitForTimeout(5000); 





});

//npx playwright test tests/dropdown.spec.ts --headed