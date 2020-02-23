import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admin from '../Admin/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import { RoutesWrapper } from './styledComponents';

const Routes = () => (
  <RoutesWrapper>
    <section>
      <Switch>
        <Route exact path="/admin" component={Admin} />
        <Route component={NotFoundPage} />
      </Switch>
    </section>
  </RoutesWrapper>
);

export default Routes;
