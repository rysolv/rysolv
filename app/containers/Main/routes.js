import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from 'containers/Auth';

import IssuesAdd from 'containers/Issues/Add';
import IssuesDetail from 'containers/Issues/Detail';
import IssuesEdit from 'containers/Issues/Edit';
import IssuesOverview from 'containers/Issues/Overview';
import Main from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import OrganizationsAdd from 'containers/Organizations/Add';
import OrganizationsDetail from 'containers/Organizations/Detail';
import OrganizationsEdit from 'containers/Organizations/Edit';
import OrganizationsOverview from 'containers/Organizations/Overview';
import UsersAdd from 'containers/Users/Add';
import UsersDetail from 'containers/Users/Detail';
import UsersEdit from 'containers/Users/Edit';
import UsersOverview from 'containers/Users/Overview';

import Test from 'containers/Test';
import { RoutesWrapper } from './styledComponents';

const privateConfig = { isAdmin: false, isPrivate: true };
const publicConfig = { isAdmin: false, isPrivate: false };

const PrivateIssuesAdd = withAuth(privateConfig, IssuesAdd);
const PrivateIssuesEdit = withAuth(privateConfig, IssuesEdit);
const PrivateOrganizationsAdd = withAuth(privateConfig, OrganizationsAdd);
const PrivateOrganizationsEdit = withAuth(privateConfig, OrganizationsEdit);
const PrivateUsersAdd = withAuth(privateConfig, UsersAdd);
const PrivateUsersEdit = withAuth(privateConfig, UsersEdit);
const PublicIssuesDetail = withAuth(publicConfig, IssuesDetail);
const PublicIssuesOverview = withAuth(publicConfig, IssuesOverview);
const PublicMain = withAuth(publicConfig, Main);
const PublicOrganizationsDetail = withAuth(publicConfig, OrganizationsDetail);
const PublicOrganizationsOverview = withAuth(
  publicConfig,
  OrganizationsOverview,
);
const PublicUsersDetail = withAuth(publicConfig, UsersDetail);
const PublicUsersOverview = withAuth(publicConfig, UsersOverview);

const Routes = () => (
  <RoutesWrapper>
    <Switch>
      <Route exact path="/" component={PublicMain} />
      <Route exact path="/issues" component={PublicIssuesOverview} />
      <Route exact path="/issues/add" component={PrivateIssuesAdd} />
      <Route exact path="/issues/detail/:id?" component={PublicIssuesDetail} />
      <Route exact path="/issues/edit/:id?" component={PrivateIssuesEdit} />
      <Route
        exact
        path="/organizations"
        component={PublicOrganizationsOverview}
      />
      <Route
        exact
        path="/organizations/add"
        component={PrivateOrganizationsAdd}
      />
      <Route
        exact
        path="/organizations/detail/:id?"
        component={PublicOrganizationsDetail}
      />
      <Route
        exact
        path="/organizations/edit/:id?"
        component={PrivateOrganizationsEdit}
      />
      <Route exact path="/users" component={PublicUsersOverview} />
      <Route exact path="/users/add" component={PrivateUsersAdd} />
      <Route exact path="/users/detail/:id?" component={PublicUsersDetail} />
      <Route exact path="/users/edit/:id?" component={PrivateUsersEdit} />

      <Route exact path="/test" component={Test} />
      <Route component={NotFoundPage} />
    </Switch>
  </RoutesWrapper>
);

export default Routes;
