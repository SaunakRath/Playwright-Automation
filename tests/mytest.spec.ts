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






Claim offer

handling dropdowns


Excellent 🔥🔥

Session 12: Dialogs (Alert, Confirm, Prompt), Frames & Inner Frames
These are very common interview and project topics in Playwright.

Part 1: JavaScript Dialogs
There are 3 types of dialogs:

Dialog	Buttons
Alert	OK
Confirm	OK / Cancel
Prompt	Input + OK / Cancel
1️⃣ Alert Box
JavaScript
alert("Welcome");
Playwright
test('Alert Example', async ({ page }) => {

  page.on('dialog', async dialog => {

    console.log(dialog.message());

    await dialog.accept();

  });

  await page.locator('#alertButton').click();

});
Explanation
page.on('dialog')
Listens for popup dialogs.

dialog.message()
Gets popup text.

Example:

Welcome
dialog.accept()
Clicks OK.

2️⃣ Confirm Box
JavaScript
confirm("Are you sure?");
Accept (OK)
page.on('dialog', async dialog => {

  await dialog.accept();

});
Dismiss (Cancel)
page.on('dialog', async dialog => {

  await dialog.dismiss();

});
3️⃣ Prompt Box
JavaScript
prompt("Enter Name");
Enter Value
page.on('dialog', async dialog => {

  await dialog.accept('Saunak');

});
Result
Input box receives:

Saunak
and clicks OK.

Interview Question
Difference between accept() and dismiss()
Method	Action
accept()	Click OK
dismiss()	Click Cancel
Complete Example
test('Prompt Example', async ({ page }) => {

  page.on('dialog', async dialog => {

    console.log(dialog.type());

    console.log(dialog.message());

    await dialog.accept('Saunak');

  });

  await page.locator('#promptBtn').click();

});
Part 2: Frames (iFrame)
What is a Frame?
A webpage inside another webpage.

Example:

<iframe id="frame1">
Problem
Normal locators don't work.

❌

await page.locator('#name').fill('Saunak');
because element is inside iframe.

How to Handle Frame
Use:

frameLocator()
Example
await page.frameLocator('#frame1')
  .locator('#name')
  .fill('Saunak');
Flow
Page
 └── Frame
      └── Element
Example
test('Frame Example', async ({ page }) => {

  await page.goto(
    'https://ui.vision/demo/webtest/frames/'
  );

  await page.frameLocator('frame[src="frame_1.html"]')
    .locator('[name="mytext1"]')
    .fill('Saunak');

});
Alternative Method
Get frame object first.

const frame = page.frame({
  name: 'frame-name'
});
Then:

await frame?.locator('#name')
  .fill('Saunak');
Part 3: Nested / Inner Frames
Interview favorite topic 🔥

Structure
Main Page
  └── Frame 1
        └── Inner Frame
              └── Element
HTML
<iframe id="outer">

   <iframe id="inner">

   </iframe>

</iframe>
Playwright Solution
const outerFrame =
  page.frameLocator('#outer');

const innerFrame =
  outerFrame.frameLocator('#inner');

await innerFrame
  .locator('#username')
  .fill('Saunak');
Real Example
await page
  .frameLocator('#outerFrame')
  .frameLocator('#innerFrame')
  .locator('#email')
  .fill('test@test.com');
How to Inspect Frames
Open DevTools:

<iframe>
If you see:

<iframe
Then use:

frameLocator()
Common Mistakes
❌ Direct Locator
await page.locator('#name').fill('Saunak');
Fails if element is inside frame.

✅ Correct
await page
  .frameLocator('#frame1')
  .locator('#name')
  .fill('Saunak');
Cheat Sheet
Alert
page.on('dialog', async dialog => {
  await dialog.accept();
});
Confirm Cancel
page.on('dialog', async dialog => {
  await dialog.dismiss();
});
Prompt
page.on('dialog', async dialog => {
  await dialog.accept('Saunak');
});
Frame
await page
  .frameLocator('#frame')
  .locator('#name')
  .fill('Saunak');
Inner Frame
await page
  .frameLocator('#outer')
  .frameLocator('#inner')
  .locator('#name')
  .fill('Saunak');
