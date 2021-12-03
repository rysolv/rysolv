import { CreatePosition } from 'components/CompanyPosition';
import CompanyDashboard from 'components/CompanyDashboard';
import EditCompany from './Views/EditCompany';
import EditPosition from './Views/EditPosition';

export default {
  'add-position': CreatePosition,
  'edit-company': EditCompany,
  'edit-position': EditPosition,
  main: CompanyDashboard,
};
