/**
 * Asynchronously loads the component for Admin
 */

import loadable from 'react-loadable';
import AsyncLoad from '../../components/AsyncLoad';

export default loadable({
  loader: () => import('./index'),
  loading: AsyncLoad,
});
