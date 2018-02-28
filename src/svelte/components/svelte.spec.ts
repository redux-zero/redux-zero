const Svelte = function(options) {
  return {
    _state: (options ? options.data : null) || {},

    set: function(newState) {
      this._set(this.assign({}, newState));
    },

    _set: function(newState) {
      let oldState = this._state,
        changed = {},
        dirty = false;

      for (let key in newState) {
        if (this.differs(newState[key], oldState[key]))
          changed[key] = dirty = true;
      }
      if (!dirty) return;

      this._state = this.assign({}, oldState, newState);
    },

    get: function(key) {
      return key ? this._state[key] : this._state;
    },

    on: function(eventName, eventHandler) {
      // dummy for now
    },

    differs: function(a, b) {
      return (
        a !== b || ((a && typeof a === "object") || typeof a === "function")
      );
    },

    assign: function(target) {
      let k,
        source,
        i = 1,
        len = arguments.length;
      for (; i < len; i++) {
        source = arguments[i];
        for (k in source) target[k] = source[k];
      }

      return target;
    }
  };
};

describe("redux-zero - svelte fake component", () => {
  const listener = jest.fn();

  beforeEach(() => {
    listener.mockReset();
  });

  test("set - get state", () => {
    const svt = Svelte();
    const mapToProps = ({ message }) => ({ message });
    const state = { message: "hello" };

    svt.set(state);

    expect(svt.get("message")).toEqual(state.message);
    expect(svt.get()).toEqual(state);
  });

  test("update state", () => {
    const svt = Svelte();
    const mapToProps = ({ message }) => ({ message });
    const state = { message: "hello" };

    svt.set(state);

    const newState = { message: "hello world" };
    svt.set(newState);

    expect(svt.get("message")).toEqual(newState.message);
    expect(svt.get()).toEqual(newState);
  });
});

export default Svelte;
