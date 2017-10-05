import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import peerDeps from 'rollup-plugin-peer-deps-external';

export default {
  entry: './src/index.ts',
  moduleName: 'redux-zero',
  sourceMap: true,
  format: 'es',
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
  dest: 'dist/redux-zero.es.js',
}
