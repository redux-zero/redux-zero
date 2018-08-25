import Store from "./Store";

export type mapToProps = (state: object, ownProps?: object) => object;
export type ActionsBase<State> = (
  store: Store
) => { [index: string]: (state: State) => {} };
