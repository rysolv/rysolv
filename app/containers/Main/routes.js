import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Admin from '../Admin/Loadable';
import IssueDetail from '../Issues/Detail';
import Main from '../HomePage';
import NotFoundPage from '../NotFoundPage/Loadable';
import { RoutesWrapper } from './styledComponents';

const Routes = () => (
  <RoutesWrapper>
    <section>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/admin/companies/:view?" component={Admin} />
        <Route exact path="/admin/issues" component={Admin} />
        <Route exact path="/admin/issues/:view?" component={IssueDetail} />
        <Route exact path="/admin/users/:view?" component={Admin} />
        <Route component={NotFoundPage} />
      </Switch>
    </section>
  </RoutesWrapper>
);

export default Routes;
