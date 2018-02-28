import { Component } from "preact";

import Props from "../../interfaces/Props";
import Store from "../../interfaces/Store";

export default class Provider extends Component<Props, {}> {
  getChildContext() {
    return { store: this.props.store };
  }
  render() {
    return this.props.children[0];
  }
}
