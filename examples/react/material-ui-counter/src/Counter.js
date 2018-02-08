import React from 'react';
import { connect } from 'redux-zero/react';

import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/remove';

import actions from './actions';

const mapToProps = ({ count }) => ({ count });

export default connect(mapToProps, actions)(
  ({ count, increment, decrement }) => (
    <div>
      <TextField id="counter" value={count} disabled />
      <div>
        <FloatingActionButton onClick={increment}>
          <AddIcon />
        </FloatingActionButton>
        <FloatingActionButton onClick={decrement}>
          <RemoveIcon />
        </FloatingActionButton>
      </div>
    </div>
  )
);
