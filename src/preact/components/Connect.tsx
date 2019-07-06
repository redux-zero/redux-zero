import { h, Component } from "preact";

import shallowEqual from "../../utils/shallowEqual";
import bindActions from "../../utils/bindActions";

export class Connect extends Component<any, {}> {
  unsubscribe;
  actions;

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
  render({ children }, state, { store }) {
    const child = (children && children[0]) || children;
    return child({ store, ...state, ...this.actions });
  }
}

// [ HACK ] to avoid Typechecks
// since there is a small conflict between preact and react typings
// in the future this might become unecessary by updating typings
const ConnectUntyped = Connect as any;

export default function connect(mapToProps, actions = {}) {
  return Child =>
    class ConnectWrapper extends Component<any, {}> {
      render() {
        const { props } = this;

        return (
          <ConnectUntyped {...props} mapToProps={mapToProps} actions={actions}>
            {mappedProps => <Child {...mappedProps} {...props} />}
          </ConnectUntyped>
        );
      }
    };
}
