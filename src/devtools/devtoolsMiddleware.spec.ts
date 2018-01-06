import createStore from ".."
import bindActions from "../utils/bindActions"
import applyMiddleware from "../middleware/applyMiddleware"
import {
  devtoolsMiddleware,
  update,
  devTools,
  getOrAddAction
} from "./devtoolsMiddleware"

const increment = ({ count }) => ({ count: count + 1 })
const decrement = ({ count }) => ({ count: count - 1 })
const getActions = ({ getState }) => ({
  increment,
  decrement
})

const jumpToAction = {
  type: "DISPATCH",
  payload: { type: "JUMP_TO_ACTION" },
  state: '{"count":2}'
}
const jumpToState = {
  type: "DISPATCH",
  payload: { type: "JUMP_TO_STATE" },
  state: '{"count":4}'
}
const toggleAction = {
  type: "DISPATCH",
  payload: { type: "TOGGLE_ACTION", id: 1 },
  state: `{"actionsById":{"0":{"action":{"type":"initialState"},"timestamp":1514964802390,"type":"PERFORM_ACTION"},
    "1":{"action":{"type":"increment"},"timestamp":1514964812877,"type":"PERFORM_ACTION"},
    "2":{"action":{"type":"decrement"},"timestamp":1514964817322,"type":"PERFORM_ACTION"}},
    "computedStates":[{"state":{"count":1}},{"state":{"count":2}},{"state":{"count":1}}],
    "currentStateIndex":2,"nextActionId":3,"skippedActionIds":[],"stagedActionIds":[0,1,2]}`
}

jest.useFakeTimers()

describe("devtoolsMiddleware", () => {
  it("should jump to new action", () => {
    const store = createStore({ count: 0 })
    const storeUpdate = update.bind(store)

    storeUpdate(jumpToAction)
    expect(store.getState()).toEqual({ count: 2 })
  })
  it("should jump to new state", () => {
    const store = createStore({ count: 0 })
    const storeUpdate = update.bind(store)

    storeUpdate(jumpToState)
    expect(store.getState()).toEqual({ count: 4 })
  })

  it("should replay actions to current action", () => {
    const initialState = { count: 1 }
    const middlewares = applyMiddleware(devtoolsMiddleware)

    const store = createStore(initialState, middlewares)
    const actions = bindActions(getActions, store)

    devTools.instance = { send: () => {}, subscribe: () => {} }

    Object.keys(actions).forEach(key => {
      getOrAddAction({ name: key }, actions[key])
    })
    expect(store.getState().count).toBe(1)

    const storeUpdate = update.bind(store)
    storeUpdate(toggleAction)
    jest.runAllTimers()

    expect(setTimeout).toHaveBeenCalledTimes(2)
    expect(store.getState()).toEqual({ count: 2 })

    const toggleAction2 = { ...toggleAction }
    toggleAction2.payload.id = 2
    storeUpdate(toggleAction2)
    jest.runAllTimers()

    expect(setTimeout).toHaveBeenCalledTimes(2 + 3)
    expect(store.getState()).toEqual({ count: 1 })
  })
})
