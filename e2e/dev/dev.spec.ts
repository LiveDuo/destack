import { test, expect } from '@playwright/test'

test('should contain craftjs renderer', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('div.craftjs-renderer')).toHaveCount(1)
})

test.only('should drap and drop a component', async ({ page }) => {
  await page.goto('/')

  // add component
  const imagePath = '/api/builder/handle?type=asset&path=/src/themes/hyperui/Banner1/preview.png'
  await page.dragAndDrop(`img[src='${imagePath}']`, 'div.craftjs-renderer > div > div')
  await expect(page.locator('div.craftjs-renderer > div > div')).toHaveCount(1)

  // delete the component
  await page.click('div.page-container > div > a:nth-child(4)')
})

test('should add an image to renderer', async ({ page }) => {
  await page.goto('/')

  // add component with image
  await page.click('div.toolbox > div > div:nth-child(1)')
  await page.click('div.toolbox > div > div:nth-child(2)')
  const imagePath = '/api/builder/handle?type=asset&path=/src/themes/hyperui/Cta1/preview.png'
  await page.dragAndDrop(`img[src='${imagePath}']`, 'div.craftjs-renderer > div > div')
  await expect(page.locator('div.craftjs-renderer > div > div')).toHaveCount(1)

  // open image dialog
  await page.hover('#components-01 > img')
  await page.click('div.page-container > div > a:nth-child(3)')

  // click replace image
  await page.click('text=Replace')
  await page.setInputFiles("input[type='file']", ['e2e/dev/pattern.jpg'])
  await page.click('text=Upload')
  await page.click('text=Save')

  // TODO check image uploaded

  // delete the component
  await page.click('div.page-container > div > a:nth-child(4)')

  // TODO delete the uploaded image
})
