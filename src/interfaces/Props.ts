import Store from "./Store";

export default interface Props<S = any> {
  store: Store<S>;
  children: JSX.Element[] | JSX.Element;
};
