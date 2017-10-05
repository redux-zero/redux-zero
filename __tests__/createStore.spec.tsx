import * as React from "react"
import * as ReactTestRenderer from "react-test-renderer"
import { createStore, Provider, connect } from "../src/index"

describe("redux-zero", () => {
  const listener = jest.fn()
  let store
  beforeEach(() => {
    store = createStore({})
    listener.mockReset()
    store.subscribe(listener)
  })

  test("setState - getState", () => {
    const state = { one: { two: { three: "four" } }, five: "six" }
    store.setState(state)
    expect(store.getState()).toEqual(state)
    store.setState({ five: "seven" })
    expect(store.getState()).toEqual({
      one: { two: { three: "four" } },
      five: "seven"
    })
  })

  test("subscribe", () => {
    expect(listener).not.toBeCalled()
    store.setState({ a: "key" })
    expect(listener).toBeCalledWith({ a: "key" })
  })

  test("unsubscribe", () => {
    store.unsubscribe(listener)
    store.setState({ a: "key" })
    expect(listener).not.toBeCalledWith()
  })

  test("Provider - connect", () => {
    store.setState({ message: "hello" })

    const Comp = ({ message }) => <h1>{message}</h1>

    const mapToProps = ({ message }) => ({ message })

    const ConnectedComp = connect(mapToProps)(Comp)

    const App = () => (
      <Provider context={{ store }}>
        <ConnectedComp />
      </Provider>
    )

    const wrapper = ReactTestRenderer.create(<App />)

    expect(wrapper.toJSON().type).toEqual("h1")
    expect(wrapper.toJSON().props).toEqual({})
    expect(wrapper.toJSON().children).toEqual(["hello"])

    store.setState({ message: "bye" })

    expect(wrapper.toJSON().type).toEqual("h1")
    expect(wrapper.toJSON().props).toEqual({})
    expect(wrapper.toJSON().children).toEqual(["bye"])
  })
})
