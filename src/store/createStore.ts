import Store from "../interfaces/Store"

export default function createStore(state = {}): Store {
  const listeners = []
  return {
    setState(update) {
      state =
        typeof update === "function"
          ? { ...state, ...update(state) }
          : { ...state, ...update }

      listeners.forEach(f => f(state))
    },
    subscribe(f) {
      listeners.push(f)
      return () => {
        listeners.splice(listeners.indexOf(f), 1)
      }
    },
    getState() {
      return state
    }
  }
}
