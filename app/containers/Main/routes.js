import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Admin from 'containers/Admin/Loadable';
import Main from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Test from 'containers/Test';
import { RoutesWrapper } from './styledComponents';

const verify = (isPrivate, componnet) => {
  if (isPrivate) {
    return NotFoundPage;
  }
  return componnet;
};

const privateAdmin = verify(false, Admin);

const Routes = () => (
  <RoutesWrapper>
    <section>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route
          exact
          path="/admin/:subroute?/:view?/:id?"
          component={privateAdmin}
        />
        <Route exact path="/test" component={Test} />
        <Route component={NotFoundPage} />
      </Switch>
    </section>
  </RoutesWrapper>
);

export default Routes;
