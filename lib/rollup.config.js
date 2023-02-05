import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import replace from 'rollup-plugin-re'
import image from '@rollup/plugin-image'
import tailwindcss from 'tailwindcss'

const browserConfig = {
  input: 'client/index.tsx',
  output: [
    {
      dir: 'build/browser',
      format: 'cjs',
    },
  ],
  onwarn(warning, rollupWarn) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      rollupWarn(warning)
    }
  },
  external: ['next', 'react', 'react-dom'],
  plugins: [
    image({}),
    postcss({
      extract: true,
      plugins: [tailwindcss('./tailwind.config.js')],
    }),
    commonjs({
      requireReturnsDefault: false,
      defaultIsModuleExports: true,
    }),
    resolve({ preferBuiltins: true }),
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      sourceMap: process.env.NODE_ENV !== 'production',
      minify: process.env.NODE_ENV === 'production',
      target: 'es2017',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      // Like @rollup/plugin-replace
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json',
      loaders: {
        '.json': 'json',
        '.js': 'jsx',
      },
    }),
  ],
}

const nodeConfig = {
  input: 'server/index.ts',
  output: [
    {
      dir: 'build/server/',
      format: 'cjs',
    },
  ],
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
    commonjs({
      requireReturnsDefault: false,
      defaultIsModuleExports: true,
    }),
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      sourceMap: process.env.NODE_ENV !== 'production', // default
      minify: process.env.NODE_ENV === 'production',
      target: 'node10',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json',
      loaders: {
        '.json': 'json',
        '.js': 'jsx',
      },
    }),
  ],
}

export default [browserConfig, nodeConfig]
