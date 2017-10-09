export default interface Props {
  store: Store
}

export interface Store {
  setState: Function
  subscribe: Function
  unsubscribe: Function
  getState: Function
}
