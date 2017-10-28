import createStore from "../.."
import { connect, getActions } from "../index"

const Svelte = () => ({
  _map: new Map(),

  unsubscribe: null,

  set: function (obj) {
    Object.keys(obj).reduce((map, key) => 
      map.set(key, obj[key]), this._map);
  },

  get: function(key) {
    if (!key) {
      return this.toObject(this._map)
    }
    return this._map.get(key);
  },

  on: function(eventName, eventHandler) {
    if (eventName === 'destroy') {
      this.unsubscribe = eventHandler;
    }
  },

  destroy: function() {
    
  },

  toObject(m) {
    return Array.from(m).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value })
    ), {});
  }
})

describe("redux-zero - svelte bindings", () => {
  const listener = jest.fn()
  let store, unsubscribe
  beforeEach(() => {
    store = createStore({})
    listener.mockReset()
    unsubscribe = store.subscribe(listener)
  })

  test("set - string", () => {
    const svt = Svelte()
    const mapToProps = ({ message }) => ({ message });
    const state = { message: "hello" }

    store.setState(state)

    connect(svt, store, mapToProps)

    expect(svt.get('message')).toEqual(store.getState().message)
    expect(svt.get()).toEqual(store.getState())
    
    const newState = { message: "hello world" }
    store.setState(newState)

    expect(newState).toEqual(store.getState())
    expect(svt.get('message')).toEqual(store.getState().message)
    expect(svt.get()).toEqual(store.getState())
  })

  test("set - number", () => {
    const svt = Svelte()
    const mapToProps = ({ count }) => ({ count });
    const state = { count: 1 }

    store.setState(state)

    connect(svt, store, mapToProps)

    expect(svt.get('count')).toEqual(store.getState().count)
    expect(svt.get()).toEqual(store.getState())
    
    const newState = { count: 2 }
    store.setState(newState)

    expect(newState).toEqual(store.getState())
    expect(svt.get('count')).toEqual(store.getState().count)
    expect(svt.get()).toEqual(store.getState())
  })

  test("action - increment", () => {
    const svt = Svelte()
    const mapToProps = ({ count }) => ({ count })
    const state = { count: 1 }

    const actions = store => ({
      increment: state => ({ count: state.count + 1 })
    })
    const increment = getActions(store, actions).increment

    store.setState(state)
    connect(svt, store, mapToProps)
    expect(svt.get('count')).toEqual(store.getState().count)
    
    const newState = { count: 2 }    
    increment()
    expect(svt.get('count')).toEqual(newState.count)
  })

  // test("unsubscribe", () => {
  //   // expect(listener).not.toBeCalled()
  //   // store.setState({ a: "key" })
  //   // expect(listener).toBeCalledWith({ a: "key" })

  //   // const otherListener = jest.fn()
  //   // store.subscribe(otherListener)
  //   // listener.mockReset()
    
  //   const svt = Svelte()
  //   const mapToProps = ({ count }) => ({ count })
  //   const state = { count: 1 }

  //   store.setState(state)
  //   connect(svt, store, mapToProps)

  //   expect(svt.unsubscribe).toEqual(unsubscribe)
  // })
})
