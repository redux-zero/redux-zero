const PATHS = require('./paths')

const commonConfig = {
	context: PATHS.SRC,
	resolve: {
		extensions: [".js", ".css", ".less", ".jsx", ".json"],
		modules: [PATHS.APP, PATHS.CLIENT, PATHS.SERVER, PATHS.NODE_MODULES]
	}
}

module.exports = commonConfig