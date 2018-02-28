import * as Vue from "vue/dist/vue.common";
import createStore from "../..";
import { connect } from "..";

describe("redux-zero - vue bindings", () => {
  let store, listener, context, $mounted;

  beforeEach(() => {
    store = createStore({});
    listener = jest.fn();
    store.subscribe(listener);
  });

  describe("Connect component", () => {
    it("should provide the state and subscribe to changes", done => {
      store.setState({ message: "hello" });

      const mapToProps = ({ message }) => ({ message });
      const template = `<h1>{{message}}</h1>`;
      const Component = {
        template,
        data() {
          return {
            message: "hello"
          };
        },
        created() {
          connect(this, store, mapToProps);
        }
      };
      $mounted = new Vue(Component).$mount();

      let html = $mounted.$el.outerHTML;
      expect(html).toEqual("<h1>hello</h1>");

      store.setState({ message: "bye" });
      Vue.nextTick()
        .then(() => {
          const html = $mounted.$el.outerHTML;
          expect(html).toEqual("<h1>bye</h1>");
          done();
        })
        .catch(done);
    });

    it("should provide the actions and subscribe to changes", done => {
      store.setState({ count: 0 });

      const mapToProps = ({ count }) => ({ count });
      const actions = store => ({
        increment: state => ({ count: state.count + 1 })
      });

      const template = `<div><h1 @click="increment()">{{count}}</h1></div>`;
      const Component = {
        template,
        data() {
          return {
            count: 0
          };
        },
        created() {
          connect(this, store, mapToProps, actions);
        }
      };

      $mounted = new Vue(Component).$mount();

      const el = $mounted.$el;
      expect($mounted.count).toBe(0);

      const h1 = el.querySelector("h1");
      let customEvent = new Event("click");
      h1.dispatchEvent(customEvent);
      expect($mounted.count).toBe(1);

      Vue.nextTick()
        .then(() => {
          const html = $mounted.$el.outerHTML;
          expect(html).toEqual("<div><h1>1</h1></div>");
          done();
        })
        .catch(done);
    });

    it("should connect with nested children", done => {
      store.setState({ message: "hello" });

      const mapToProps = ({ message }) => ({ message });
      const childTemplate = `<h2>{{message}}</h2>`;
      const ChildComp = {
        template: childTemplate,
        data() {
          return {
            message: "hello"
          };
        },
        created() {
          connect(this, store, mapToProps);
        }
      };

      const template = `<div><h1>{{message}}</h1><test></test></div>`;
      const Component = {
        template,
        data() {
          return {
            message: "hello"
          };
        },
        created() {
          connect(this, store, mapToProps);
        },
        components: {
          test: ChildComp
        }
      };
      $mounted = new Vue(Component).$mount();

      let html = $mounted.$el.outerHTML;
      expect(html).toEqual("<div><h1>hello</h1><h2>hello</h2></div>");

      store.setState({ message: "bye" });
      expect($mounted.message).toBe("bye");
      Vue.nextTick()
        .then(() => {
          html = $mounted.$el.outerHTML;
          expect(html).toEqual("<div><h1>bye</h1><h2>bye</h2></div>");
          done();
        })
        .catch(done);
    });
  });
});
