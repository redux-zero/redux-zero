import createStore from "../.."
import { connect, getActions } from "../index"
import Svelte from "./svelte.spec"

describe("redux-zero - svelte bindings", () => {
  const listener = jest.fn()
  let store, unsubscribe
  beforeEach(() => {
    store = createStore({})
    listener.mockReset()
    unsubscribe = store.subscribe(listener)
  })

  test("update string", () => {
    const svt = Svelte()
    const mapToProps = ({ message }) => ({ message })
    const state = { message: "hello" }

    store.setState(state)

    connect(svt, store, mapToProps)

    expect(svt.get()).toEqual(store.getState())

    const newState = { message: "hello world" }
    store.setState(newState)

    expect(svt.get("message")).toEqual(newState.message)
    expect(svt.get()).toEqual(store.getState())
  })

  test("update number", () => {
    const svt = Svelte()
    const mapToProps = ({ count }) => ({ count })
    const state = { count: 1 }

    store.setState(state)

    connect(svt, store, mapToProps)

    expect(svt.get()).toEqual(store.getState())

    const newState = { count: 2 }
    store.setState(newState)

    expect(svt.get("count")).toEqual(2)
    expect(svt.get()).toEqual(store.getState())
  })

  test("update object", () => {
    const svt = Svelte()
    const mapToProps = ({ nested }) => ({ nested })
    const state = { nested: { count: 1 } }

    store.setState(state)

    connect(svt, store, mapToProps)

    expect(svt.get()).toEqual(store.getState())

    const newState = { nested: { count: 2 } }
    store.setState(newState)

    expect(svt.get("nested").count).toEqual(2)
    expect(svt.get()).toEqual(store.getState())
  })

  test("update object property", () => {
    const svt = Svelte()
    const mapToProps = ({ nested }) => ({ nested })
    const state = { nested: { count: 1 } }

    store.setState(state)

    connect(svt, store, mapToProps)

    expect(svt.get()).toEqual(store.getState())

    const newState = { nested: { count: 2 } }
    store.setState(newState)
    expect(svt.get("nested").count).toEqual(2)

    newState.nested.count = 3
    store.setState(newState)
    expect(svt.get("nested").count).toEqual(3)
  })

  test("update array", () => {
    const svt = Svelte()
    const mapToProps = ({ arr }) => ({ arr })
    const state = { arr: { nested: [1, 2] } }

    store.setState(state)

    connect(svt, store, mapToProps)

    expect(svt.get()).toEqual(store.getState())

    const newState = { arr:  { nested: [3, 4] } }
    store.setState(newState)
    newState.arr.nested = [5, 6]

    expect(newState).toEqual(store.getState())
    expect(svt.get('arr').nested[1]).toEqual(6)
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
    expect(svt.get()).toEqual(store.getState())

    increment()

    expect(svt.get("count")).toEqual(2)
    expect(svt.get()).toEqual(store.getState())
  })

  test("action - increment - nested", () => {
    const svt = Svelte()
    const mapToProps = ({ nested }) => ({ nested })
    const state = { nested: { count: 1 } }

    const actions = store => ({
      increment: state => ({ nested: { count: state.nested.count + 1 } })
    })
    const increment = getActions(store, actions).increment

    store.setState(state)
    connect(svt, store, mapToProps)
    expect(svt.get()).toEqual(store.getState())

    increment()

    expect(svt.get("nested").count).toEqual(2)
    expect(svt.get()).toEqual(store.getState())
  })
})
