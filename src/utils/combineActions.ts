export default (...actions: any[]) => (...actionsParams: any[]) =>
  actions.reduce(
    (acc, action) => ({
      ...acc,
      ...(typeof action === "function" ? action(...actionsParams) : action)
    }),
    {}
  );
