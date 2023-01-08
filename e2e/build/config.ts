import baseConfig from '../base.config'

const config = {
  ...baseConfig,
  webServer: {
    ...baseConfig.webServer,
    command: 'npm run build && npm start',
  },
}
export default config
