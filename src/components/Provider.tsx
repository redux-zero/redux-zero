import * as React from "react"

import Props from "../interfaces/Props"

export default class Provider extends React.Component<Props, {}> {
  render() {
    const { children, store } = this.props

    // Passing the store down to the children without using the context API
    const childrenWithProps = React.cloneElement(
      children as React.ReactElement<any>,
      { store }
    )

    return React.Children.only(childrenWithProps)
  }
}
