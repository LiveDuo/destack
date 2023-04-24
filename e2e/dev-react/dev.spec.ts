import { test, expect } from '@playwright/test'

test('should contain craftjs renderer', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('div.craftjs-renderer')).toHaveCount(1)
})

test.skip('should drap and drop a component', async ({ page }) => {
  await page.goto('/')

  // add component
  const imagePath =
    'http://localhost:12785/api/builder/handle?type=asset&path=/themes/hyperui/Banner1/preview.png'
  await page.dragAndDrop(`img[src='${imagePath}']`, 'div.craftjs-renderer > div > div')
  await expect(page.locator('div.craftjs-renderer > div > div')).toHaveCount(1)

  // remove the component
  await page.hover('text=Understand')
  await page.click('div.page-container a:nth-child(4)')
})

test.skip('should add an image to renderer', async ({ page }) => {
  await page.goto('/')

  // NOTE: skip for now as upload image in not working in react
  // react-scripts reloads after uploading in the public folder
  return

  // add component with image
  await page.click('div.toolbox > div > div:nth-child(1)')
  await page.click('div.toolbox > div > div:nth-child(2)')
  const imagePath =
    'http://localhost:12785/api/builder/handle?type=asset&path=/themes/hyperui/Cta1/preview.png'
  await page.dragAndDrop(`img[src='${imagePath}']`, 'div.craftjs-renderer > div > div')
  await expect(page.locator('div.craftjs-renderer > div > div')).toHaveCount(1)

  // open image dialog
  await page.hover('div.craftjs-renderer img')
  await page.click('div.page-container a:nth-child(3)')

  // click replace image
  await page.click('text=Replace')
  await page.setInputFiles("input[type='file']", ['e2e/dev-react/pattern.jpg'])
  await page.click('text=Upload')
  await page.click('text=Save')

  // check image uploaded
  await expect(page.locator(`img[src='/uploaded/pattern.jpg']`)).toHaveCount(1)

  // remove the component
  await page.hover('text=Lorem')
  await page.click('div.page-container a:nth-child(4)')

  // remove the uploaded image
  await require('fs/promises').rm('dev/react-project/public/uploaded/pattern.jpg')
})
