const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const commonConfig = require('./common.config')
const PATHS = require('./paths')
const isProduction = process.env.NODE_ENV === 'production'
const babelConfig = require('../babelConfig')

const serverConfig = Object.assign({}, {
	target: 'node',

	name: 'server',

	externals:[nodeExternals()],

	entry: {
		main: PATHS.SERVER
	},

	output: {
		path: PATHS.SERVER_BUILD,
		filename: '[name].js',
		libraryTarget: 'commonjs2'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: babelConfig()
				}
			}
		]
	},

	plugins: isProduction ? [
		new webpack.DefinePlugin({
			__DEV__: false,
			__PROD__: true,
			__SERVER__: true,
			__CLIENT__: false,
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	] : [
		new webpack.DefinePlugin({
			__DEV__: true,
			__PROD__: false,
			__SERVER__: true,
			__CLIENT__: false,
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	]
},commonConfig)

module.exports = serverConfig