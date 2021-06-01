module.exports = {
    server: {
        command: 'npm start',
        launchTimeout: 20000,
        port: 3000,
    },
    launch: {
        dumpio: true,
        headless: false,
        product: 'chrome',
    },
    browserContext: 'default',
}