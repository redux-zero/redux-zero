import set from "./set"

export default function bindActions(actions, store) {
  actions = typeof actions === "function" ? actions(store) : actions

  let bound = {}
  for (let name in actions) {
    bound[name] = (...args) => {
      const action = actions[name]

      if (typeof store.middleware === "function") {
        return store.middleware(store, action, args)
      }

      return set(store, action(store.getState(), ...args))
    }
  }

  return bound
}
