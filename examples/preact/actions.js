export default store => ({
  decrement: state => ({ count: state.count - 1 }),
  increment: state => ({ count: state.count + 1 })
});
