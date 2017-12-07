const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

const nodeEnv = process.env.NODE_ENV || 'development';

export default {
  input: 'app.js',
  name: 'counterVue',
  output: {
    file: 'public/bundle.js',
    format: 'umd'
  },
  sourcemap: true,
  plugins: [
    nodeResolve({ 
    	jsnext: true, 
    	main: true,
    	browser: true
    }),
	  commonjs(),
    vue({
      compileTemplate: true,
      css: 'public/bundle.css'
    }),
    buble(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    })
  ]
};