import { property, last, isEmpty } from 'lodash';

import shared from '../shared';
import apiRoutes from './apiRoutes';

function getAllMessagesStartingWith(datetime) {
  return shared.apiClient.get(apiRoutes.allMessagesFromDate(datetime))
    .then(property('data'));
}

export function getLastMessages(messages) {
  const lastMessageCreationDate = isEmpty(messages)
    ? new Date().setHours(0)
    : last(messages).createdAt + 1 //Hack for json-server api.

  return getAllMessagesStartingWith(lastMessageCreationDate);
}

export function createMessage(userName, content) {
  const payload = { createdAt: new Date().getTime(), userName, content };
  return shared.apiClient.post(apiRoutes.createMessage, payload);
}
