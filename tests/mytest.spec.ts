import { test, expect } from '@playwright/test';

/*
test('title',()=>{

    test1
    test2
    test3
})

*/
test('open google', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle(/Google/);
});