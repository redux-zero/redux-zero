import { isEmpty, property } from 'lodash';
import utils from '../../utils';

import shared from '../shared';
import apiRoutes from './apiRoutes';

async function generateNewId() {
  const { data } = (await shared.apiClient.get(apiRoutes.lastUser));
  return isEmpty(data) ? 0 : data[0].id + 1;
}

async function sendUser(userName) {
  const newId = await generateNewId();

  return shared.apiClient.post(apiRoutes.index, { name: userName, id: newId })
    .then(property('data'));
}

export default {
  createUser: utils.functional.compose(
    utils.localStorage.setJSONData.bind(this, 'currentUser'),
    sendUser,
  )
}
