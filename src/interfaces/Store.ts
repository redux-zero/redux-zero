export default interface Store {
  middleware: Function;
  setState: Function;
  subscribe: Function;
  getState: Function;
};
