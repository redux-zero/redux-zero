import * as React from "react"
import * as PropTypes from "prop-types"
import shallowEqual from "../utils/shallowEqual"

export default function connect(mapToProps) {
  return Child =>
    class Connected extends React.Component {
      static contextTypes = {
        store: PropTypes.object
      }
      state = this.getProps()
      componentWillMount() {
        this.context.store.subscribe(this.update)
      }
      componentWillUnmount() {
        this.context.store.unsubscribe(this.update)
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
