var tsc = require('typescript');
var tsConfig = require('./tsconfig.json');

module.exports = {
  process(src, path) {
    console.log(path)
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      return tsc.transpile(
        src,
        tsConfig.compilerOptions,
        path,
        []
      );
    }
    return src;
  },
};
