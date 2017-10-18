import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import peerDeps from 'rollup-plugin-peer-deps-external'

const format = process.env.NODE_ENV

function getConfig(input, file) {
  return {
    input,
    name: 'redux-zero',
    sourcemap: true,
    output: {
      file,
      format,
    },
    plugins: [
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
}

const config = [
  getConfig('./src/index.ts', `dist/redux-zero.${format}.js`),
  getConfig('./src/react/index.ts', `dist/react/redux-zero.${format}.js`),
]

export default config
