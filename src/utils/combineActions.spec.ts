import combineActions from "./combineActions";

const actionsA = () => ({
  setFoo: (state, foo) => ({ foo })
});

const actionsB = () => ({
  setBar: (state, bar) => ({ bar }),
  setBaz: (state, baz) => ({ baz })
});

const actionsObj = {
  setObj: (state, obj) => ({ obj })
};

describe("combineActions", () => {
  it("should return a function", () => {
    expect(typeof combineActions()).toBe("function");
  });

  it("should returned function return an object", () => {
    expect(typeof combineActions()()).toBe("object");
  });

  it("should when called with only one actions func and returned function called without params return the result of the actions", () => {
    expect(combineActions(actionsA)().toString()).toEqual(
      actionsA().toString()
    );
  });

  it("should when called with only one actions object and returned function called without params return the action object", () => {
    expect(combineActions(actionsObj)().toString()).toEqual(
      actionsObj.toString()
    );
  });

  it("should when called with two actions and returned function called without params return the result of merged actions", () => {
    expect(combineActions(actionsA, actionsB)().toString()).toEqual(
      { ...actionsA(), ...actionsB() }.toString()
    );
  });

  it("should when called with two mixed types of actions and returned function called without params return the result of merged actions", () => {
    expect(combineActions(actionsA, actionsObj)().toString()).toEqual(
      { ...actionsA(), ...actionsObj }.toString()
    );
  });

  it("should the actions function be called when the returned function is called", () => {
    const mockedActionsA = jest.fn();

    combineActions(mockedActionsA)(1);
    expect(mockedActionsA.mock.calls.length).toEqual(1);
  });

  it("should the actions function be called when the returned function is called with the actionsParams", () => {
    const mockedActionsA = jest.fn();

    combineActions(mockedActionsA)(1, 2);
    expect(mockedActionsA.mock.calls[0]).toEqual([1, 2]);
  });

  it("should the actions function be called when the returned function is called with the actionsParams", () => {
    const mockedActionsA = jest.fn();
    const mockedActionsB = jest.fn();

    combineActions(mockedActionsA, mockedActionsB)(1, 2, 3);
    expect(mockedActionsA.mock.calls[0]).toEqual([1, 2, 3]);
    expect(mockedActionsB.mock.calls[0]).toEqual([1, 2, 3]);
  });
});
