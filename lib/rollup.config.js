import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import replace from 'rollup-plugin-re'
import image from '@rollup/plugin-image'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const browserConfig = {
  onwarn(warning, rollupWarn) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      rollupWarn(warning)
    }
  },
  external: ['next', 'react', 'react-dom'],
  plugins: [
    image(),
    postcss({
      inject: { insertAt: 'top' },
      plugins: [tailwindcss('./tailwind.config.js'), autoprefixer],
    }),
    commonjs(),
    resolve({ preferBuiltins: true }),
    esbuild({
      sourceMap: process.env.NODE_ENV !== 'production',
      minify: process.env.NODE_ENV === 'production',
      target: 'es2017',
      jsx: 'transform',
    }),
  ],
}

const nodeConfig = {
  input: 'server/index.ts',
  output: [{ dir: 'build/server/', format: 'cjs' }],
  plugins: [
    resolve({ preferBuiltins: true }),
    replace({
      // https://github.com/rollup/rollup-plugin-commonjs/issues/166
      // Note: Replace before commonjs
      patterns: [
        {
          match: /formidable(\/|\\)lib/,
          test: 'if (global.GENTLY) require = GENTLY.hijack(require);',
          replace: '',
        },
      ],
    }),
    commonjs(),
    esbuild({
      sourceMap: process.env.NODE_ENV !== 'production',
      minify: process.env.NODE_ENV === 'production',
      target: 'node10',
    }),
  ],
}

const vanillaConfig = {
  ...browserConfig,
  input: 'client/vanilla/index.tsx',
  output: [{ file: 'build/browser/index.js', format: 'cjs' }],
}
const craftConfig = {
  ...browserConfig,
  input: 'client/craft/index.tsx',
  output: [{ dir: 'build/browser/craft', format: 'cjs' }],
}
const grapesConfig = {
  ...browserConfig,
  input: 'client/grapes/index.ts',
  output: [{ dir: 'build/browser/grapes', format: 'cjs' }],
}
export default [vanillaConfig, craftConfig, grapesConfig, nodeConfig]
