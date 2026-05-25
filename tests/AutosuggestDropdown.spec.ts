//Dynamic dropdown/auto suggest dropdown(options keep changing dynamically)
//Hidden dropdown

import { test, expect } from '@playwright/test';

test('Dymanic Dropdown Handling', async ({ page }) => {

  await page.goto('https://www.flipkart.com/');

  //inspect search button
  //ctrl shift p then run command emulate page then the options got freezed
  //after selecting the dropdowns css selector disable the emulate

  await page.waitForTimeout(20000);

  await page.locator("input[name='q']").fill("smart");  //search text

    await page.waitForTimeout(2000); //wait for dropdown to appear

   const options = page.locator("ul>li"); //dropdown options

   const count = await options.count();
   console.log(`Total options in dropdown: ${count}`);  
   await page.waitForTimeout(2000);

});