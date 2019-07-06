import * as React from "react";
import { mount } from "enzyme";

import createStore from "../..";
import { Provider } from "../index";
import { useStore } from "./useStore";

describe("redux-zero - react bindings", () => {
  let store;
  beforeEach(() => {
    store = createStore({});
  });

  describe("useStore", () => {
    it("should fetch store from context", () => {
      store.setState({ message: "hello" });

      const Comp = () => {
        const store = useStore();

        return <h1>{String(!!store)}</h1>;
      };

      const App = () => (
        <Provider store={store}>
          <Comp />
        </Provider>
      );
      const wrapper = mount(<App />);

      expect(wrapper.html()).toBe("<h1>true</h1>");
    });
  });
});
