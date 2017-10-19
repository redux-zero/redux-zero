import * as React from "react"

import shallowEqual from "../../utils/shallowEqual"
import propValidation from "../../utils/propsValidation"

export default function connect(mapToProps) {
  return Child =>
    class Connected extends React.Component {
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
        const state =
          (this.context.store && this.context.store.getState()) || {}
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
          <Child store={this.context.store} {...this.props} {...this.state} />
        )
      }
    }
}
