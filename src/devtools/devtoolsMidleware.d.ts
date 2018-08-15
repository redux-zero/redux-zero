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
  args: any;
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

export interface DevToolsStore extends Store {
  send: (type: string | ReduxAction, state: object) => void;
}

export interface DevTools {
  instance: DevToolsStore | null;
}
