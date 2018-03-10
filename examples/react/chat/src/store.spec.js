import Chance from 'chance';

describe('Test Store wrapper unit', () => {
  const chance = new Chance();

  beforeEach(() => {
    jest.resetModules();
  });

  it('Should returns initial state correctly', () => {
    const initialStateStub = {
      users: [],
      messages: [],
      currentUser: []
    };

    const getItemMock = jest.fn(() => []);
    const createStoreMock = jest.fn(() => initialStateStub);
    jest.doMock('redux-zero', () => createStoreMock );
    jest.doMock('./utils', () => ({ localStorage: { getJSONData: getItemMock } }));

    const store = require('./store').default;
    expect(createStoreMock.mock.calls[0][0]).toEqual(initialStateStub);
  });

  it('Should pass middlewares as empty array when connect is not defined', () => {
    const createStoreMock = jest.fn();
    jest.doMock('redux-zero', () => createStoreMock );

    const store = require('./store').default;
    expect(createStoreMock.mock.calls[0][1]).toEqual([]);
  });

  it('Should pass middlewares when connect is defined', () => {
    const initialStateStub = {
      users: [],
      messages: [],
      currentUser: []
    };

    const getItemMock = jest.fn(() => []);
    const connectMock = jest.fn((data) => data);
    const applyMiddlewareMock = jest.fn((data) => data);
    const createStoreMock = jest.fn();

    jest.doMock('redux-zero', () => createStoreMock );
    jest.doMock('redux-zero/middleware', () => ({ applyMiddleware: applyMiddlewareMock }))
    jest.doMock('redux-zero/devtools', () => ({ connect: connectMock }))
    jest.doMock('./utils', () => ({ localStorage: { getJSONData: getItemMock } }));

    const store = require('./store').default;

    expect(connectMock).toBeCalledWith(initialStateStub);
    expect(applyMiddlewareMock).toBeCalledWith(initialStateStub);
    expect(createStoreMock.mock.calls[0][1]).toEqual(initialStateStub);
  });
});
