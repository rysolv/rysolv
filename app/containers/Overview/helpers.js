import IssuesOverview from 'containers/Issues/Overview';
import OrganizationsOverview from 'containers/Organizations/Overview';
import UsersOverview from 'containers/Users/Overview';

export const overviewDirectory = {
  issues: {
    Component: IssuesOverview,
    title: 'Issues',
    initialValue: 0,
    buttonName: 'Add Issue',
    route: '/issues/add',
  },
  organizations: {
    Component: OrganizationsOverview,
    title: 'Organizations',
    initialValue: 1,
    buttonName: 'Add Organization',
    route: '/organizations/add',
  },
  users: {
    Component: UsersOverview,
    title: 'Users',
    initialValue: 2,
    buttonName: 'Add User [Temp]',
    route: '/users/add',
  },
};
