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
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)]()
[![dependencies](https://img.shields.io/david/expressjs/express.svg?style=flat-square)]()


- Single store
- No reducers
- Less boilerplate
- No PropTypes
- Smaller and simpler than [redux](https://github.com/reactjs/redux)
- Written in TypeScript


## Installation

To install the stable version:

```
npm install --save redux-zero
```

This assumes that you’re using [npm](https://www.npmjs.com/) with a module bundler like [Webpack](https://webpack.js.org/)

## How

**ES2015+ or TypeScript:**

```js
import createStore from "redux-zero"
import { Provider, connect } from "redux-zero/react"
```

**CommonJS:**

```js
const createStore = require("redux-zero")
const { Provider, connect } = require("redux-zero/react")
```

**UMD:**

```html
<script src="https://unpkg.com/redux-zero/dist/redux-zero.min.js"></script>
<script src="https://unpkg.com/redux-zero/react/index.min.js"></script>
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
export const actions = store => ({
  increment: state => ({ count: state.count + 1 }),
  decrement: state => ({ count: state.count - 1 })
})
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

## Inspiration
**Redux Zero** was based on this [gist](https://gist.github.com/developit/55c48d294abab13a146eac236bae3219) by [@developit](https://github.com/developit)

## Roadmap
- Add more use case examples (including unit tests, SSR, etc)
- Add Preact bindings

## Tools
These are unofficial tools, maintained by the community:
- [Redux-Zero Tools](https://github.com/nyteshade/rzero-tools)

## Docs

* [Contributing](https://github.com/concretesolutions/redux-zero/blob/master/CONTRIBUTING.md)
* [Changelog](https://github.com/concretesolutions/redux-zero/blob/master/CHANGELOG.md)
* [Code of Conduct](https://github.com/concretesolutions/redux-zero/blob/master/CODE_OF_CONDUCT.md)
* [License](https://github.com/concretesolutions/redux-zero/blob/master/LICENSE.md)
