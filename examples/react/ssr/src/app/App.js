import React from 'react'
import { Provider } from 'redux-zero/react'

import Counter from 'Counter'

function App(store){
	return(
		<Provider store={store}>
			<Counter />
		</Provider>
	)
}

export default App