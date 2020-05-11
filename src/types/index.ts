import Store from "../interfaces/Store";

export type Action<S> = (state: S, ...args: any[]) => Promise<Partial<S>> | Partial<S>;
export type FuncTypeWithoutFirstArg<
  T extends (...args: any[]) => any
> = T extends (arg1: infer U, ...args: infer V) => infer Q
  ? (...args: V) => void
  : any;
export type ActionsObject<S> = { [action: string]: Action<S> };
export type Actions<T> = (store: Store<T>) => ActionsObject<T>;
export type BoundActions<State, T extends Actions<State>> = {
  [P in keyof ReturnType<T>]: FuncTypeWithoutFirstArg<ReturnType<T>[P]>
};
