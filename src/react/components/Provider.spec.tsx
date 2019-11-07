import * as React from "react";
import { mount } from "enzyme";

import createStore from "../..";
import Context from "./Context";
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
    it("should provide the store in the apps legacy context", () => {
      store.setState({ message: "hello" });

      class Comp extends React.Component {
        static contextTypes = {
          store: () => null
        };
        render() {
          return <h1>{String(!!this.context.store)}</h1>;
        }
      }

      const App = () => (
        <Provider store={store}>
          <Comp />
        </Provider>
      );
      const wrapper = mount(<App />);

      expect(wrapper.html()).toBe("<h1>true</h1>");
    });

    it("should provide the store in the apps context", () => {
      store.setState({ message: "hello" });

      class Comp extends React.Component {
        render() {
          return (
            <Context.Consumer>
              {store => <h1>{String(!!store)}</h1>}
            </Context.Consumer>
          );
        }
      }

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
