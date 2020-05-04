import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from 'containers/Auth';

import Admin from 'containers/Admin/Loadable';
import Issues from 'containers/Issues';
import Main from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Organizations from 'containers/Organizations';
import Users from 'containers/Users';

import Test from 'containers/Test';
import { RoutesWrapper } from './styledComponents';

const adminConfig = { isAdmin: true, isPrivate: true };
const privateConfig = { isAdmin: false, isPrivate: true };
const publicConfig = { isAdmin: false, isPrivate: false };

const AdminView = withAuth(adminConfig, Admin);
const PrivateIssues = withAuth(privateConfig, Issues);
const PrivateOrganizations = withAuth(privateConfig, Organizations);
const PrivateUsers = withAuth(privateConfig, Users);
const PublicIssues = withAuth(publicConfig, Issues);
const PublicMain = withAuth(publicConfig, Main);
const PublicOrganizations = withAuth(publicConfig, Organizations);
const PublicUsers = withAuth(privateConfig, Users);

const Routes = () => (
  <RoutesWrapper>
    <Switch>
      <Route exact path="/" component={PublicMain} />
      <Route exact path="/issues" component={PublicIssues} />
      <Route exact path="/issues/add" component={PrivateIssues} />
      <Route exact path="/issues/detail/:id?" component={PublicIssues} />
      <Route exact path="/issues/edit/:id?" component={PrivateIssues} />

      <Route exact path="/organizations" component={PublicOrganizations} />
      <Route exact path="/organizations/add" component={PrivateOrganizations} />
      <Route
        exact
        path="/organizations/detail/:id?"
        component={PublicOrganizations}
      />
      <Route
        exact
        path="/organizations/edit/:id?"
        component={PrivateOrganizations}
      />
      <Route exact path="/users" component={PublicUsers} />
      <Route exact path="/users/add" component={PrivateUsers} />
      <Route exact path="/users/detail/:id?" component={PublicUsers} />
      <Route exact path="/users/edit/:id?" component={PrivateUsers} />

      <Route exact path="/admin/:subroute?/:view?/:id?" component={AdminView} />

      <Route exact path="/test" component={Test} />
      <Route component={NotFoundPage} />
    </Switch>
  </RoutesWrapper>
);

export default Routes;
