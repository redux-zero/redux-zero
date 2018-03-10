import Chance from 'chance';

import { setJSONData, getJSONData } from './localStorage';

describe('Test localStorage component unit', () => {
  const chance = new Chance();

  beforeEach(() => {
    jest.resetModules();
  });

  test('Check if setJSONData method works correctly', () => {
    const dataStub = { name: chance.name() };
    const keyStub = chance.string();

    const result = setJSONData(keyStub, dataStub);

    expect(global.localStorage.setItem).toBeCalledWith(keyStub, JSON.stringify(dataStub));
    expect(result).toEqual(dataStub);
  });

  test('Check if getJSONData method works correctly with no existent key', () => {
    const keyStub = chance.string();

    const result = getJSONData(keyStub);

    expect(global.localStorage.getItem).toBeCalledWith(keyStub);
    expect(result).toEqual({});
  });

  test('Check if getJSONData method works correctly with existent key', () => {
    const dataStub = { name: chance.name() };
    const keyStub = chance.string();

    global.localStorage.getItem = jest.fn(() => JSON.stringify(dataStub));

    const result = getJSONData(keyStub);

    expect(global.localStorage.getItem).toBeCalledWith(keyStub);
    expect(result).toEqual(dataStub);
  });
});
