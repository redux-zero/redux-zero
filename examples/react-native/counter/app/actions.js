import store from "./store";

export const increment = () => {
  store.setState({
    count: store.getState().count + 1
  })
};

export const decrement = () => {
  store.setState({
    count: store.getState().count - 1
  })
};
