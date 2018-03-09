import React from 'react';
import { connect } from 'redux-zero/react';
import { lifecycle, compose } from 'recompose';
import { isEmpty } from 'lodash';

import PageContent from './pageContent';
import actions from './actions';

function redirectIfHasCurrentUser(props) {
  if (!isEmpty(props.currentUser))
    props.history.push('/chat');
}

const withRedirectIfHasCurrentUser = lifecycle({
  state: {},
  componentDidMount() {
    redirectIfHasCurrentUser(this.props)
  },
  componentWillReceiveProps(nextProps) {
    redirectIfHasCurrentUser(nextProps);
  },
});

const enhance = compose(
  connect(({ userName, currentUser }) => ({ userName, currentUser }), actions),
  withRedirectIfHasCurrentUser,
);

export default enhance(PageContent);
