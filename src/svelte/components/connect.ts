import getDiff from "../../utils/getDiff";
import bindActions from "../../utils/bindActions";

export function getActions(store, actions) {
  return bindActions(actions, store);
}

export function connect(component, store, mapToProps) {
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
