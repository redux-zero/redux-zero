import Store from "../interfaces/Store";

export interface NextAction {
  key: string;
  fn: Function;
}

export interface Action {
  type: string;
  name: string;
}

export interface ReduxAction {
  type: string;
  args: any[];
}

export interface MessageState {
  actionsById: {
    [index: string]: {
      action: Action;
    };
  };
  computedStates: Store;
}

export interface Message {
  state: string;
  payload: {
    id: number;
    type: string;
  };
  type: string;
}

interface DevToolsStoreExtraParams {
  send: (type: string | ReduxAction, state: object) => void;
  subscribe: (update?: object) => void;
}

export type DevToolsStore = Pick<
  Store,
  Exclude<keyof Store, keyof DevToolsStoreExtraParams>
> &
  DevToolsStoreExtraParams;

export interface DevTools {
  instance: DevToolsStore | null;
}
