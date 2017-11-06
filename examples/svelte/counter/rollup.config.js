import svelte from 'rollup-plugin-svelte';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import tscompile from 'typescript';
import replace from 'rollup-plugin-replace';

const nodeEnv = process.env.NODE_ENV || 'development';

const plugins = [ 
    typescript({typescript: tscompile}),
    nodeResolve({ 
    	jsnext: true, 
    	main: true,
    	browser: true
    }),
	commonjs(),

	svelte({
		include: ['src/**/*.html'],
		exclude: 'src/**/*.ts'
	}),
	
	replace({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    })
];

export default {
	input: './src/main.ts',
	output: {
		file: './public/bundle.js',
		format: 'iife',
	},	
	plugins,
	sourceMap: false
};
