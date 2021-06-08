import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-import-css'
import svg from 'rollup-plugin-svg-import'
import commonjs from '@rollup/plugin-commonjs'

const browserConfig = {
  input: 'src/index.ts',
  // entrypoints: 'build/index.js',
  output: [
    {
      dir: 'build/browser',
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
      minify: true,
      target: 'es2020', // default, or 'es20XX', 'esnext'
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
  input: 'server/index.ts',
  output: [
    {
      dir: 'build/server/',
      format: 'cjs',
    },
  ],
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    esbuild({
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: false, // default
      minify: process.env.NODE_ENV === 'production',
      target: 'es2020', // default, or 'es20XX', 'esnext'
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
