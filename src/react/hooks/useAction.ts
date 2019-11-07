import { useMemo } from "react";
import { useStore } from "./useStore";
import bindAction from "../../utils/bindAction";
import { Action } from "../../types";

export function useAction<S>(
  action: Action<S>
): (...args: any[]) => Promise<void> | void {
  const store = useStore();

  return useMemo(
    () => {
      return bindAction(action, store);
    },
    [store, action]
  );
}
