import { test, expect } from '@playwright/test'

test('should contain the editor', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#editor')).toHaveCount(1)
})

test('should drap and drop a component', async ({ page }) => {
  await page.goto('/')

  // open category
  await page.click('text=BANNER')

  // add component
  const image = await page.locator('#banner img').first()
  await image.dragTo(await page.locator('#editor'))
  await page.isVisible("text='Understand User Flow'")

  // remove the component
  await page.hover('text=Understand')
  const deleteRect = await page.locator('#delete').first().boundingBox()
  await page.mouse.move(deleteRect?.x as number, deleteRect?.y as number)
  await page.mouse.down()
})

test('should add an image to renderer', async ({ page }) => {
  await page.goto('/')

  // open category
  await page.click('text=CTA')

  // add component with image
  const image = await page.locator('#cta img').first()
  await image.dragTo(await page.locator('#editor'))

  // open image dialog
  await page.hover('text=Lorem')
  const imageElement = await page.getByRole('img', { name: 'Student' }).first()
  await imageElement.click()

  // click replace image
  await page.click('text=Replace')
  await page.setInputFiles("input[type='file']", ['e2e/dev/pattern.jpg'])
  await page.click('text=Upload')
  await page.click('text=Save')

  // check image uploaded
  await expect(page.locator(`img[src='/uploaded/pattern.jpg']`)).toHaveCount(1)

  // remove the component
  await page.hover('text=Lorem')
  const deleteRect = await page.locator('#delete').first().boundingBox()
  await page.mouse.move(deleteRect?.x as number, deleteRect?.y as number)
  await page.mouse.down()

  // remove the uploaded image
  // @ts-ignore
  await require('fs/promises').rm('dev/nextjs-project/public/uploaded/pattern.jpg')
})
