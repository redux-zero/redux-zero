import React from 'react'
import { hydrate,render } from 'react-dom'
import createStore from 'redux-zero'

import App from 'app/App'

//Hyderate the client side store using the state sent from the server
const store = createStore(window.__INITIAL_STATE__)

hydrate(<App {...store}/>,document.getElementById('root'))


