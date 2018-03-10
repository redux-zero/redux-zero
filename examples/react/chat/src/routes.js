import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import modules from './modules';

const Routes = () => (
  <Router>
    <Switch>
      <Route path={`/`} exact={true} component={modules.user.page} />
      <Route path={`/chat`} exact={true} component={modules.message.page} />
    </Switch>
  </Router>
);

export default Routes;
