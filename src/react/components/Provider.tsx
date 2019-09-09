import * as React from "react";

import Props from "../../interfaces/Props";
import propValidation from "../../utils/propsValidation";
import Store from "../../interfaces/Store";
import Context from "./Context";

export default class Provider<S = any> extends React.Component<Props<S>> {
  static childContextTypes = {
    store: propValidation
  };
  getChildContext() {
    const { store } = this.props;
    return { store };
  }
  render() {
    const { store, children } = this.props;
    return <Context.Provider value={store}>{children}</Context.Provider>;
  }
}
