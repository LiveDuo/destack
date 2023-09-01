// @ts-nocheck

import { devices } from '@playwright/test'

const baseURL = `http://localhost:3000`
const CI = process.env.CI === 'true'

const config = {
  timeout: 15 * 1000, // 15 secs
  retries: 1,
  reporter: CI ? 'github' : 'list',
  forbidOnly: CI,
  webServer: {
    url: baseURL,
    timeout: 2 * 60 * 1000, // 2 mins
    reuseExistingServer: true,
  },
  use: { baseURL, trace: 'retry-with-trace', headless: CI },
  projects: [
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'Desktop Firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'Desktop Safari', use: { ...devices['Desktop Safari'] } },
  ].filter((_, i) => i === 0 || CI), // run all only in CI
}
export default config
