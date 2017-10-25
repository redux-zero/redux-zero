# Changelog

### 4.2.0

- Binding actions instead of coupling them to the store.

Right now, actions must import an instance of the store in order to invoke `setState()`, as discussed [here](https://github.com/concretesolutions/redux-zero/issues/16). This version solved that problem. Now it's way easier to test the actions, because they are simply pure functions:

```javascript
const createActions = store => ({
  increment: state => ({ count: state.count + 1 }),
})

const App = connect(mapToProps, createActions)(
  ({ count, increment }) => (
    <button onClick={increment}>{count}</button>
  )
)
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
import createStore from 'redux-zero'
import { Provider, connect } from 'redux-zero/react'
```

### 3.0.0

- Removing `unsubscribe` function from createStore. Now `subscribe` returns `unsubscribe`:

```javascript
const store = createStore()

const unsubscribe = store.subscribe()

unsubscribe()
```

### 2.1.0

- Now you can pass a function to `setState`. Example:

```javascript
store.setState((state) => {
  return {
    counter: state.counter + 1,
    changed: true,
  };
});
```

### 2.0.0

- Changing Provider API to accept store as a prop instead of context.

### 1.1.0
- Removing PropTypes
