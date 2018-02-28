import { h, Component } from "preact";
import { deep } from "preact-render-spy";

import createStore from "../..";
import { Provider } from "../index";

describe("redux-zero - react bindings", () => {
  const listener = jest.fn();
  let store, unsubscribe;
  beforeEach(() => {
    store = createStore({});
    listener.mockReset();
    unsubscribe = store.subscribe(listener);
  });

  describe("Provider", () => {
    it("should provide the store in the apps context", () => {
      store.setState({ message: "hello" });

      const Comp = (props, context) => <h1>{String(!!context.store)}</h1>;

      const App = () => (
        <Provider store={store}>
          <Comp />
        </Provider>
      );

      const context = deep(<App />, { depth: Infinity });

      expect(context.output()).toEqual(<h1>true</h1>);
    });
  });
});
