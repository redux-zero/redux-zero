import * as React from "react"

import shallowEqual from "../../utils/shallowEqual"
import propValidation from "../../utils/propsValidation"

export class Connect extends React.Component<any> {
  static contextTypes = {
    store: propValidation
  }
  unsubscribe
  state = this.getProps()
  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(this.update)
  }
  componentWillUnmount() {
    this.unsubscribe(this.update)
  }
  getProps() {
    const { mapToProps } = this.props
    const state = (this.context.store && this.context.store.getState()) || {}
    return mapToProps(state, this.props)
  }
  update = () => {
    const mapped = this.getProps()
    if (!shallowEqual(mapped, this.state)) {
      this.setState(mapped)
    }
  }
  render() {
    return this.props.children({ store: this.context.store, ...this.state })
  }
}

export default function connect(mapToProps) {
  return Child => props => (
    <Connect mapToProps={mapToProps}>
      {mappedProps => <Child {...mappedProps} {...props} />}
    </Connect>
  )
}
