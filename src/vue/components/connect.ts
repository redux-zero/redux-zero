import getDiff from "../../utils/getDiff"
import bindActions from "../../utils/bindActions"

export function connect(component, store, mapToProps, actions) {
  update()
  const beforeDestroy = component.beforeDestroy
  const unsubscribe = store.subscribe(update)
  const bound = bindActions(actions, store)
  for (let key in bound) {
    component[key] = bound[key]
  }
  component.beforeDestroy = function() {
    unsubscribe()
    beforeDestroy()
  }
  function update() {
    const { diff, changed } = getDiff(
      mapToProps(store.getState()),
      mapToProps(component)
    )
    if (changed) {
      for (let key in diff) {
        component[key] = diff[key]
      }
    }
  }
}
