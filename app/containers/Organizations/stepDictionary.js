import ImportCompany from './Add/ImportCompany';
import ManualCompany from './Add/ManualCompany';
import VerifyCompany from './Add/VerifyCompany';
import EditExisting from './Edit/EditExisting';
import VerifyExisting from './Edit/VerifyExisting';

export const addCompanyDictionary = {
  1: ImportCompany,
  2: ManualCompany,
  3: VerifyCompany,
};

export const editCompanyDictionary = {
  1: EditExisting,
  2: VerifyExisting,
};
