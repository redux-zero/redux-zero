import createStore from 'redux-zero';
import Chance from 'chance';

describe('Test services unit', () => {
  const chance = new Chance();

  beforeEach(() => {
    jest.resetModules();
  });

  it('Create user retreving user last id', async () => {
    const userNameStub = chance.name();
    const userStub = { id: chance.natural() };
    const newUserStub = { id: chance.natural(), name: chance.name() };

    const postMock = jest.fn(() => Promise.resolve({ data: newUserStub }));
    const getMock = jest.fn(() => (({ data: [userStub] })));

    const indexStub = chance.url();
    const lastUserStub = chance.url();

    const setJSONDataMock = jest.fn();

    jest.doMock('./apiRoutes', () => ({ index: indexStub, lastUser: lastUserStub }));
    jest.doMock('../shared', () => ({ apiClient: { post: postMock, get: getMock } }));
    jest.doMock('../../utils', () => ({
      ...require.requireActual('../../utils').default,
      localStorage: { setJSONData: setJSONDataMock }
    }));

    const services = require('./services').default;

    await services.createUser(userNameStub);

    expect(getMock).toBeCalledWith(lastUserStub);
    expect(postMock).toBeCalledWith(indexStub, { id: userStub.id + 1, name: userNameStub });
    expect(setJSONDataMock).toBeCalledWith('currentUser', newUserStub);
  });

  it('Should generate newId without users', async () => {
    const newUserStub = { id: 0, name: chance.name() };

    const postMock = jest.fn(() => Promise.resolve({ data: newUserStub }));
    const getMock = jest.fn(() => (({ data: [] })));

    const indexStub = chance.url();
    const lastUserStub = chance.url();

    const setJSONDataMock = jest.fn();

    jest.doMock('./apiRoutes', () => ({ index: indexStub, lastUser: lastUserStub }));
    jest.doMock('../shared', () => ({ apiClient: { post: postMock, get: getMock } }));
    jest.doMock('../../utils', () => ({
      ...require.requireActual('../../utils').default,
      localStorage: { setJSONData: setJSONDataMock }
    }));

    const services = require('./services').default;

    await services.createUser(newUserStub.name);

    expect(getMock).toBeCalledWith(lastUserStub);
    expect(postMock).toBeCalledWith(indexStub, { id: newUserStub.id , name: newUserStub.name });
    expect(setJSONDataMock).toBeCalledWith('currentUser', newUserStub);
  });
});
