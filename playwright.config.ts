import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium-ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://www.saucedemo.com' },
    },
    {
      name: 'firefox-ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Firefox'], baseURL: 'https://www.saucedemo.com' },
    },
    {
      name: 'webkit-ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Safari'], baseURL: 'https://www.saucedemo.com' },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: 'https://restful-booker.herokuapp.com' },
    },
    {
      name: 'hybrid',
      testDir: './tests/hybrid',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://www.saucedemo.com' },
    },
  ],
});
