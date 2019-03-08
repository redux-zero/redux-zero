import Store from "../interfaces/Store";

function createStore<S extends object = any>(): Store<Partial<S>>;
function createStore<S extends object = any>(
  initialState?: S,
  middleware?: any
): Store<S>;
function createStore<S extends object = any>(
  initialState?: Partial<S>,
  middleware?: any
): Store<Partial<S>>;
function createStore<S extends object = any>(
  initialState: Partial<S> | S = {},
  middleware: any = null
): Store<S> | Store<Partial<S>> {
  let state: Partial<S> & object = initialState || {};
  const listeners: Function[] = [];

  function dispatchListeners() {
    listeners.forEach(f => f(state));
  }

  return {
    middleware,
    setState(update: ((state: Partial<S>) => Partial<S>) | Partial<S>) {
      state = {
        ...(state as object),
        ...typeof update === "function" ? update(state) : update as object
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
export default createStore;
