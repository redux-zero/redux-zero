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

let devTools: DevTools = { instance: null };
let connect;
const nextActions: NextAction[] = [];
const REPLAY_INTERVAL = 10;

function getOrAddAction(action: Action, fn: Function): NextAction {
  let found = nextActions.find((x: { key: string }) => action.name === x.key);
  if (!found) {
    found = { key: action.name, fn };
    nextActions.push(found);
  }
  return found;
}

function replay(store: Store, message: Message): void {
  const state: MessageState = JSON.parse(message.state);
  const runAction = (action: Action) => {
    if (action.type === "initialState") {
      store.setState(state.computedStates[0].state);
    } else {
      const found = nextActions.find(
        (x: { key: string }) => action.type === x.key
      );
      if (found) {
        found.fn();
      }
    }
  };
  const keys = Object.keys(state.actionsById).filter(
    x => parseInt(x, 10) <= message.payload.id
  );
  let i = 0;
  setTimeout(function run() {
    runAction(state.actionsById[keys[i]].action);
    if (++i >= keys.length) return;
    setTimeout(run, REPLAY_INTERVAL);
  }, 0);
}

function update<T extends Store>(this: T, message: Message) {
  if (message.type === "DISPATCH") {
    if (
      message.payload.type === "JUMP_TO_ACTION" ||
      message.payload.type === "JUMP_TO_STATE"
    ) {
      this.setState(JSON.parse(message.state));
    } else if (message.payload.type === "TOGGLE_ACTION") {
      replay(this, message);
    }
  }
}

function subscribe(store: Store, middleware: { initialized?: boolean }) {
  if (!middleware.initialized) {
    const storeUpdate = update.bind(store);
    if (devTools.instance) {
      devTools.instance.subscribe(storeUpdate);
    }
    middleware.initialized = true;
  }
}

const devtoolsMiddleware = (store: Store) => (next: Function, args: any) => (
  action: Action
) => {
  let result = next(action);
  subscribe(store, devtoolsMiddleware as { initialized?: boolean });
  getOrAddAction(action, () => next(action));
  const reduxAction: ReduxAction = { type: action.name, args: args };
  if (result && result.then) {
    return result.then(
      () =>
        devTools.instance &&
        devTools.instance.send(reduxAction, store.getState())
    );
  }
  if (devTools.instance) {
    devTools.instance.send(reduxAction, store.getState());
  }
  return result;
};

if (typeof window === "object" && (<any>window).__REDUX_DEVTOOLS_EXTENSION__) {
  connect = function(initialState: object) {
    devTools.instance = (<any>window).__REDUX_DEVTOOLS_EXTENSION__.connect();
    if (devTools.instance) {
      devTools.instance.send("initialState", initialState);
    }
    return devtoolsMiddleware;
  };
}

export { devtoolsMiddleware, connect, update, devTools, getOrAddAction };
