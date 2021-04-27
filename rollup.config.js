import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import css from "rollup-plugin-import-css";
import svg from 'rollup-plugin-svg-import';
import commonjs from '@rollup/plugin-commonjs';

import nodePolyfills from 'rollup-plugin-node-polyfills';

const browserConfig = {
  input: 'src/index.js',
  // entrypoints: 'build/index.js',
  output: [{
    file: 'build/browser/index.js',
    format: 'cjs'
  }],
  // All the used libs needs to be here
  external: [
    'react'
  ],
  plugins: [
    // nodePolyfills(),
    svg({ stringify: false }),
    css(),
    resolve({ preferBuiltins: true }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    })
  ]
}

const nodeConfig = {
  input: 'server/index.js',
  output: [{
    file: 'build/server/index.js',
    format: 'cjs'
  }],
  plugins: [
    nodePolyfills(),
    resolve(), 
    commonjs(),
    babel({babelHelpers: 'bundled'})
  ]
}

export default [browserConfig, nodeConfig]
