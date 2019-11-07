import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import createStore from "../..";
import { Provider } from "../index";
import { useSelector } from "./useSelector";

describe("redux-zero - react bindings", () => {
  let store;
  beforeEach(() => {
    store = createStore({});
  });

  describe("useSelector", () => {
    it("should provide the state and subscribe to changes", () => {
      store.setState({ message: "hello" });

      const Comp = () => {
        const message = useSelector(({ message }) => message);

        return <h1>{message}</h1>;
      };

      const App = () => (
        <Provider store={store}>
          <Comp />
        </Provider>
      );

      let wrapper: any;

      act(() => {
        wrapper = mount(<App />);
      });

      expect(wrapper.html()).toBe("<h1>hello</h1>");

      act(() => {
        store.setState({ message: "bye" });
      });

      expect(wrapper.html()).toBe("<h1>bye</h1>");
    });
  });
});
