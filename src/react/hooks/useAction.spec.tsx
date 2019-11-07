import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import createStore from "../..";
import { connect, Provider } from "../index";
import { useSelector } from "./useSelector";
import { useAction } from "./useAction";

describe("redux-zero - react bindings", () => {
  let store;
  beforeEach(() => {
    store = createStore({});
  });

  describe("useAction", () => {
    it("should provide an action bound to the store", () => {
      store.setState({ count: 0 });

      const Comp = () => {
        const increment = useAction(({ count }) => ({ count: count + 1 }));

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
        const incrementOf = useAction(({ count }, value) => ({
          count: count + value
        }));

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