Interview Answers
What is an iframe?
An iframe is an HTML element that embeds another webpage within the current webpage.

How do you handle frames in Playwright?
Using frameLocator() or page.frame() to switch context and interact with elements inside the frame.

How do you handle JavaScript dialogs?
Using the page.on('dialog') event and methods like accept() or dismiss().

Next Session (Session 13)
You should learn:

Tables Handling

Web Tables Pagination

Mouse Actions

Hover

Right Click

Double Click

Drag & Drop

These are heavily asked in Playwright interviews and used in real projects. 🚀


npx playwright codegen -o tests/codegen.spec.ts
🧠 What this command does
Part	Meaning
npx	Runs Playwright without globally installing it
playwright	Playwright CLI
codegen	Starts the Playwright recorder
-o	Output file
tests/codegen.spec.ts	Save generated code into this file
🚀 What happens after running it?
Browser opens

Playwright Inspector opens

You perform actions manually

Playwright records your actions

Generated code is automatically saved in:

tests/codegen.spec.ts
No need to copy-paste manually.

Example
Run:

npx playwright codegen -o tests/codegen.spec.ts
Perform:

Open website

Enter username

Enter password

Click Login

Playwright will generate something like:

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://example.com');
  await page.getByRole('textbox').fill('admin');
  await page.getByLabel('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
});
and save it directly to:

tests/codegen.spec.ts
Record a Specific Website
npx playwright codegen https://insurance.auuat.bank.in/ -o tests/auLogin.spec.ts
Record in Chrome
npx playwright codegen --browser chromium -o tests/codegen.spec.ts
Record in Edge
npx playwright codegen --browser msedge -o tests/codegen.spec.ts
Open Existing File and Continue Recording
npx playwright codegen --target playwright -o tests/login.spec.ts
Run the Generated Test
npx playwright test tests/codegen.spec.ts --project=chromium
Professional Practice
Don't directly use code generated by Codegen in your framework.

After recording:

Remove unnecessary goto() calls.

Replace weak locators with better locators.

Add assertions (expect()).

Convert repeated code into Page Objects.

Think of Codegen as a starting point, not the final automation script.


--device "iphone 15"

--device is used in Playwright Codegen to emulate a mobile device.

For iPhone 15, use:

npx playwright codegen --device="iPhone 15"
or save the generated code directly:

npx playwright codegen --device="iPhone 15" -o tests/iphone15.spec.ts
🧠 What happens?
Playwright launches a browser with:

✅ iPhone 15 viewport size
✅ Mobile user agent
✅ Touch support
✅ Mobile screen dimensions

Example with URL
npx playwright codegen --device="iPhone 15" https://www.google.com
Generate and save
npx playwright codegen --device="iPhone 15" https://insurance.auuat.bank.in/ -o tests/mobileLogin.spec.ts
Common Devices
--device="iPhone 15"
--device="iPhone 15 Pro"
--device="iPhone 15 Pro Max"
--device="Pixel 7"
--device="Pixel 8"
--device="iPad Pro 11"
See all available devices
Create a temporary file:

import { devices } from '@playwright/test';

console.log(Object.keys(devices));
Run:

node file.js
Difference between Browser and Device
npx playwright codegen --browser chromium
👉 Desktop Chrome

npx playwright codegen --device="iPhone 15"
👉 Mobile iPhone 15 simulation

Real Interview Question
Q: What does --device="iPhone 15" do?

Answer: It emulates an iPhone 15 environment by applying the device's viewport, user agent, touch capabilities, and other mobile browser characteristics, allowing mobile web testing without a physical device.


Trace Viewer| Capture Screenshots & Videos | Flaky Tests

Excellent 🔥🔥

Session 14: Trace Viewer, Screenshots, Videos & Flaky Tests
These are extremely important for debugging failed Playwright tests in real projects.

1️⃣ Trace Viewer
🧠 What is Trace Viewer?
Think of it as a recording of your test execution.

It captures:

✅ Every action
✅ Every click
✅ Every locator
✅ Screenshots at each step
✅ Network calls
✅ Console logs
✅ DOM snapshots

Why Use It?
Suppose your test fails here:

