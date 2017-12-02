import createStore from ".."
import applyMiddleware from "./applyMiddleware"
import bindActions from "../utils/bindActions"

const getActions = ({ getState }) => ({
  syncAction: ({ count }) => ({ count: count + 1 }),
  syncActionDouble: ({ count }) => ({ count: count + 2 })
})

const noAction = () => () => () => {}
const doAnotherAction = store => next => action => {
  return next(getActions(store).syncActionDouble)
}

describe("applyMiddleware", () => {
  it("should not fail without middleware", () => {
    const store = createStore({ count: 0 }, applyMiddleware())
    const actions = bindActions(getActions, store)

    actions.syncAction()
    expect(store.getState().count).toBe(1)
  })

  it("should replace with another action", () => {
    const store = createStore({ count: 0 }, applyMiddleware(doAnotherAction))
    const actions = bindActions(getActions, store)

    actions.syncAction()
    expect(store.getState().count).toBe(2)
  })
})
