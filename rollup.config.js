import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

const format = process.env.NODE_ENV
const isUmd = format === 'umd'
const REACT = 'react'
const PREACT = 'preact'

function getFileName(file) {
  if (isUmd) {
    return `${file}.min.js`
  }
  return `${file}.js`
}

function getGlobals(file) {
  if (isUmd) {
    if (file.startsWith(REACT)) {
      return { react: 'React' }
    } else if (file.startsWith(PREACT)) {
      return { preact: PREACT }
    }
    return {}
  }
  return {}
}

function getExternals(file) {
  if (file.startsWith(REACT)) {
    return [REACT]
  } else if (file.startsWith(PREACT)) {
    return [PREACT]
  }
  return []
}

function getConfig(input, file) {
  const tsconfig = input.includes(PREACT) ? './src/preact/tsconfig.json' : 'tsconfig.json'

  const conf = {
    input,
    name: 'redux-zero',
    sourcemap: false,
    external: getExternals(file),
    output: {
      file: getFileName(file),
      format,
      globals: getGlobals(file),
    },
    plugins: [
      typescript({ useTsconfigDeclarationDir: true, tsconfig }),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs()
    ],
  }

  isUmd && conf.plugins.push(uglify(), filesize())

  return conf
}

const config = [
  getConfig('./src/index.ts', 'dist/redux-zero'),
  getConfig('./src/preact/index.ts', 'preact/index'),
  getConfig('./src/react/index.ts', 'react/index'),
  getConfig('./src/svelte/index.ts', 'svelte/index'),
  getConfig('./src/vue/index.ts', 'vue/index'),
  getConfig('./src/middleware/index.ts', 'middleware/index'),
  getConfig('./src/utils/index.ts', 'utils/index'),
  getConfig('./src/devtools/index.ts', 'devtools/index'),
]

export default config
