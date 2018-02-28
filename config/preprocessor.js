const tsc = require("typescript");

module.exports = {
  process(src, path) {
    const config = /preact/.test(path)
      ? require("../src/preact/tsconfig.json")
      : require("../tsconfig.json");

    return /\.tsx?$/.test(path)
      ? tsc.transpile(src, config.compilerOptions, path, [])
      : src;
  }
};
