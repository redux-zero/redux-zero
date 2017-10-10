# redux-zero

### A lightweight state container based on Redux

- Single store
- No reducers
- Less boilerplate
- No PropTypes
- Smaller and simpler than [redux](https://github.com/reactjs/redux)
- Written in TypeScript

![](http://img.badgesize.io/concretesolutions/redux-zero/master/dist/redux-zero.min.js?style=flat-square)
![](http://img.badgesize.io/concretesolutions/redux-zero/master/dist/redux-zero.min.js?compression=gzip&style=flat-square)
[![build](https://img.shields.io/travis/concretesolutions/redux-zero/master.svg?style=flat-square)](https://travis-ci.org/concretesolutions/redux-zero)
[![npm](https://img.shields.io/npm/v/redux-zero.svg?style=flat-square)](https://www.npmjs.com/package/redux-zero)
[![downloads](https://img.shields.io/npm/dm/redux-zero.svg?style=flat-square)](https://www.npmjs.com/package/redux-zero)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)]()
[![dependencies](https://img.shields.io/david/expressjs/express.svg?style=flat-square)]()

## Installation

To install the stable version:

```
npm install --save redux-zero
```

This assumes that you’re using [npm](https://www.npmjs.com/) with a module bundler like [Webpack](http://webpack.github.io)

## How

**ES2015+ or TypeScript:**

```js
import { createStore, Provider, connect } from 'redux-zero'
```

**CommonJS:**

```js
var createStore = require('redux-zero').createStore;
var Provider = require('redux-zero').Provider;
var connect = require('redux-zero').connect;
```

**UMD:**

```html
<script src="https://unpkg.com/redux-zero/dist/redux-zero.min.js"></script>
```

## Example

Let's make an increment/decrement simple application:

First create your store. This is where your application state will live:

```js
/* store.js */
import { createStore } from 'redux-zero';

const initialState = { count: 1 };
const store = createStore(initialState);

export default store;
```

Then create your actions. This is where you change the state from your store:

```js
/* actions.js */
import store from "./store";

export const increment = () => {
  store.setState({
    count: store.getState().count + 1
  })
}

export const decrement = () => {
  store.setState({
    count: store.getState().count - 1
  })
}
```

Now create your component. With **redux-zero** your component can focus 100% on the UI and just call the actions that will automatically update the state:

```js
/* Counter.js */
import React from "react";
import { connect } from "redux-zero";

import { increment, decrement } from "./actions";

const mapToProps = ({ count }) => ({ count });

export default connect(mapToProps)(({ count }) => (
  <div>
    <h1>{count}</h1>
    <div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  </div>
));
```

Last but not least, plug the whole thing in your index file:

```js
/* index.js */
import React from "react";
import { render } from "react-dom";
import { Provider } from "redux-zero";

import store from "./store";

import Counter from "./Counter";

const App = () => (
  <Provider context={{ store }}>
    <Counter />
  </Provider>
);

render(<App />, document.getElementById("root"));
```

Here's the full version: [https://codesandbox.io/s/n5orzr5mxj](https://codesandbox.io/s/n5orzr5mxj)

## Inspiration
**redux-zero** was based on this [gist](https://gist.github.com/developit/55c48d294abab13a146eac236bae3219) by [@developit](https://github.com/developit)

## Roadmap
- Improve integration with Preact
- Remove the context API

## Docs

* [Contributing](https://github.com/concretesolutions/redux-zero/blob/master/CONTRIBUTING.md)
* [Changelog](https://github.com/concretesolutions/redux-zero/blob/master/CHANGELOG.md)
* [Code of Conduct](https://github.com/concretesolutions/redux-zero/blob/master/CODE_OF_CONDUCT.md)
* [License](https://github.com/concretesolutions/redux-zero/blob/master/LICENSE.md)
