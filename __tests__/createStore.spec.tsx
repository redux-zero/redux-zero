import * as React from "react"
import { mount } from "enzyme"

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
      <Provider store={store}>
        <ConnectedComp />
      </Provider>
    )

    const wrapper = mount(<App />)

    expect(wrapper.html()).toBe("<h1>hello</h1>")

    store.setState({ message: "bye" })

    expect(wrapper.html()).toBe("<h1>bye</h1>")
  })

  test("Provider - connect with child components", () => {
    store.setState({ message: "hello" })

    const Comp = ({ message, children }) => (
      <div>
        parent {message} {children}
      </div>
    )
    const ChildComponent = ({ message }) => <span>child {message}</span>

    const mapToProps = ({ message }) => ({ message })

    const ConnectedComp = connect(mapToProps)(Comp)
    const ConnectedChildComp = connect(mapToProps)(ChildComponent)

    const App = () => (
      <Provider store={store}>
        <ConnectedComp>
          <ConnectedChildComp />
        </ConnectedComp>
      </Provider>
    )

    const wrapper = mount(<App />)

    expect(wrapper.html()).toBe(
      "<div>parent hello <span>child hello</span></div>"
    )

    store.setState({ message: "bye" })

    expect(wrapper.html()).toBe("<div>parent bye <span>child bye</span></div>")
  })
})
