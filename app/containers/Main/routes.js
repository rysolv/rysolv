import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/Loadable';
import { RoutesWrapper } from './styledComponents';

const Routes = () => (
  <RoutesWrapper>
    <section>
      <Switch>
        <Route component={NotFoundPage} />
      </Switch>
    </section>
  </RoutesWrapper>
);

export default Routes;
