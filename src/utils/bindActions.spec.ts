import createStore from "../";
import bindActions from "./bindActions";

const getActions = ({ setState }) => ({
  syncAction: ({ count }) => ({ count: count + 1 }),
  syncActionWithParam: ({ count }, amount) => ({ count: count + amount }),
  successAsyncAction() {
    setState({ loading: true });

    return Promise.resolve({ some: "mock data" })
      .then(payload => ({ payload, loading: false }))
      .catch(error => ({ error, loading: false }));
  },
  asyncActionWithParam(state, id) {
    setState({ loading: true });

    return Promise.resolve({ some: "mock data", id })
      .then(payload => ({ payload, loading: false }))
      .catch(error => ({ error, loading: false }));
  },
  failingAsyncAction() {
    setState({ loading: true });

    return Promise.reject({ message: "I'M ERROR" })
      .then(payload => ({ payload, loading: false }))
      .catch(error => ({ error, loading: false }));
  }
});

describe("bindActions", () => {
  let actions, store, listener;
  beforeEach(() => {
    store = createStore({ count: 0 });
    listener = jest.fn();
    store.subscribe(listener);
    actions = bindActions(getActions, store);
  });

  it("should perform sync actions", () => {
    actions.syncAction();

    expect(store.getState().count).toBe(1);
  });

  it("should perform sync actions with params", () => {
    actions.syncActionWithParam(10);

    expect(store.getState().count).toBe(10);
  });

  it("should perform an async action", () =>
    actions.successAsyncAction().then(() => {
      const [LOADING_STATE, SUCCESS_STATE] = listener.mock.calls.map(
        ([call]) => call
      );

      expect(LOADING_STATE.loading).toBe(true);
      expect(SUCCESS_STATE.payload).toEqual({ some: "mock data" });
      expect(SUCCESS_STATE.loading).toBe(false);
    }));

  it("should perform an async action with params", () =>
    actions.asyncActionWithParam(1).then(() => {
      const [LOADING_STATE, SUCCESS_STATE] = listener.mock.calls.map(
        ([call]) => call
      );

      expect(LOADING_STATE.loading).toBe(true);
      expect(SUCCESS_STATE.payload).toEqual({ some: "mock data", id: 1 });
      expect(SUCCESS_STATE.loading).toBe(false);
    }));

  it("should fail a falling async action", () =>
    actions.failingAsyncAction().then(() => {
      const [LOADING_STATE, FAILING_STATE] = listener.mock.calls.map(
        ([call]) => call
      );

      expect(LOADING_STATE.loading).toBe(true);
      expect(FAILING_STATE.error).toEqual({ message: "I'M ERROR" });
      expect(FAILING_STATE.loading).toBe(false);
    }));
});
