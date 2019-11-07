import set from "./set";
import Store from "../interfaces/Store";
import { Action } from "../types/Actions";

export default function bindAction<S>(action: Action<S>, store: Store<S>) {
  return (...args: any[]) => {
    if (typeof store.middleware === "function") {
      return store.middleware(store, action, args);
    }

    return set(store, action(store.getState(), ...args));
  };
}
