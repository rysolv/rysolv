import IssuesOverview from 'containers/Issues/Overview';
import OrganizationsOverview from 'containers/Organizations/Overview';
import UsersOverview from 'containers/Users/Overview';

export const overviewDirectory = {
  issues: {
    Component: IssuesOverview,
    title: 'Issues',
    initialValue: 0,
  },
  organizations: {
    Component: OrganizationsOverview,
    title: 'Organizations',
    initialValue: 1,
  },
  users: {
    Component: UsersOverview,
    title: 'Users',
    initialValue: 2,
  },
};
