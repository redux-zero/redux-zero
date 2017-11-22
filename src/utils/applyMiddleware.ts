import Store from "../interfaces/Store"
import set from "./set"

const finalMiddleware = (store: Store, args) => (action: Function) =>
  set(store, action(store.getState(), ...args))

export default function applyMiddleware(...middlewares) {
  return (store: Store, action: Function, name, args) => {
    if (middlewares.length < 1) {
      return set(store, action(store.getState(), ...args))
    }

    const chain = middlewares
      .reverse()
      .map(m => m(store))
      .reduce((next, m) => m(next), finalMiddleware(store, args))

    return chain(action)
  }
}
