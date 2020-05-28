import ImportIssue from './Add/ImportIssue';
import ManualIssue from './Add/ManualIssue';
import ManualOrganization from './Add/ManualOrganization';
import VerifyIssue from './Add/VerifyIssue';

export const addIssueDictionary = {
  1: ImportIssue,
  2: ManualOrganization,
  3: ManualIssue,
  4: VerifyIssue,
};
