import AddIssue from './Add';
import EditIssue from './Edit';
import IssuesDetail from './Detail';
import IssuesOverview from './Overview';

export const issueTypeDictionary = {
  add: AddIssue,
  detail: IssuesDetail,
  edit: EditIssue,
  overview: IssuesOverview,
};
