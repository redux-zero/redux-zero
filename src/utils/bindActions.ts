export default function bindActions(actions, store) {
  actions = typeof actions === "function" ? actions(store) : actions

  let bound = {}
  for (let name in actions) {
    bound[name] = (...args) => {
      let ret = actions[name](store.getState(), ...args)
      if (ret != null) {
        if (ret.then) return ret.then(store.setState)
        store.setState(ret)
      }
    }
  }

  return bound
}
