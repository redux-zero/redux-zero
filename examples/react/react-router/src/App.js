import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { connect } from 'redux-zero/react';
import actions from './actions';

import Route1 from './components/Route1';
import Route2 from './components/Route2';

const Main = ({ count, decrement, increment }) => (
  <BrowserRouter>
    <div>
      <header>
        <nav>
          <Link to="/route1"> Route 1 </Link>
          <Link to="/route2"> Route 2 </Link>
        </nav>
      </header>

      <h2>State -> {count}</h2>
      <div>
        <button onClick={decrement}>decrement</button>
        <button onClick={increment}>increment</button>
      </div>
      <hr />
      <main style={{ marginLeft: 20 }}>
        <Switch>
          <Route path="/route1" component={Route1} />
          <Route path="/route2" component={Route2} />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

const mapToProps = ({ count }) => ({ count });

export default connect(mapToProps, actions)(Main);
