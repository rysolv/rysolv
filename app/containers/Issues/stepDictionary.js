import ImportIssue from './Add/ImportIssue';
import ManualIssue from './Add/ManualIssue';
import ManualRepo from './Add/ManualRepo';
import VerifyIssue from './Add/VerifyIssue';

export const addIssueDictionary = {
  1: ImportIssue,
  2: ManualRepo,
  3: ManualIssue,
  4: VerifyIssue,
};
