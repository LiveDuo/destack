import { test, expect } from '@playwright/test'

test('should contain the editor', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#editor')).toHaveCount(1)
})

test('should drap and drop a component', async ({ page }) => {
  await page.goto('/')

  // open category
  await page.click('text=Βanner')

  // add component
  const imagePath = '/api/builder/handle?type=asset&path=/themes/hyperui/Banner1/preview.png'
  await page.dragAndDrop(`img[src='${imagePath}']`, '#editor')
  await page.isVisible("text='Understand User Flow'")

  // remove the component
  await page.hover('text=Understand')
  const deleteElement = await page.locator('#delete').boundingBox()
  await page.mouse.move(deleteElement?.x as number, deleteElement?.y as number)
})

// TODO fix
test.skip('should add an image to renderer', async ({ page }) => {
  await page.goto('/')

  // open category
  await page.click('text=CTA')

  // add component with image
  const imagePath = '/api/builder/handle?type=asset&path=/themes/hyperui/Cta1/preview.png'
  await page.dragAndDrop(`img[src='${imagePath}']`, '#editor')

  // open image dialog
  await page.hover('text= Lorem')
  const imageElement = await page.locator('#editor img').first().boundingBox() // TODO fix
  await page.mouse.move(imageElement?.x as number, imageElement?.y as number)

  // click replace image
  await page.click('text=Replace')
  await page.setInputFiles("input[type='file']", ['e2e/dev/pattern.jpg'])
  await page.click('text=Upload')
  await page.click('text=Save')

  // await page.waitForTimeout(5000)
  // return

  // check image uploaded
  await expect(page.locator(`img[src='/uploaded/pattern.jpg']`)).toHaveCount(1)

  // remove the component
  await page.hover('text=Lorem')
  const deleteElement = await page.locator('#delete').boundingBox()
  await page.mouse.move(deleteElement?.x as number, deleteElement?.y as number)

  // remove the uploaded image
  // @ts-ignore
  await require('fs/promises').rm('dev/nextjs-project/public/uploaded/pattern.jpg')
})
