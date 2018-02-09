import React from 'react';
import { Provider } from 'redux-zero/react';

import store from './store';

import Counter from './Counter';

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

export default App;
