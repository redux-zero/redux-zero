const webpack = require('webpack')
const commonConfig = require('./common.config')
const PATHS = require('./paths')
const isProduction = process.env.NODE_ENV === 'production'
const babelConfig = require('../babelConfig')
const clientConfig = Object.assign({}, {
	name: 'client',

	target: 'web',

	devtool: isProduction ? 'source-map' : 'source-map',

	entry: isProduction ? {
		main: PATHS.CLIENT
	} : [
		'webpack-hot-middleware/client?name=client&path=/__webpack_hmr&timeout=20000&reload=false&quiet=false',
		PATHS.CLIENT
	],

	devServer: isProduction ? {} : {
		contentBase: PATHS.PUBLIC,
		compress: true,
		port: 8081,
		color: true,
		disableHostCheck: true, 
		host: "0.0.0.0",
		hot: true,
		noInfo: true,
		overlay: true
	},

	output: Object.assign({},{
		path: PATHS.PUBLIC,
		publicPath:'/assets/'
	}, isProduction ? {
		filename: 'js/[name].[chunkhash].js',
		chunkFilename: 'js/[name].[chunkhash].js'
	} : {
		filename: '[name].js',
		chunkFilename:'[name].js'
	}),

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

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: module => {
				return (
					module.context &&
					module.context.indexOf("node_modules") !== -1
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "bootstrap",
			minChunks: Infinity
		})
	].concat(isProduction ? [
		new webpack.DefinePlugin({
			__DEV__: false,
			__PROD__: true,
			__SERVER__: false,
			__CLIENT__: true,
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.UglifyJsPlugin()
	] : [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			__DEV__: true,
			__PROD__: false,
			__SERVER__: false,
			__CLIENT__: true,
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	])
},commonConfig)

module.exports = clientConfig

