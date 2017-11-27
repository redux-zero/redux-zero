import * as React from "react"

import shallowEqual from "../../utils/shallowEqual"
import propValidation from "../../utils/propsValidation"
import bindActions from "../../utils/bindActions"

export class Connect extends React.Component<any> {
  static contextTypes = {
    store: propValidation
  }
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
  render() {
    return this.props.children({
      store: this.context.store,
      ...this.state,
      ...this.actions
    })
  }
}

export default function connect(mapToProps, actions = {}) {
  return Child => props => (
    <Connect {...props} mapToProps={mapToProps} actions={actions}>
      {mappedProps => <Child {...mappedProps} {...props} />}
    </Connect>
  )
}
