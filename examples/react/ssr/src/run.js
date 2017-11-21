const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('../webpack/client.config')
const serverConfig = require('../webpack/server.config')
const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT
const app = express()
const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path

let isBuilt = false
const done = () =>
!isBuilt &&
app.listen(process.env.PORT, () => {
	isBuilt = true
	
	console.log(
		"Build complete -- Listening @ localhost:",
		process.env.PORT,
		"\nNODE_ENV: ",
		process.env.NODE_ENV
	)
})
if(!isProduction){
	const compiler = webpack([clientConfig, serverConfig])
	const clientCompiler = compiler.compilers[0]
	app.use(webpackDevMiddleware(compiler))
	app.use(webpackHotMiddleware(clientCompiler))
	app.use(webpackHotServerMiddleware(compiler))
	compiler.plugin('done',done)
} else {
	webpack([clientConfig,serverConfig]).run((err, stats) => {
		if(err) console.error(err)
		
		const clientStats = stats.toJson().children[0]
		const serverRender = require('../build/main.js').default
		
		app.use(publicPath,express.static(outputPath))
		app.use(serverRender({clientStats}))
		done()
	})
}


