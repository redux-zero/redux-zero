import { isEmpty } from 'lodash';
import services from './services';

async function createUser(userName) {
  try {
    return { currentUser: await services.createUser(userName) };
  } catch(err) {
    alert(err.message);
  }
}

export default (store) => ({
  createUser: state => createUser(state.userName),
  setUsername: (state, userName) => ({ userName }),
});
