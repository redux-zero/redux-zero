import * as React from "react"

import Props, { Store } from "../interfaces/Props"
import propValidation from "../utils/propValidation"

export default class Provider extends React.Component<Props, {}> {
  static childContextTypes = {
    store: propValidation
  }
  getChildContext() {
    return this.props.context
  }
  render() {
    const { children } = this.props
    return React.Children.only(children)
  }
}
