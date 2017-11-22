export default function bindActions(actions, store) {
  actions = typeof actions === "function" ? actions(store) : actions

  let bound = {}
  for (let name in actions) {
    bound[name] = (...args) => {
      const action =
        typeof store.middleware === "function"
          ? store.middleware(store, actions[name])
          : actions[name]

      const ret = action(store.getState(), ...args)

      if (ret != null) {
        if (ret.then) return ret.then(store.setState)
        store.setState(ret)
      }
    }
  }

  return bound
}
