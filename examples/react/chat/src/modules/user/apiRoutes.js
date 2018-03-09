export default {
  get index() { return '/users' },
  get lastUser() { return `${this.index}?_sort=id&_order=desc&_limit=1` },
};
