import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admin from '../Admin/Loadable';
import Main from '../HomePage';
import NotFoundPage from '../NotFoundPage/Loadable';
import { RoutesWrapper } from './styledComponents';

const Routes = () => (
  <RoutesWrapper>
    <section>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/admin" component={Admin} />
        <Route component={NotFoundPage} />
      </Switch>
    </section>
  </RoutesWrapper>
);

export default Routes;
