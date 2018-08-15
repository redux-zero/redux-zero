import Store from "../interfaces/Store";

export default function set(store: Store, ret: any) {
  if (ret != null) {
    if (ret.then) return ret.then(store.setState);
    store.setState(ret);
  }
}
