import * as React from "react";
import { mount } from "enzyme";

import createStore from "../..";
import { Provider } from "../index";
import { useActions } from "./useActions";

describe("redux-zero - react bindings", () => {
  let store;
  beforeEach(() => {
    store = createStore({});
  });

  describe("useActions", () => {
    it("should provide an action bound to the store", () => {
      store.setState({ count: 0 });

      const Comp = () => {
        const actions = store => ({
          increment: state => ({ count: state.count + 1 })
        });
        const { increment } = useActions(actions);

        return <button onClick={increment}>Click me</button>;
      };

      const App = () => (
        <Provider store={store}>
          <Comp />
        </Provider>
      );

      const wrapper = mount(<App />);

      expect(store.getState()).toEqual({ count: 0 });

      wrapper.children().simulate("click");
      wrapper.children().simulate("click");

      expect(store.getState()).toEqual({ count: 2 });
    });

    it("should provide an action with parameters bound to the store", () => {
      store.setState({ count: 0 });

      const Comp = () => {
        const actions = store => ({
          incrementOf: (state, value) => ({ count: state.count + value })
        });
        const { incrementOf } = useActions(actions);

        return <button onClick={() => incrementOf(10)}>Click me</button>;
      };

      const App = () => (
        <Provider store={store}>
          <Comp />
        </Provider>
      );

      const wrapper = mount(<App />);

      expect(store.getState()).toEqual({ count: 0 });

      wrapper.children().simulate("click");
      wrapper.children().simulate("click");

      expect(store.getState()).toEqual({ count: 20 });
    });
  });
});
