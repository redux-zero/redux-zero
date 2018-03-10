import React from 'react';
import { connect } from 'redux-zero/react';
import { lifecycle, compose } from 'recompose';
import { isEmpty } from 'lodash';

import Message from './components/message';

import actions from './actions';

const withFetchMessages = lifecycle({
  state: {},
  componentDidMount() {
    if (isEmpty(this.props.currentUser))
      this.props.history.push('/');
    else
      setInterval(() => this.props.fetchMessages(), 2000);
  },
});

const enhance = compose(
  connect(
    ({ messages, messageContent, currentUser }) => ({ messages, messageContent, currentUser }),
    actions
  ),
  withFetchMessages,
);

export default enhance(Message);
