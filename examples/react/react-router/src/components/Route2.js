import React from 'react';

import { connect } from 'redux-zero/react';
import actions from '../actions';

const mapToProps = ({ count }) => ({ count });

export default connect(mapToProps, actions)(
  ({ count, decrement, increment }) => (
    <div>
      <h2>Route 2 | State -> {count}</h2>
      <div>
        <button onClick={decrement}>decrement</button>
        <button onClick={increment}>increment</button>
      </div>
    </div>
  )
);
