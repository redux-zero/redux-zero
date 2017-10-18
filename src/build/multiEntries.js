// This was added because rollup-plugin-multi-entry is currently not working with
// the latest version of Rollup. I opened this PR (https://github.com/rollup/rollup-plugin-multi-entry/issues/25)
// and it was recommended to simply add the code in while they're fixing it.
// When the fix is done, I'll add the plugin and remove this code

import { promise as matched } from 'matched'

const entry = '\0rollup-plugin-multi-entry:entry-point'

export default function multiEntry(config) {
  let include = []
  let exclude = []
  let exporter = path => `export * from ${JSON.stringify(path)}`

  function configure(config) {
    if (typeof config === 'string') {
      include = [config]
    } else if (Array.isArray(config)) {
      include = config
    } else {
      include = config.include || []
      exclude = config.exclude || []
      if (config.exports === false) {
        exporter = path => `import ${JSON.stringify(path)}`
      }
    }
  }

  if (config) {
    configure(config)
  }

  return {
    options(options) {
      if (options.input && options.input !== entry) {
        configure(options.input)
      }
      options.input = entry
    },

    resolveId(id) {
      if (id === entry) {
        return entry
      }
    },

    load(id) {
      if (id === entry) {
        if (!include.length) {
          return Promise.resolve('')
        }
        const patterns = include.concat(exclude.map(pattern => '!' + pattern))
        return matched(patterns, { realpath: true }).then(paths => paths.map(exporter).join('\n'))
      }
    }
  }
}
