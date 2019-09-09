import createStore from "../";
import bindAction from "./bindAction";

const syncAction = ({ count }) => ({ count: count + 1 });

const syncActionWithParam = ({ count }, amount) => ({ count: count + amount });

const successAsyncAction = () => {
  return Promise.resolve({ some: "mock data" })
    .then(payload => ({ payload, loading: false }))
    .catch(error => ({ error, loading: false }));
};

const asyncActionWithParam = (state, id) => {
  return Promise.resolve({ some: "mock data", id })
    .then(payload => ({ payload, loading: false }))
    .catch(error => ({ error, loading: false }));
};

const failingAsyncAction = () => {
  return Promise.reject({ message: "I'M ERROR" })
    .then(payload => ({ payload, loading: false }))
    .catch(error => ({ error, loading: false }));
};

describe("bindAction", () => {
  let store, listener;
  beforeEach(() => {
    store = createStore({ count: 0 });
    listener = jest.fn();
    store.subscribe(listener);
  });

  it("should perform sync actions", () => {
    const action = bindAction(syncAction, store);

    action();

    expect(store.getState().count).toBe(1);
  });

  it("should perform sync actions with params", () => {
    const action = bindAction(syncActionWithParam, store);

    action(10);

    expect(store.getState().count).toBe(10);
  });

  it("should perform an async action", () => {
    const action = bindAction(successAsyncAction, store) as (
      ...args: any[]
    ) => Promise<void>;

    return action().then(() => {
      const [SUCCESS_STATE] = listener.mock.calls.map(([call]) => call);

      expect(SUCCESS_STATE.payload).toEqual({ some: "mock data" });
      expect(SUCCESS_STATE.loading).toBe(false);
    });
  });

  it("should perform an async action with params", () => {
    const action = bindAction(asyncActionWithParam, store) as (
      ...args: any[]
    ) => Promise<void>;

    return action(1).then(() => {
      const [SUCCESS_STATE] = listener.mock.calls.map(([call]) => call);

      expect(SUCCESS_STATE.payload).toEqual({ some: "mock data", id: 1 });
      expect(SUCCESS_STATE.loading).toBe(false);
    });
  });

  it("should fail a falling async action", () => {
    const action = bindAction(failingAsyncAction, store) as (
      ...args: any[]
    ) => Promise<void>;

    return action().then(() => {
      const [FAILING_STATE] = listener.mock.calls.map(([call]) => call);

      expect(FAILING_STATE.error).toEqual({ message: "I'M ERROR" });
      expect(FAILING_STATE.loading).toBe(false);
    });
  });
});
