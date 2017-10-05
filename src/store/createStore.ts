export default function createStore(state = {}) {
  const listeners = []
  return {
    setState(update) {
      state = { ...state, ...update }
      listeners.forEach(f => f(state))
    },
    subscribe(f) {
      listeners.push(f)
    },
    unsubscribe(f) {
      const i = listeners.indexOf(f)
      if (i > -1) {
        listeners.splice(i, 1)
      }
    },
    getState() {
      return state
    }
  }
}
