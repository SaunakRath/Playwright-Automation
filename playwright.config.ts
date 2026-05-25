
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Test Folder
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Workers for CI
  workers: process.env.CI ? 1 : undefined,

  // HTML Report Configuration
  reporter: [['html', { open: 'always' }]],

  // Shared Settings
  use: {

    // Base URL (optional)
    // baseURL: 'https://example.com',

    // Screenshot
    screenshot: 'on',

    // Video Recording
    video: 'retain-on-failure',

    // Trace
    trace: 'on-first-retry',

    // Run browser in headed mode
    headless: true,
  },

  // Browser Projects
  projects: [

    // Chromium
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Firefox
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // Safari/Webkit
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    // Mobile Chrome
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },

    // Mobile Safari
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    // Microsoft Edge
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //   },
    // },

    // Google Chrome
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     channel: 'chrome',
    //   },
    // },
  ],

});

