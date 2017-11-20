const { join,sep } = require('path')
const pathJoin = p => join(__dirname,'..',p)

module.exports = {
	NODE_MODULES: pathJoin('node_modules'),
	CLIENT: pathJoin(`src${sep}client`),
	SERVER: pathJoin(`src${sep}server`),
	SRC: pathJoin('src'),
	APP: pathJoin(`src${sep}app`),
	PUBLIC: pathJoin(`public`),
	SERVER_BUILD: pathJoin(`build`)
}