import baseConfig from '../base.config'

const config = {
  ...baseConfig,
  webServer: {
    ...baseConfig.webServer,
    command: 'npm run dev',
  },
}
export default config
