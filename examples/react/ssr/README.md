# Redux Zero SSR Example

Send the initial state from the server
#### Server side
```
	//Sending initial state from the server
	const store = createStore({count: 4})
	const componentString = renderToString(<App {...store}/>)

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
```

#### Client side

```
//Hyderate the client side store using the state sent from the server
const store = createStore(window.__INITIAL_STATE__)

hydrate(<App {...store}/>,document.getElementById('root'))

```


To run this example in
#### Development mode
```
yarn start
```

#### Production mode
```
yarn run start:prod

```
