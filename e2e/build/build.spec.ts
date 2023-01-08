import { test, expect } from '@playwright/test'

test('should show the production version', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL('/')
})
