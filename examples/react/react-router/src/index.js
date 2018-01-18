import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'redux-zero/react';

import store from './store';
import App from './App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
