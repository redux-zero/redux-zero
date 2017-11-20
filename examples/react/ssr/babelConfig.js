module.exports = () => {
	return {
		presets: [
			[
				"env",
				{
					targets: {
						browsers: ["> 5%"],
						node: "8.7.0"
					},
					modules: false
				}
			],
			"react"
		],
		plugins:[
			[
				"module-resolver",
				{
					root: ["./src"]
				}
			]
		],
		env: {
			production: {
				plugins: ["transform-react-remove-prop-types"]
			}
		}
	}
}
