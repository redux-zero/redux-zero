<h1 align="center">
  <img src="https://s1.postimg.org/7p3dmmc3nz/logo_redux_zero.png" alt="redux zero logo" title="redux zero logo">
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">A lightweight state container based on Redux</p>

> Read [the intro blog post](https://medium.com/@matheusml/introducing-redux-zero-bea42214c7ee)

<hr />

[![build](https://img.shields.io/travis/concretesolutions/redux-zero/master.svg?style=flat-square)](https://travis-ci.org/concretesolutions/redux-zero)
[![npm](https://img.shields.io/npm/v/redux-zero.svg?style=flat-square)](https://www.npmjs.com/package/redux-zero)
[![downloads](https://img.shields.io/npm/dm/redux-zero.svg?style=flat-square)](https://www.npmjs.com/package/redux-zero)
[![license](https://img.shields.io/github/license/concretesolutions/redux-zero.svg?style=flat-square)]()
[![dependencies](https://img.shields.io/david/concretesolutions/redux-zero.svg?style=flat-square)]()


## Table of Contents

- [Installation](#installation)
- [How](#how)
- [Example](#example)
- [Async](#async)
- [Middleware](#middleware)
- [DevTools](#devtools)
- [Inspiration](#inspiration)
- [Roadmap](#roadmap)
- [Docs](#docs)


## Installation

To install the stable version:

```
npm install --save redux-zero
```

This assumes that you’re using [npm](https://www.npmjs.com/) with a module bundler like [webpack](https://webpack.js.org/)

## How

**ES2015+:**

```js
import createStore from "redux-zero"
import { Provider, connect } from "redux-zero/react"
```

**TypeScript:**

```js
import * as createStore from "redux-zero"
import { Provider, connect } from "redux-zero/react"
```

**CommonJS:**

```js
const createStore = require("redux-zero")
const { Provider, connect } = require("redux-zero/react")
```

**UMD:**

```html
<!-- the store -->
<script src="https://unpkg.com/redux-zero/dist/redux-zero.min.js"></script>

<!-- for react -->
<script src="https://unpkg.com/redux-zero/react/index.min.js"></script>

<!-- for preact -->
<script src="https://unpkg.com/redux-zero/preact/index.min.js"></script>

<!-- for vue -->
<script src="https://unpkg.com/redux-zero/vue/index.min.js"></script>

<!-- for svelte -->
<script src="https://unpkg.com/redux-zero/svelte/index.min.js"></script>
```

## Example

Let's make an increment/decrement simple application with React:

First, create your store. This is where your application state will live:

```js
/* store.js */
import createStore from "redux-zero";

const initialState = { count: 1 };
const store = createStore(initialState);

export default store;
```

Then, create your actions. This is where you change the state from your store:

```js
/* actions.js */
const actions = store => ({
  increment: state => ({ count: state.count + 1 }),
  decrement: state => ({ count: state.count - 1 })
});

export default actions;
```

By the way, because the actions are bound to the store, they are just pure functions :)

Now create your component. With **Redux Zero** your component can focus 100% on the UI and just call the actions that will automatically update the state:

```js
/* Counter.js */
import React from "react";
import { connect } from "redux-zero/react";

import actions from "./actions";

const mapToProps = ({ count }) => ({ count });

export default connect(mapToProps, actions)(({ count, increment, decrement }) => (
  <div>
    <h1>{count}</h1>
    <div>
      <button onClick={decrement}>decrement</button>
      <button onClick={increment}>increment</button>
    </div>
  </div>
));
```

Last but not least, plug the whole thing in your index file:

```js
/* index.js */
import React from "react";
import { render } from "react-dom";
import { Provider } from "redux-zero/react";

import store from "./store";

import Counter from "./Counter";

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

render(<App />, document.getElementById("root"));
```

Here's the full version: [https://codesandbox.io/s/n5orzr5mxj](https://codesandbox.io/s/n5orzr5mxj)

### More examples
- [React](https://github.com/concretesolutions/redux-zero/tree/master/examples/react/counter)
- [Preact](https://github.com/concretesolutions/redux-zero/tree/master/examples/preact/counter)
- [React Native](https://github.com/concretesolutions/redux-zero/tree/master/examples/react-native/counter)
- [SSR](https://github.com/concretesolutions/redux-zero/tree/master/examples/react/ssr)
- [Svelte](https://github.com/concretesolutions/redux-zero/tree/master/examples/svelte/counter)
- [Vue](https://github.com/concretesolutions/redux-zero/tree/master/examples/vue/counter)

## Async

Async actions in Redux Zero are almost as simple as sync ones. Here's an example:

```js
const mapActions = ({ setState }) => ({
  getTodos() {
    setState({ loading: true });

    return client.get("/todos")
      .then(payload => ({ payload, loading: false }))
      .catch(error => ({ error, loading: false }))
  }
});
```

They're still pure functions. You'll need to invoke `setState` if you have a loading status. But at the end, it's the same, just return whatever the updated state that you want.

And here's how easy it is to test this:

```js
describe("todo actions", () => {
  let actions, store, listener, unsubscribe;
  beforeEach(() => {
    store = createStore();
    actions = getActions(store);
    listener = jest.fn();
    unsubscribe = store.subscribe(listener);
  });

  it("should fetch todos", () => {
    nock("http://someapi.com/")
      .get("/todos")
      .reply(200, { id: 1, title: "test stuff" });

    return actions.getTodos().then(() => {
      const [LOADING_STATE, SUCCESS_STATE] = listener.mock.calls.map(
        ([call]) => call
      );

      expect(LOADING_STATE.loading).toBe(true);
      expect(SUCCESS_STATE.payload).toEqual({ id: 1, title: "test stuff" });
      expect(SUCCESS_STATE.loading).toBe(false);
    });
  });
});
```

## Middleware

The method signature for the middleware was inspired by redux. The main difference is that action is just a function:

```js
/* store.js */
import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware"

const logger = (store) => (next) => (action) => {
  console.log('current state', store.getState())
  return next(action);
}

const initialState = { count: 1 };
const middlewares = applyMiddleware(
  logger,
  anotherMiddleware
);

const store = createStore(initialState, middlewares);

export default store;
```

## DevTools

You can setup DevTools middleware in store.js to connect with Redux DevTools and inspect states in the store.

```js
/* store.js */
import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { connect } from 'redux-zero/devtools';

const initialState = { count: 1 };
const middlewares = connect ? applyMiddleware(connect(initialState)): [];
const store = createStore(initialState, middlewares);

export default store;
```

Also, these are unofficial tools, maintained by the community:
- [Redux-Zero Tools](https://github.com/nyteshade/rzero-tools)

## Inspiration
**Redux Zero** was based on this [gist](https://gist.github.com/developit/55c48d294abab13a146eac236bae3219) by [@developit](https://github.com/developit)

## Roadmap
- Add more examples (including unit tests, SSR, etc)

## Docs

* [Contributing](https://github.com/concretesolutions/redux-zero/blob/master/CONTRIBUTING.md)
* [Changelog](https://github.com/concretesolutions/redux-zero/blob/master/CHANGELOG.md)
* [Code of Conduct](https://github.com/concretesolutions/redux-zero/blob/master/CODE_OF_CONDUCT.md)
* [License](https://github.com/concretesolutions/redux-zero/blob/master/LICENSE)
