import Store from "../interfaces/Store"

export default function applyMiddleware(...middlewares) {
  return (store: Store, action) => (state, ...args) => {

    if (middlewares.length < 1) {
      return action(store.getState(), ...args)
    }

    const subStore = {
      getState: store.getState,
      setState: store.setState
    }

    const finalAction = middlewares
      .map(m => m(subStore, ...args))
      .reverse()
      .reduce((a, b) => b(a), action => action)

    return typeof finalAction === "function"
      ? finalAction(store.getState(), ...args)
      : null
  }
}
