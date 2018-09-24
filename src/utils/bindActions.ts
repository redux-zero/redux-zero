import set from "./set";
import Store from "../interfaces/Store";

export default function bindActions(
  actions: Function,
  store: Store,
  ownProps?: object
): any {
  actions = typeof actions === "function" ? actions(store, ownProps) : actions;

  let bound = {};
  for (let name in actions) {
    bound[name] = (...args: any[]) => {
      const action = actions[name];

      if (typeof store.middleware === "function") {
        return store.middleware(store, action, args);
      }

      return set(store, action(store.getState(), ...args));
    };
  }

  return bound;
}
