import Store from "../interfaces/Store";
import {
  Action,
  DevTools,
  NextAction,
  Message,
  MessageState,
  ReduxAction
} from "./devtoolsMidleware";

let devTools: DevTools = { instance: null };
let connect;
const nextActions: NextAction[] = [];
const REPLAY_INTERVAL = 10;

function getOrAddAction(action: Action, fn: Function): NextAction {
  let found = (<any>nextActions).find(
    (x: { key: string }) => action.name === x.key
  );
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
      const found = (<any>nextActions).find(
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

function update(message: Message) {
  if (message.type === "DISPATCH") {
    if (
      message.payload.type === "JUMP_TO_ACTION" ||
      message.payload.type === "JUMP_TO_STATE"
    ) {
      (<Store>this).setState(JSON.parse(message.state));
    } else if (message.payload.type === "TOGGLE_ACTION") {
      replay(<Store>this, message);
    }
  }
}

function subscribe(store: Store, middleware: any) {
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
  subscribe(store, devtoolsMiddleware);
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
