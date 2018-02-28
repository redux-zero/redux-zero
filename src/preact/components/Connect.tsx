import { h, Component } from "preact";

import shallowEqual from "../../utils/shallowEqual";
import bindActions from "../../utils/bindActions";

export class Connect extends Component<any, {}> {
  unsubscribe;
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
    return bindActions(actions, this.context.store);
  }
  update = () => {
    const mapped = this.getProps();
    if (!shallowEqual(mapped, this.state)) {
      this.setState(mapped);
    }
  };
  render({ children }, state, { store }) {
    return children[0]({ store, ...state, ...this.actions });
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
