import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import peerDeps from 'rollup-plugin-peer-deps-external'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'
import copy from 'rollup-plugin-copy';

const format = process.env.NODE_ENV
const isUmd = format === 'umd'

function getFileName(file) {
  if (isUmd) {
    return `${file}.min.js`
  }
  return `${file}.js`
}

function getConfig(input, file, sub) {
  const override = { compilerOptions: { declaration: sub ? false : true } };
  const conf = {
    input,
    name: 'redux-zero',
    sourcemap: true,
    output: {
      file: getFileName(file),
      format,
    },
    plugins: [
      peerDeps(),
      typescript({ tsconfigOverride: override }),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs()
    ],
  } 

  isUmd && conf.plugins.push(uglify(), filesize())

  if (!isUmd && sub) {
    console.log('conf.plugins.push', file)
    conf.plugins.push(
      copy(sub)
    )
  }

  return conf
}

const config = [
  getConfig('./src/index.ts', 'dist/redux-zero'),
  getConfig('./src/react/index.ts', 'react/index'),
  getConfig('./src/svelte/index.ts', 'svelte/index', {
    "dist/svelte": "svelte",
    verbose: true
  }),
]

export default config
