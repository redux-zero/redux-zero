import utils from '../../utils';

import * as services from './services';

async function fetchLastMessages(messagesInStore) {
  const newMessages = await services.getLastMessages(messagesInStore);
  return { messages: [ ...messagesInStore, ...newMessages] };
}

async function createMessage({ currentUser: { name }, messageContent }) {
  await services.createMessage(name, messageContent);
}

function clearMessageContent() {
  return { messageContent: '' };
}

export default (store) => ({
  fetchMessages: state => fetchLastMessages(state.messages),
  createMessage: utils.functional.compose(clearMessageContent, createMessage),
  setMessageContent: (state, content) => ({ messageContent: content }),
});
