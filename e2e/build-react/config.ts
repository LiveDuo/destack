import baseConfig from '../base.config'

const config = {
  ...baseConfig,
  webServer: {
    ...baseConfig.webServer,
    timeout: 180 * 1000,
    command: 'npm run build:react && npm run start:react',
  },
}
export default config