await page.locator('#submit').click();
You don't know:

Was the button visible?

Was it disabled?

Did another popup cover it?

Trace Viewer helps answer all these questions.

Enable Trace
In playwright.config.ts

use: {
  trace: 'on'
}
Options
trace: 'on'
trace: 'off'
trace: 'retain-on-failure'
trace: 'on-first-retry'
Recommended
trace: 'retain-on-failure'
Only failed tests keep traces.

Run Test
npx playwright test
Open Trace
npx playwright show-trace trace.zip
From Report
Open report:

npx playwright show-report
Click:

Failed Test
 ↓
Trace
Trace Viewer opens automatically.

Trace Viewer Sections
Timeline
Shows:

Click Login
Fill Username
Fill Password
Click Submit
Actions
Every Playwright action.

Example:

page.goto()
locator.fill()
locator.click()
Snapshots
Screenshot at each step.

You can move forward/backward.

Network
Shows:

GET /login
POST /authenticate
Very useful for API debugging.

Console
Shows browser console logs.

Example:

TypeError
ReferenceError
2️⃣ Capture Screenshots
Manual Screenshot
await page.screenshot({
  path: 'screenshots/homepage.png'
});
Full Page Screenshot
await page.screenshot({
  path: 'fullpage.png',
  fullPage: true
});
Screenshot of Specific Element
await page.locator('#logo')
  .screenshot({
    path: 'logo.png'
  });
Automatic Screenshots
In config:

use: {
  screenshot: 'on'
}
Options
screenshot: 'on'
screenshot: 'off'
screenshot: 'only-on-failure'
Recommended
screenshot: 'only-on-failure'
3️⃣ Video Recording
Enable Videos
use: {
  video: 'on'
}
Options
video: 'on'
video: 'off'
video: 'retain-on-failure'
Recommended
video: 'retain-on-failure'
Run Test
npx playwright test
Videos stored in:

test-results/
Open Video
Just open the .webm file.

Example:

test-results/
  login-test/
     video.webm
Recommended Config
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure'
}
4️⃣ Flaky Tests
🧠 What is a Flaky Test?
A test that:

Passes sometimes
Fails sometimes
without code changes.

Example:

Run 1 → Pass
Run 2 → Fail
Run 3 → Pass
Why Flaky Tests Happen?
1. Hard Waits
Bad:

await page.waitForTimeout(2000);
Page loads slower one day.

Test fails.

2. Dynamic Elements
await page.click('#submit');
Element not ready.

3. Network Delay
API response delayed.

4. Wrong Locator
Bad:

await page.locator('button').click();
Multiple buttons exist.

Fix Flaky Tests
Use Assertions
Bad:

await page.locator('#success').click();
Better:

await expect(
  page.locator('#success')
).toBeVisible();

await page.locator('#success').click();
Wait for Loader
await page.locator('.loader')
  .waitFor({
    state: 'hidden'
  });
Use Stable Locators
Bad:

button
Good:

getByRole('button', {
  name: 'Submit'
})
Retries
Configure in:

retries: 2
Meaning:

Attempt 1 → Fail
Attempt 2 → Retry
Attempt 3 → Retry
Detect Flaky Tests
Run multiple times:

npx playwright test --repeat-each=10
Example:

Run 1 Pass
Run 2 Fail
Run 3 Pass
Flaky detected.

Useful Debug Commands
UI Mode
npx playwright test --ui
Debug Mode
npx playwright test --debug
Headed Mode
npx playwright test --headed
Trace
npx playwright show-trace trace.zip
Interview Questions
What is Trace Viewer?
Trace Viewer is Playwright's debugging tool that records actions, screenshots, DOM snapshots, network requests, and console logs during test execution.

What is a Flaky Test?
A flaky test is a test that produces inconsistent results, passing and failing intermittently without changes in application code.

How do you reduce flaky tests?
Use stable locators

Avoid hard waits

Use assertions

Wait for loaders/network responses

Enable retries

Recommended playwright.config.ts
use: {
  headless: false,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure'
}
This configuration is commonly used in professional Playwright frameworks because it provides excellent debugging information while keeping report size manageable. 🚀


