import AddCompany from './Add';
import ManualAdd from './Add/ManualAdd';
import VerifyAdd from './Add/VerifyAdd';
import EditCompany from './Edit';
import CompaniesOverview from './Overview';

export const companyTypeDictionary = {
  add: {
    1: AddCompany,
    2: ManualAdd,
    3: VerifyAdd,
  },
  edit: EditCompany,
  overview: {
    1: CompaniesOverview,
    2: CompaniesOverview,
    3: CompaniesOverview,
  },
};
