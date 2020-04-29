import ImportOrganization from './Add/ImportOrganization';
import ManualOrganization from './Add/ManualOrganization';
import VerifyOrganization from './Add/VerifyOrganization';
import EditExisting from './Edit/EditExisting';
import VerifyExisting from './Edit/VerifyExisting';

export const addOrganizationDictionary = {
  1: ImportOrganization,
  2: ManualOrganization,
  3: VerifyOrganization,
};

export const editOrganizationDictionary = {
  1: EditExisting,
  2: VerifyExisting,
};
