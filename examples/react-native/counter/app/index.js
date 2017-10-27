import React from 'react';
import { Provider } from "redux-zero/react";
import Counter from './Counter';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
