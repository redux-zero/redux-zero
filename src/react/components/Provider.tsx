import * as React from "react";

import Props from "../../interfaces/Props";
import propValidation from "../../utils/propsValidation";
import Store from "../../interfaces/Store";

export default class Provider extends React.Component<Props> {
  static childContextTypes = {
    store: propValidation
  };
  getChildContext() {
    const { store } = this.props;
    return { store };
  }
  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}
