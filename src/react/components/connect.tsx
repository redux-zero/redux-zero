import * as React from "react";

import shallowEqual from "../../utils/shallowEqual";
import propValidation from "../../utils/propsValidation";
import bindActions from "../../utils/bindActions";
type mapToProps = (state: object, ownProps?: object) => object;

export class Connect extends React.Component<any> {
  static contextTypes = {
    store: propValidation
  };
  unsubscribe: any;
  state = this.getProps();
  actions = this.getActions();
  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(this.update);
  }
  componentWillUnmount() {
    this.unsubscribe(this.update);
  }
  getProps() {
    const { mapToProps } = this.props;
    const state = (this.context.store && this.context.store.getState()) || {};
    return mapToProps ? mapToProps(state, this.props) : state;
  }
  getActions() {
    const { actions } = this.props;
    return bindActions(actions, this.context.store, this.props);
  }
  update = () => {
    const mapped = this.getProps();
    if (!shallowEqual(mapped, this.state)) {
      this.setState(mapped);
    }
  };
  render() {
    // @ts-ignore
    return this.props.children({
      store: this.context.store,
      ...this.state,
      ...this.actions
    });
  }
}

export default function connect(mapToProps?: mapToProps, actions = {}) {
  return (Child: any) =>
    class ConnectWrapper extends React.Component<any> {
      render() {
        const { props } = this;

        return (
          <Connect {...props} mapToProps={mapToProps} actions={actions}>
            {(mappedProps: object) => <Child {...mappedProps} {...props} />}
          </Connect>
        );
      }
    };
}
