import { Component } from "preact"

import shallowEqual from "../../utils/shallowEqual"
import bindActions from "../../utils/bindActions"

export default class Connect extends Component<any, {}> {
  unsubscribe
  state = this.getProps()
  actions = this.getActions()
  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(this.update)
  }
  componentWillUnmount() {
    this.unsubscribe(this.update)
  }
  getProps() {
    const { mapToProps } = this.props
    const state = (this.context.store && this.context.store.getState()) || {}
    return mapToProps ? mapToProps(state, this.props) : state
  }
  getActions() {
    const { actions } = this.props
    return bindActions(actions, this.context.store)
  }
  update = () => {
    const mapped = this.getProps()
    if (!shallowEqual(mapped, this.state)) {
      this.setState(mapped)
    }
  }
  render({ children }, state, { store }) {
    return children[0]({ store, ...state, ...this.actions })
  }
}

// !important. `any` signature to avoid TS complains, due to replacement with a HOC
export function connect(stateToProps: Function, actions = {}): any {
  return Child => (props) => (
    <Connect mapToProps={stateToProps} actions={actions}>
      {mappedProps => <Child {...mappedProps} {...props} />}
    </Connect>
  )
}

