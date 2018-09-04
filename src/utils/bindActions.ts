import set from "./set";
import Store from "../interfaces/Store";

export default function bindActions(actions: Function, store: Store): any {
  actions = typeof actions === "function" ? actions(store) : actions;

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
