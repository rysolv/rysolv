import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Admin from 'containers/Admin/Loadable';
import Main from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { RoutesWrapper } from './styledComponents';

const Routes = () => (
  <RoutesWrapper>
    <section>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/admin/:subroute?/:view?/:id?" component={Admin} />
        <Route component={NotFoundPage} />
      </Switch>
    </section>
  </RoutesWrapper>
);

export default Routes;
