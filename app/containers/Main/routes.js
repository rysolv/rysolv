import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Admin from 'containers/Admin/Loadable';
import Main from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Users from 'containers/Users';
import Issues from 'containers/Issues';
import Organizations from 'containers/Organizations';

import Test from 'containers/Test';
import { RoutesWrapper } from './styledComponents';

const verify = (isPrivate, component) => {
  if (isPrivate) {
    return NotFoundPage;
  }
  return component;
};

const privateAdmin = verify(false, Admin);

const Routes = () => (
  <RoutesWrapper>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route
        exact
        path="/admin/:subroute?/:view?/:id?"
        component={privateAdmin}
      />
      <Route exact path="/users/:subroute?/:view?/:id?" component={Users} />
      <Route exact path="/issues/:subroute?/:view?/:id?" component={Issues} />
      <Route
        exact
        path="/organizations/:subroute?/:view?/:id?"
        component={Organizations}
      />

      <Route exact path="/test" component={Test} />
      <Route component={NotFoundPage} />
    </Switch>
  </RoutesWrapper>
);

export default Routes;
