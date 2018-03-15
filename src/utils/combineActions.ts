export default (...actions) => (...actionsParams) =>
  actions.reduce(
    (acc, action) => ({ ...acc, ...action(...actionsParams) }),
    {}
  );
