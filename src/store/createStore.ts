import Store from "../interfaces/Store";

export default function createStore(
  initialState: object = {},
  middleware: any = null
): Store {
  let state = initialState || {};
  const listeners: Function[] = [];

  function dispatchListeners() {
    listeners.forEach(f => f(state));
  }

  return {
    middleware,
    setState(update: Function | object) {
      state = {
        ...state,
        ...typeof update === "function" ? update(state) : update
      };

      dispatchListeners();
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
      state = initialState;
      dispatchListeners();
    }
  };
}
