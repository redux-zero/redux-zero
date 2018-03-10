import Chance from 'chance';

import { generateNewObjectWithAllFunctionsInvoked } from './object';

describe('Test Generation of object with all functions invoked unit', () => {
  const chance = new Chance();

  it('Check if an object with no functions return correctly', () => {
    const objectStub = { a: chance.string(), b: chance.string() };
    const result = generateNewObjectWithAllFunctionsInvoked(objectStub);

    expect(result).toEqual(objectStub);
  });

  it('Check if an object with function returns a new value with invoked function', () => {
    const fnReturnStub = chance.string();
    const fnMock = jest.fn(() => fnReturnStub);
    const objectStub = { a: chance.string(), b: fnMock };

    const result = generateNewObjectWithAllFunctionsInvoked(objectStub);

    expect(fnMock).toBeCalled();
    expect(result).toEqual({ a: objectStub.a, b: fnReturnStub });
  });

  it('Check if an object with an another object invoke children functions correctly', () => {
    const fnReturnStub = chance.string();
    const fnMock = jest.fn(() => fnReturnStub);

    const objectWithChildrenStub = { c: fnMock };
    const objectStub = { a: chance.string(), b: objectWithChildrenStub };

    const result = generateNewObjectWithAllFunctionsInvoked(objectStub);

    expect(fnMock).toBeCalled();
    expect(result).toEqual({ ...objectStub, b: { c: fnReturnStub } });
  })
});
