import { useAction } from "./useAction";
import { useStore } from "./useStore";

export function useActions(actions) {
  const store = useStore();
  const obj = actions(store);
  let bound = {};
  Object.keys(obj).forEach(key => {
    let act = obj[key];
    let fn = useAction(act);
    bound[key] = fn;
  });
  return bound;
}
