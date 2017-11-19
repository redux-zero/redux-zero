/**
 * This is a makeshift function for extracting assets from webpack stats object,
 * modules like `webpack-flush-chunks` should be used for production use cases.
 */
export function flushAssets(statsObject) {
	const { assetsByChunkName } = statsObject

	return Object.keys(assetsByChunkName)
			.sort((x,y)=> {if(x == 'bootstrap' || y == 'bootstrap') return 1 })
			.map(assetKey => assetsByChunkName[assetKey]) 
			.map(assetName =>{
				if(typeof assetName == 'string')
					return `<script src="/assets/${assetName}"></script>`
				else {
					return assetName.filter(name => !/\.map$/.test(name))
							.map(name => `<script src="/assets/${name}"></script>`)
							.reduce((a,b)=>a.concat(b),'\n')
				}
			})
			.reduce((a,b)=>a.concat(b),'\n')
	
}