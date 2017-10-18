import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import peerDeps from 'rollup-plugin-peer-deps-external'

import multiEntries from './src/build/multiEntries'

const format = process.env.NODE_ENV
const file = `dist/redux-zero.${format}.js`

const config = {
  input: ['./src/index.ts', './src/react/index.ts'],
  name: 'redux-zero',
  sourcemap: true,
  output: {
    file,
    format,
  },
  plugins: [
    multiEntries(),
    peerDeps(),
    typescript(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
  ],
}

export default config
