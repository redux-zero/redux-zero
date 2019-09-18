import * as React from "react";

import shallowEqual from "../../utils/shallowEqual";
import propValidation from "../../utils/propsValidation";
import bindActions from "../../utils/bindActions";
type mapToProps<S> = (state: S, ownProps?: object) => object;

export class Connect extends React.Component<any> {
  static contextTypes = {
    store: propValidation
  };
  unsubscribe: any;
  actions: any;

  constructor(props: any, context: any) {
    super(props, context);
    this.state = this.getProps(props, context);
    this.actions = this.getActions();
  }
  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(this.update);
  }
  componentWillUnmount() {
    this.unsubscribe(this.update);
  }
  componentWillReceiveProps(nextProps: any, nextContext: any): void {
    const mapped = this.getProps(nextProps, nextContext);
    if (!shallowEqual(mapped, this.state)) {
      this.setState(mapped);
    }
  }
  getProps(props, context) {
    const { mapToProps } = props;
    const state = (context.store && context.store.getState()) || {};
    return mapToProps ? mapToProps(state, props) : state;
  }
  getActions() {
    const { actions } = this.props;
    return bindActions(actions, this.context.store, this.props);
  }
  update = () => {
    const mapped = this.getProps(this.props, this.context);
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

export default function connect<S = any>(
  mapToProps?: mapToProps<S>,
  actions = {}
) {
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
