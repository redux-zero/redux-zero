import Store from "../interfaces/Store"
import set from "../utils/set"

const finalMiddleware = (store: Store, args) => (action: Function) =>
  set(store, action(store.getState(), ...args))

export default function applyMiddleware(...middlewares) {
  return (store: Store, action: Function, args) => {
    if (middlewares.length < 1) {
      return set(store, action(store.getState(), ...args))
    }

    const chain = middlewares
      .reverse()
      .map(middleware => middleware(store))
      .reduce(
        (next, middleware) => middleware(next),
        finalMiddleware(store, args)
      )

    return chain(action)
  }
}
