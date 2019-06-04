import set from "./set";
import Store from "../interfaces/Store";
import { Action } from "../types/Actions";

export default function bindActions<S, T extends { [key: string]: Action<S> }>(
  actions: ((store: Store<S>, ownProps) => T) | T,
  store: Store<S>,
  ownProps?: object
): { [K in keyof T]: (...args: any[]) => Promise<void> | void } {
  actions = typeof actions === "function" ? actions(store, ownProps) : actions;

  let bound: { [key: string]: (...args: any[]) => Promise<void> | void } = {};
  for (let name in actions) {
    bound[name] = (...args: any[]) => {
      const action = (actions as T)[name];

      if (typeof store.middleware === "function") {
        return store.middleware(store, action, args);
      }

      return set(store, action(store.getState(), ...args));
    };
  }

  return bound as { [K in keyof T]: (...args: any[]) => Promise<void> | void };
}
