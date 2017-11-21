import React from 'react'
import { renderToString } from 'react-dom/server'
import createStore from 'redux-zero'

import App from 'app/App'
import { flushAssets } from './util'
export default ({ clientStats }) => (req, res) => {

	//Sending initial state from the server
	const store = createStore({count: 4})
	const componentString = renderToString(<App {...store}/>)
	
	//Function to get generated client assets
	const assets = flushAssets(clientStats)
	res.send(`
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8"/>
				<title>Redux Zero SSR Example</title>
			</head>
			<body>
				<div id="root">${componentString}</div>
				<script>window.__INITIAL_STATE__=${JSON.stringify(store.getState())}</script>
				${assets}
			</body>
		</html>
	`)
}