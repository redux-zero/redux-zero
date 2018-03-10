import createStore from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { connect } from 'redux-zero/devtools';

import utils from './utils'

const INITIAL_STATE = {
  users: [],
  messages: [],
  currentUser: utils.localStorage.getJSONData('currentUser'),
};

const middlewares = connect ? applyMiddleware(connect(INITIAL_STATE)) : [];

export default createStore(INITIAL_STATE, middlewares);
