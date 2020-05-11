import bindAction from "./bindAction";
import Store from "../interfaces/Store";
import { Action } from "../types";

type OmitFirstArg<F, R> = F extends (x: any, ...args: infer P) => any ? (...args: P) => R : never;

export default function bindActions<S, T extends { [key: string]: Action<S> }>(
  actions: ((store: Store<S>, ownProps) => T) | T,
  store: Store<S>,
  ownProps?: object
): { [K in keyof T]: OmitFirstArg<T[K], Promise<void> | void> } {
  actions = typeof actions === "function" ? actions(store, ownProps) : actions;

  let bound: { [key: string]: (...args: any[]) => Promise<void> | void } = {};
  for (let name in actions) {
    const action = (actions as T)[name];

    bound[name] = bindAction(action, store);
  }

  return bound as { [K in keyof T]: OmitFirstArg<T[K], Promise<void> | void> };
}
