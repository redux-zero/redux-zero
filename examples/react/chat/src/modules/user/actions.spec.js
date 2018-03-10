import createStore from 'redux-zero';
import Chance from 'chance';

import actions from './actions';

describe('Test actions interactions unit', () => {
  let store, chance = new Chance();

  beforeEach(() => {
    store = createStore();
    jest.resetModules();
  });

  it('Set username', () => {
    const userNameStub = chance.string();
    const result = actions(store).setUsername(undefined, userNameStub);

    expect(result).toMatchObject({ userName: userNameStub });
  });

  it('Should create user with success', async () => {
    const userNameStub = chance.name();
    const currentUserStub = {};
    const createUserMock = jest.fn(() => currentUserStub);
    jest.doMock('./services', () => ({ createUser: createUserMock }));

    const actions = require('./actions').default;
    const result = await actions(store).createUser({ userName: userNameStub });

    expect(createUserMock).toBeCalledWith(userNameStub);
    expect(result.currentUser).toBe(currentUserStub);
  });

  it('Should not create user, when an error(with message) is throwed ', async () => {
    const errorMessageStub = chance.string();
    const createUserMock = jest.fn(() => { throw new Error(errorMessageStub) });
    global.alert = jest.fn();
    jest.doMock('./services', () => ({ createUser: createUserMock }));

    const actions = require('./actions').default;
    await actions(store).createUser({});

    expect(global.alert).toBeCalledWith(errorMessageStub);
  });
});
