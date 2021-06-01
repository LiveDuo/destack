describe('Load editor', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:3000', {waitUntil: 'load'})
    })
    it('should contain a "gjs" element', async () => {
        await expect(page.$('#gjs')).resolves.not.toBeNull()
    })
})