import getDiff from "../../utils/getDiff";
import bindActions from "../../utils/bindActions";
import Store from "../../interfaces/Store";
type mapToProps = (state: object, ownProps?: object) => object;

export function getActions(store: Store, actions: Function) {
  return bindActions(actions, store);
}

export function connect(component: any, store: Store, mapToProps: mapToProps) {
  update();
  component.on("destroy", store.subscribe(update));
  function update() {
    const { diff, changed } = getDiff(
      mapToProps(store.getState()),
      component.get()
    );
    if (changed) {
      component.set(diff);
    }
  }
}
