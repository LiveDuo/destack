import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-import-css'
import svg from 'rollup-plugin-svg-import'
import commonjs from '@rollup/plugin-commonjs'

import nodePolyfills from 'rollup-plugin-node-polyfills'

const browserConfig = {
  input: 'src/index.js',
  // entrypoints: 'build/index.js',
  output: [
    {
      file: 'build/browser/index.js',
      format: 'cjs',
    },
  ],
  // All the used libs needs to be here
  external: ['react'],
  plugins: [
    // nodePolyfills(),
    svg({ stringify: false }),
    css(),
    resolve({ preferBuiltins: true }),
    esbuild({
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: false, // default
      minify: process.env.NODE_ENV === 'production',
      target: 'es2017', // default, or 'es20XX', 'esnext'
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      // Like @rollup/plugin-replace
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json', // default
      // Add extra loaders
      loaders: {
        // Add .json files support
        // require @rollup/plugin-commonjs
        '.json': 'json',
        // Enable JSX in .js files too
        '.js': 'jsx',
      },
    }),
  ],
}

const nodeConfig = {
  input: 'server/index.js',
  output: [
    {
      file: 'build/server/index.js',
      format: 'cjs',
    },
  ],
  plugins: [
    nodePolyfills(),
    resolve(),
    commonjs(),
    esbuild({
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: false, // default
      minify: process.env.NODE_ENV === 'production',
      target: 'es2017', // default, or 'es20XX', 'esnext'
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      // Like @rollup/plugin-replace
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json', // default
      // Add extra loaders
      loaders: {
        // Add .json files support
        // require @rollup/plugin-commonjs
        '.json': 'json',
        // Enable JSX in .js files too
        '.js': 'jsx',
      },
    }),
  ],
}

export default [browserConfig, nodeConfig]
