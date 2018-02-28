import getDiff from "../../utils/getDiff";
import bindActions from "../../utils/bindActions";

export function connect(component, store, mapToProps, actions?) {
  update();
  const beforeDestroy = component.beforeDestroy;
  const unsubscribe = store.subscribe(update);
  component.beforeDestroy = function() {
    unsubscribe();
    beforeDestroy();
  };
  merge(bindActions(actions, store), component);
  function merge(s, t) {
    for (let k in s) t[k] = s[k];
  }
  function update() {
    const { diff, changed } = getDiff(
      mapToProps(store.getState()),
      mapToProps(component)
    );
    if (changed) {
      merge(diff, component);
    }
  }
}
