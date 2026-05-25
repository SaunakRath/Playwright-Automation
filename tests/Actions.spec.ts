import { test, expect } from '@playwright/test';

//npx playwright test Actions.spec.ts --project=chromium --headed


//Text box/text input/input box
test('Text input Actions', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const textbox = page.locator('#name');
  await expect(textbox).toBeVisible();
  await expect(textbox).toBeEnabled();

  await textbox.fill("Saunak");
  const entvalue = await textbox.inputValue();
  
  //console.log("Text content of First Name is : ", await textbox.textContent()); //returns empty name
  console.log("Input Value of First Name is : ", entvalue); //returns the input value of textbox
  expect(entvalue).toBe("Saunak");
  await page.waitForTimeout(3000);


});

//Radio buttons done
//Checkbox done
