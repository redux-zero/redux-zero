import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import peerDeps from 'rollup-plugin-peer-deps-external';

const format = process.env.NODE_ENV;
const isUmd = format === 'umd';
const file = `dist/redux-zero.${isUmd ? 'min' : format}.js`

const config = {
  input: './src/index.ts',
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
};

isUmd && config.plugins.push(uglify());

export default config;
