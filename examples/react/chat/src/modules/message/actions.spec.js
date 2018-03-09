import createStore from 'redux-zero';
import { times } from 'lodash';
import Chance from 'chance';

import actions from './actions';

describe('Test Actions unit', () => {
  const chance = new Chance();
  let store;

  beforeEach(() => {
    store = createStore();
    jest.resetModules();
  });

  it('Check if fetchMessages works with no previous message and return no messages', async () => {
    const getLastMessagesMock = jest.fn((messages) => []);
    jest.doMock('./services', () => ({ getLastMessages: getLastMessagesMock }));

    const actions = require('./actions').default;

    const result = await actions(store).fetchMessages({ messages: [] });

    expect(result.messages).toEqual([]);
  });

  it('Check if fetchMessages works with previous message and return no messages', async () => {
    const messagesStub = times(chance.natural({min: 1, max: 20}), () => chance.name());

    const getLastMessagesMock = jest.fn((messages) => []);
    jest.doMock('./services', () => ({ getLastMessages: getLastMessagesMock }));

    const actions = require('./actions').default;

    const result = await actions(store).fetchMessages({ messages: messagesStub });

    expect(result.messages).toEqual(messagesStub);
  });

  it('Check if fetchMessages works with previous message and return messages', async () => {
    const messagesStub = times(chance.natural({min: 1, max: 20}), () => chance.name());
    const newMessagesStub = times(chance.natural({min: 1, max: 20}), () => chance.name());

    const getLastMessagesMock = jest.fn((messages) => newMessagesStub);
    jest.doMock('./services', () => ({ getLastMessages: getLastMessagesMock }));

    const actions = require('./actions').default;

    const result = await actions(store).fetchMessages({ messages: messagesStub });

    expect(result.messages).toEqual([...messagesStub, ...newMessagesStub]);
  });

  it('Check if create message works correctly', async() => {
    const usernameStub = chance.name();
    const messageContentStub = chance.string();

    const createMessageMock = jest.fn();
    jest.doMock('./services', () => ({ createMessage: createMessageMock }));

    const actions = require('./actions').default;

    const result = await actions(store).createMessage({
      currentUser: { name: usernameStub },
      messageContent: messageContentStub
    });

    expect(createMessageMock).toBeCalledWith(usernameStub, messageContentStub);
    expect(result).toEqual({ messageContent: '' });
  });

  it('Set message content', () => {
    const messageContentStub = chance.string();
    const result = actions(store).setMessageContent(undefined, messageContentStub);

    expect(result).toMatchObject({ messageContent: messageContentStub });
  });

});
