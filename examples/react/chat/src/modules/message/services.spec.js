import Chance from 'chance';

describe('Service unit test', () => {
  const chance = new Chance();

  beforeEach(() => {
    jest.resetModules();
  });

  it('Should create message with currentDate', async () => {
    const dateNowStub = chance.date();
    const userNameStub = chance.name();
    const contentStub = chance.string();
    const getLastMessagesRouteStub = chance.url();
    const getMockResult = {};

    const getMock = jest.fn(() => getMockResult);
    global.Date = class extends Date {
      constructor() {
        return dateNowStub;
      }
    }
    jest.doMock('./apiRoutes', () => ({ createMessage: getLastMessagesRouteStub }));
    jest.doMock('../shared', () => ({ apiClient: { post: getMock } }));

    const services = require('./services');
    const result = await services.createMessage(userNameStub, contentStub);

    expect(getMock).toBeCalledWith(getLastMessagesRouteStub, {
      createdAt: dateNowStub.getTime(),
      userName: userNameStub,
      content: contentStub,
    });
    expect(result).toBe(getMockResult);
  });

  it('Get last messages with no messages loaded', async () => {
    const dateNowStub = chance.date();
    const getMockResult = { data: [] };
    const getLastMessagesRouteStub = chance.url();

    const getLastMessagesRouteMock = jest.fn(() => getLastMessagesRouteStub);
    const getMock = jest.fn(() => Promise.resolve(getMockResult));
    global.Date = class extends Date {
      constructor() {
        return dateNowStub;
      }
    }
    jest.doMock('./apiRoutes', () => ({ allMessagesFromDate: getLastMessagesRouteMock }));
    jest.doMock('../shared', () => ({ apiClient: { get: getMock } }));

    const services = require('./services');
    const result = await services.getLastMessages([]);

    expect(getLastMessagesRouteMock).toBeCalledWith(dateNowStub.setHours(0));
    expect(getMock).toBeCalledWith(getLastMessagesRouteStub);
    expect(result).toBe(getMockResult.data);
  });

  it('Get last messages with messages loaded', async () => {
    const dateNowStub = chance.date();
    const lastMessagesStub = [{}, { createdAt: dateNowStub.getTime()}];

    const getMockResult = { data: [] };
    const getLastMessagesRouteStub = chance.url();

    const getLastMessagesRouteMock = jest.fn(() => getLastMessagesRouteStub);
    const getMock = jest.fn(() => Promise.resolve(getMockResult));
    global.Date = class extends Date {
      constructor() {
        return dateNowStub;
      }
    }
    jest.doMock('./apiRoutes', () => ({ allMessagesFromDate: getLastMessagesRouteMock }));
    jest.doMock('../shared', () => ({ apiClient: { get: getMock } }));

    const services = require('./services');
    const result = await services.getLastMessages(lastMessagesStub);

    expect(getLastMessagesRouteMock).toBeCalledWith(dateNowStub.setHours(0) + 1);
    expect(getMock).toBeCalledWith(getLastMessagesRouteStub);
    expect(result).toBe(getMockResult.data);
  });
});
