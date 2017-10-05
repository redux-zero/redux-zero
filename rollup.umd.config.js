import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import peerDeps from 'rollup-plugin-peer-deps-external';

export default {
  entry: './src/index.ts',
  moduleName: 'redux-zero',
  sourceMap: true,
  format: 'umd',
  plugins: [
    peerDeps(),
    typescript(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    uglify(),
  ],
  dest: 'dist/redux-zero.min.js',
}
