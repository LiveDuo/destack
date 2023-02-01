import baseConfig from '../base.config'

const config = {
  ...baseConfig,
  webServer: {
    ...baseConfig.webServer,
    command: 'npm run build:react && npm run start:react',
  },
}
export default config
