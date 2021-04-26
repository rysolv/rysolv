import IssuesOverview from 'containers/Issues/Overview';
import ReposOverview from 'containers/Repos/Overview';
import UsersOverview from 'containers/Users/Overview';

export const overviewDirectory = {
  issues: {
    Component: IssuesOverview,
    initialValue: 0,
    title: 'Issues',
  },
  repos: {
    Component: ReposOverview,
    initialValue: 1,
    title: 'Repos',
  },
  users: {
    Component: UsersOverview,
    initialValue: 2,
    title: 'Users',
  },
};
