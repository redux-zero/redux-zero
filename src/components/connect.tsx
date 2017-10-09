import * as React from "react"
import shallowEqual from "../utils/shallowEqual"

import Props from "../interfaces/Props"

export default function connect(mapToProps) {
  return Child =>
    class Connected extends React.Component<Props, {}> {
      state = this.getProps()
      componentWillMount() {
        this.props.store.subscribe(this.update)
      }
      componentWillUnmount() {
        this.props.store.unsubscribe(this.update)
      }
      getProps() {
        const state = (this.props.store && this.props.store.getState()) || {}
        return mapToProps(state, this.props)
      }
      update = () => {
        const mapped = this.getProps()
        if (!shallowEqual(mapped, this.state)) {
          this.setState(mapped)
        }
      }
      render() {
        return (
          <Child store={this.props.store} {...this.props} {...this.state} />
        )
      }
    }
}
