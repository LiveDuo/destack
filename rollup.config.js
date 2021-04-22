// rollup.config.js
// node-resolve will resolve all the node dependencies
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
// import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  input: 'src/index.js',
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
    resolve({ preferBuiltins: true }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}