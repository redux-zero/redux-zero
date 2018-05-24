export default (...actions) => (...actionsParams) =>
  actions.reduce(
    (acc, action) => ({
      ...acc,
      ...(typeof action === "function" ? action(...actionsParams) : action)
    }),
    {}
  );
