import IssuesOverview from 'containers/Issues/Overview';
import OrganizationsOverview from 'containers/Organizations/Overview';
import UsersOverview from 'containers/Users/Overview';

// eslint-disable-next-line consistent-return
export const overviewDirectory = path => {
  // eslint-disable-next-line default-case
  switch (path) {
    case '/issues':
      return {
        Component: IssuesOverview,
        title: 'Issues',
        initialValue: 0,
        buttonName: 'Add Issue',
        route: '/issues/add',
      };
    case '/organizations':
      return {
        Component: OrganizationsOverview,
        title: 'Organizations',
        initialValue: 1,
        buttonName: 'Add Organization',
        route: '/organizations/add',
      };
    case '/users':
      return {
        Component: UsersOverview,
        title: 'Users',
        initialValue: 2,
        buttonName: 'Add User [Temp]',
        route: '/users/add',
      };
  }
};
