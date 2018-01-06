let devTools = { instance: null }
let connect
const nextActions = []
const REPLAY_INTERVAL = 10

function getOrAddAction(action, fn) {
  let found = (<any>nextActions).find(x => action.name === x.key)
  if (!found) {
    found = { key: action.name, fn }
    nextActions.push(found)
  }
  return found
}

function replay(store, message) {
  const state = JSON.parse(message.state)
  const runAction = action => {
    if (action.type === "initialState") {
      store.setState(state.computedStates[0].state)
    } else {
      const found = (<any>nextActions).find(x => action.type === x.key)
      if (found) {
        found.fn()
      }
    }
  }
  const keys = Object.keys(state.actionsById).filter(
    x => parseInt(x, 10) <= message.payload.id
  )
  let i = 0
  setTimeout(function run() {
    runAction(state.actionsById[keys[i]].action)
    if (++i >= keys.length) return
    setTimeout(run, REPLAY_INTERVAL)
  }, 0)
}

function update(message) {
  if (message.type === "DISPATCH") {
    if (
      message.payload.type === "JUMP_TO_ACTION" ||
      message.payload.type === "JUMP_TO_STATE"
    ) {
      this.setState(JSON.parse(message.state))
    } else if (message.payload.type === "TOGGLE_ACTION") {
      replay(this, message)
    }
  }
}

function subscribe(store, middleware) {
  if (!middleware.initialized) {
    const storeUpdate = update.bind(store)
    devTools.instance.subscribe(storeUpdate)
    middleware.initialized = true
  }
}

const devtoolsMiddleware = store => next => action => {
  let result = next(action)
  subscribe(store, devtoolsMiddleware)
  getOrAddAction(action, () => next(action))
  devTools.instance.send(action.name, store.getState())
  return result
}

if (window !== undefined && (<any>window).__REDUX_DEVTOOLS_EXTENSION__) {
  connect = function(initialState) {
    devTools.instance = (<any>window).__REDUX_DEVTOOLS_EXTENSION__.connect()
    devTools.instance.send("initialState", initialState)
    return devtoolsMiddleware
  }
}

export { devtoolsMiddleware, connect, update, devTools, getOrAddAction }
