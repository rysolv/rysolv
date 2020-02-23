import React, { Fragment, useState } from 'react';
import { typeDictionary } from './constants';

import AdminTab from './AdminTab';

export const Admin = () => {
  const [adminTab, setAdminTab] = useState('Companies');
  const Component = typeDictionary[adminTab];

  return (
    <Fragment>
      <AdminTab setAdminTab={setAdminTab} />
      <Component />
    </Fragment>
  );
};

export default Admin;
