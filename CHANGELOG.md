# Changelog

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
