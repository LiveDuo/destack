import { test, expect } from '@playwright/test'

// TODO fix
test.skip('should show the production version', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL('/')
  await expect(page.locator('#page')).toBeVisible()
})
