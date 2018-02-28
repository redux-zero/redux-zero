export default function set(store, ret) {
  if (ret != null) {
    if (ret.then) return ret.then(store.setState);
    store.setState(ret);
  }
}
