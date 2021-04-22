// rollup.config.js
// node-resolve will resolve all the node dependencies
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import css from "rollup-plugin-import-css";
import svg from 'rollup-plugin-svg-import';

// import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  input: 'src/index.js',
  // entrypoints: 'build/index.js',
  output: [{
    file: 'build/index.js',
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