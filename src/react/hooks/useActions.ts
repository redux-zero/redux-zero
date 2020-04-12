import { useAction } from "./useAction";
import { useStore } from "./useStore";

import { Action } from "../../types";
import Store from "../../interfaces/Store";

type ActionMap<S> = {
  [key: string]: Action<S>;
};

type ActionBindFunction<S> = (store: Store<S>) => ActionMap<S>;

export function useActions<S>(actions: ActionBindFunction<S>): ActionMap<S> {
  const store = useStore();
  const connectedActions = actions(store);

  const bound = {};
  Object.keys(connectedActions).forEach(key => {
    let action = connectedActions[key];
    let actionHook = useAction(action);
    bound[key] = actionHook;
  });
  return bound;
}
