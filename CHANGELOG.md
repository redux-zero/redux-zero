# Changelog

### 5.0.2
- Fixed Provider and connect in preact biddings so they now work for Preact X

### 5.0.1

- Added Redux-Devtools options params

### 5.0.0

**BREAKING CHANGES**
- Add generics to `bindActions()` , `connect()` , `createStore()` , `Provider` , `Store` .
	- Default: any

note:
If using createStore() with partial initial state, it will inferred to incorrect type.

```tsx
import createStore from "redux-zero";

interface ReduxState {
  a: number;
  b: number;
}

const store = createStore({a: 3}); // Store<{a: 3}>
const store = createStore<ReduxState>({a: 3}); // Store<Partial<ReduxState>>
const store = createStore<ReduxState>({a: 3, b: 3}); // Store<ReduxState>
```

### 4.15.2

- Improved `reset` function on the store, now it makes reset to `initialState`
- Fixed `devtoolsMiddleware` imports

### 4.15.1

- Simplify createStore function to improve minimization

### 4.15.0

- Added ownprops to preact actions

### 4.14.0

- Added ownprops as optional argument to the actions creator

### 4.13.6

- Better typing support

### 4.13.5

- Fix deps with npm audit
- Add typescript 3 support

### 4.13.4

- Reverting 4.13.3

### 4.13.3

- React `connect` high order component now propagate connected component statics

### 4.13.2

- Adding some typings

### 4.13.1

- Adding protection to `window` for SSR on devtools

### 4.13.0

- Adding `reset` function to the store

### 4.12.0

- Pass action `args` to middleware and devtools

### 4.11.0

- Add `combineActions` function

```js
import { combineActions } from "redux-zero/utils";
```

### 4.10.1

- Fix bug of devtools middleware - handle async actions

### 4.10.0

- Implement connect HOC decorator for preact

### 4.9.2

- Add hot module reloading support to React `connect()` decorator

### 4.9.1

- Disable generation of source maps

### 4.9.0

- Add DevTools middleware

### 4.8.1

- Fix a bug of middleware

### 4.8.0

- Add bindActions export

```js
import { bindActions } from "redux-zero/utils";
```

### 4.7.0

- Add Vue.js bindings

### 4.6.0

- Adds middleware support:

```js
// a middleware
const logger = store => next => action => {
  console.log("current state", store.getState());
  return next(action);
};

// compose middlewares
const middlewares = applyMiddleware(logger, anotherMiddleware);

const store = createStore({}, middlewares);
```

### 4.5.2

- Fixes bug in which ownProps were not being passed as the second argument to mapToProps inside a connect HOC

### 4.5.1

- Shallow clone mutated object and array in Svelte bindig

### 4.5.0

- Adds Thennable actions. Now we can declare actions as so:

```js
const mapActions = ({ setState }) => ({
  getTodos() {
    setState({ loading: true });

    return client
      .get("/todos")
      .then(payload => ({ payload, loading: false }))
      .catch(error => ({ error, loading: false }));
  }
});
```

### 4.4.3

- Removing peerDependencies from `package.json`

### 4.4.2

- Fix typings, remove unsubscribe from Store interface since isn't used

[info] Using redux-zero along with TypeScript gives an error when implementing:
`<Provider store={store}><Whatever/></Provider>` due to the actual store object
and the expected attribute differ.

- Added Store interface as signature for createStore function.

### 4.4.1

- Fixes Svelte connect function date object change detection

### 4.4.0

- Add Preact bindings

### 4.3.1

- Fixes binding imports with TypeScript

This is now working for both TypeScript and JavaScript:

```javascript
import { Provider } from "redux-zero/react";
```

### 4.3.0

- Add connect function for Svelte and usage example.

### 4.2.1

- Let `mapToProps` function optional

If you don't pass `mapToProps` function to `connect` HOC or `Connect` component, it will inject all state as props at the connected component.

```javascript
const store = createStore({ message: "Hey" });

const App = connect()(({ message }) => <h1>{message}</h1>);
```

### 4.2.0

- Binding actions instead of coupling them to the store.

Right now, actions must import an instance of the store in order to invoke `setState()`, as discussed [here](https://github.com/redux-zero/redux-zero/issues/16). This version solved that problem. Now it's way easier to test the actions, because they are simply pure functions:

```javascript
const createActions = store => ({
  increment: state => ({ count: state.count + 1 })
});

const App = connect(
  mapToProps,
  createActions
)(({ count, increment }) => <button onClick={increment}>{count}</button>);
```

### 4.1.1

- Fixes drawback from the latest release by making `connect` HOC and `Connect` component provide the store as a prop

### 4.1.0

- Include `Connect` component that can be used with a render callback as an alternative to the `connect` HOC

```javascript
import { Connect } from 'redux-zero/react'

// ...

render() {
  return (
    <Connect mapToProps={({ count }) => ({ count })}>
      {({ count }) => <span>{count}</span>}
    </Connect>
  )
}
```

### 4.0.1

- Fixed bug where unsubscribing a listener made listeners ahead be also removed.

### 4.0.0

- Separating `Provider` and `connect` from `createStore`. With this we'll be able to build for different frameworks:

```javascript
import createStore from "redux-zero";
import { Provider, connect } from "redux-zero/react";
```

### 3.0.0

- Removing `unsubscribe` function from createStore. Now `subscribe` returns `unsubscribe`:

```javascript
const store = createStore();

const unsubscribe = store.subscribe();

unsubscribe();
```

### 2.1.0

- Now you can pass a function to `setState`. Example:

```javascript
store.setState(state => {
  return {
    counter: state.counter + 1,
    changed: true
  };
});
```

### 2.0.0

- Changing Provider API to accept store as a prop instead of context.

### 1.1.0

- Removing PropTypes
