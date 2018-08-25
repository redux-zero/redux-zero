import Store from "../interfaces/Store";

export default function createStore(
  state: object = {},
  middleware: any = null
): Store {
  const listeners: Function[] = [];
  return {
    middleware,
    setState(update: Function | object) {
      state =
        typeof update === "function"
          ? { ...state, ...update(state) }
          : { ...state, ...update };

      listeners.forEach(f => f(state));
    },
    subscribe(f: Function) {
      listeners.push(f);
      return () => {
        listeners.splice(listeners.indexOf(f), 1);
      };
    },
    getState() {
      return state;
    },
    reset() {
      state = {};
    }
  };
}
