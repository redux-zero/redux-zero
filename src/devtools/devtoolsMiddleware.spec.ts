import createStore from "..";
import bindActions from "../utils/bindActions";
import applyMiddleware from "../middleware/applyMiddleware";
import {
  devtoolsMiddleware,
  update,
  devTools,
  getOrAddAction
} from "./devtoolsMiddleware";

const increment = ({ count }) => ({ count: count + 1 });
const decrement = ({ count }) => ({ count: count - 1 });
const getActions = () => ({
  increment,
  decrement
});

const getAsyncActions = ({ setState }) => ({
  successAsyncAction() {
    setState({ loading: true });

    return Promise.resolve({ some: "mock data" })
      .then(payload => ({ payload, loading: false }))
      .catch(error => ({ error, loading: false }));
  }
});

const jumpToAction = {
  type: "DISPATCH",
  payload: { type: "JUMP_TO_ACTION" },
  state: '{"count":2}'
};
const jumpToState = {
  type: "DISPATCH",
  payload: { type: "JUMP_TO_STATE" },
  state: '{"count":4}'
};
const toggleAction = {
  type: "DISPATCH",
  payload: { type: "TOGGLE_ACTION", id: 1 },
  state: `{"actionsById":{"0":{"action":{"type":"initialState"},"timestamp":1514964802390,"type":"PERFORM_ACTION"},
    "1":{"action":{"type":"increment"},"timestamp":1514964812877,"type":"PERFORM_ACTION"},
    "2":{"action":{"type":"decrement"},"timestamp":1514964817322,"type":"PERFORM_ACTION"}},
    "computedStates":[{"state":{"count":1}},{"state":{"count":2}},{"state":{"count":1}}],
    "currentStateIndex":2,"nextActionId":3,"skippedActionIds":[],"stagedActionIds":[0,1,2]}`
};

jest.useFakeTimers();

describe("devtoolsMiddleware", () => {
  it("should jump to new action", () => {
    const store = createStore({ count: 0 });
    const storeUpdate = update.bind(store);

    storeUpdate(jumpToAction);
    expect(store.getState()).toEqual({ count: 2 });
  });
  it("should jump to new state", () => {
    const store = createStore({ count: 0 });
    const storeUpdate = update.bind(store);

    storeUpdate(jumpToState);
    expect(store.getState()).toEqual({ count: 4 });
  });

  it("should replay actions to current action", () => {
    const initialState = { count: 1 };
    const middlewares = applyMiddleware(devtoolsMiddleware);

    const store = createStore(initialState, middlewares);
    const actions = bindActions(getActions, store);

    devTools.instance = { send: () => {}, subscribe: () => {} };

    Object.keys(actions).forEach(key => {
      getOrAddAction({ name: key }, actions[key]);
    });
    expect(store.getState().count).toBe(1);

    const storeUpdate = update.bind(store);
    storeUpdate(toggleAction);
    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(store.getState()).toEqual({ count: 2 });

    const toggleAction2 = { ...toggleAction };
    toggleAction2.payload.id = 2;
    storeUpdate(toggleAction2);
    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(2 + 3);
    expect(store.getState()).toEqual({ count: 1 });
  });
});

describe("sendActions", () => {
  let store, listener, middlewares;
  beforeEach(() => {
    devtoolsMiddleware.initialized = false;
    middlewares = applyMiddleware(devtoolsMiddleware);
    store = createStore({ count: 1 }, middlewares);
    listener = jest.fn();
    store.subscribe(listener);
  });

  it("should send actions to store", () => {
    const actions = bindActions(getActions, store);
    let sendCalled = false;
    let subscribeCalled = false;

    devTools.instance = {
      send: () => (sendCalled = true),
      subscribe: () => (subscribeCalled = true)
    };
    actions.increment();

    expect(store.getState().count).toBe(2);
    expect(sendCalled).toBe(true);
    expect(subscribeCalled).toBe(true);
  });

  it("should send async actions to store", done => {
    const actions = bindActions(getAsyncActions, store);
    let sendCalled = false;
    let subscribeCalled = false;

    devTools.instance = {
      send: () => (sendCalled = true),
      subscribe: () => (subscribeCalled = true)
    };

    actions.successAsyncAction().then(() => {
      const [LOADING_STATE, SUCCESS_STATE] = listener.mock.calls.map(
        ([call]) => call
      );

      expect(LOADING_STATE.loading).toBe(true);
      expect(SUCCESS_STATE.payload).toEqual({ some: "mock data" });
      expect(SUCCESS_STATE.loading).toBe(false);

      expect(sendCalled).toBe(true);
      expect(subscribeCalled).toBe(true);

      done();
    });
  });
});
