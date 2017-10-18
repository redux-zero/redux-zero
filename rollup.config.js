import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import peerDeps from 'rollup-plugin-peer-deps-external'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

const format = process.env.NODE_ENV
const isUmd = format === 'umd'

function getConfig(input, file) {
  const conf = {
    input,
    name: 'redux-zero',
    sourcemap: true,
    output: {
      file: `${file}.${isUmd ? 'min' : format}.js`,
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

  isUmd && conf.plugins.push(uglify(), filesize())

  return conf
}

const config = [
  getConfig('./src/index.ts', 'dist/redux-zero'),
  getConfig('./src/react/index.ts', 'dist/react/redux-zero'),
]

export default config
