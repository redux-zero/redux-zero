import { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import { useStore } from "./useStore";

type selector<S> = (state: S) => any;

// Heavily inspired by the react-redux implementation
// https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.js

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useSelector<S>(selector: selector<S>): any {
  const store = useStore();
  const [, forceRerender] = useReducer(s => s + 1, 0);

  const selectorRef = useRef(undefined);
  const selectedStateRef = useRef(undefined);
  const onChangeErrorRef = useRef(undefined);

  let selectedState;

  try {
    if (selectorRef.current !== selector || onChangeErrorRef.current) {
      selectedState = selector(store.getState());
    } else {
      selectedState = selectedStateRef.current;
    }
  } catch (err) {
    let errorMessage = `An error occurred while selecting the store state: ${
      err.message
    }.`;

    if (onChangeErrorRef.current) {
      errorMessage +=
        `\nThe error may be related with this previous error:\n${
          onChangeErrorRef.current.stack
        }` + `\n\nOriginal stack trace:`;
    }

    throw new Error(errorMessage);
  }

  useIsomorphicLayoutEffect(() => {
    selectorRef.current = selector;
    selectedStateRef.current = selectedState;
    onChangeErrorRef.current = undefined;
  });

  useIsomorphicLayoutEffect(
    () => {
      const checkForUpdates = () => {
        try {
          const newSelectedState = selectorRef.current(store.getState());

          if (newSelectedState === selectedStateRef.current) {
            return;
          }

          selectedStateRef.current = newSelectedState;
        } catch (err) {
          onChangeErrorRef.current = err;
        }

        forceRerender({});
      };

      const unsubscribe = store.subscribe(checkForUpdates);
      checkForUpdates();

      return () => unsubscribe();
    },
    [store]
  );

  return selectedState;
}
