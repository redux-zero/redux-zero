import Store from "../interfaces/Store";
import set from "../utils/set";

const finalMiddleware = (store: Store, args: any[]) => (action: Function) =>
  set(store, action(store.getState(), ...args));

export default function applyMiddleware(...middlewares: any[]) {
  middlewares.reverse();
  return (store: Store, action: Function, args: any) => {
    if (middlewares.length < 1) {
      return set(store, action(store.getState(), ...args));
    }

    const chain = middlewares
      .map(middleware => middleware(store))
      .reduce(
        (next, middleware) => middleware(next, args),
        finalMiddleware(store, args)
      );

    return chain(action);
  };
}
