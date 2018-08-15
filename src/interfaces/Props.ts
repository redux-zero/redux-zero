import Store from "./Store";

export default interface Props {
  store: Store;
  children: JSX.Element[] | JSX.Element;
};
