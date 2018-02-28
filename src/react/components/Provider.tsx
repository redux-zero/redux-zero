import * as React from "react";

import Props from "../../interfaces/Props";
import Store from "../../interfaces/Store";
import propValidation from "../../utils/propsValidation";

export default class Provider extends React.Component<Props, {}> {
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
