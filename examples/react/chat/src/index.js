import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'redux-zero/react';

import Routes from './routes'
import store from './store';

import 'tachyons/css/tachyons.min.css';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
